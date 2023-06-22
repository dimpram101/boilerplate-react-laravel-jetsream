import Loading from '@/Components/Animation/Loading';
import PrimaryButton from '@/Components/PrimaryButton';
import { useResponse } from '@/Hooks/useResponse';
import useTypedPage from '@/Hooks/useTypedPage';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { useForm } from '@inertiajs/inertia-react';
import React, { useMemo } from 'react';
import Select from "react-select";
import route from 'ziggy-js';

interface Props {
  roles: [{
    id: string,
    name: string
  }]
}

const Create = ({ roles }: Props) => {
  const [response, dispatch] = useResponse();
  const { errors } = useTypedPage().props;

  const roleMap = useMemo(() => roles.map(role => {
    return {
      label: role.name,
      value: role.id,
    }
  }), [roles]);

  const form = useForm({
    name: "",
    email: "",
    phone_number: "",
    roles: [],
    password: "",
    confirmPassword: "",
  });

  const isMatched = form.data.password === form.data.confirmPassword;

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('user.store'), {
      preserveState: true,
      preserveScroll: true
    });
  };


  return (
    <DashboardLayout>
      <h1 className='text-3xl font-bold text-center mb-4'>Add User</h1>
      <div className="w-1/2 h-full m-auto bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Name</label>
              <input type="text" className='rounded-lg p-2' placeholder='John Doe' value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
              {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Email</label>
              <input type="email" className='rounded-lg p-2' placeholder='example@gmail.com' value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
              {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Phone Number</label>
              <input type="number" className='rounded-lg p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='081234567890' value={form.data.phone_number} onChange={(e) => form.setData('phone_number', e.target.value)} minLength={11} />
              {errors.phone_number && <p className='text-sm text-red-500'>{errors.phone_number}</p>}
            </div>
            <div className="flex flex-col">
              <label className='text-lg font-semibold'>Roles</label>
              <Select
                isMulti
                //@ts-ignore
                options={roleMap}
                value={form.data.roles}
                onChange={value => {
                  form.setData('roles', value.concat());
                }}

              />
              {errors.roles && <p className='text-sm text-red-500'>{errors.roles}</p>}
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Password</label>
              <input type="password" className={`rounded-lg p-2 transition-colors ${(form.data.confirmPassword && !isMatched) && "border-red-500 focus:border-red-900 focus:ring-0 focus:outline-none"}`} placeholder='•••••••••' value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} />
              {errors.password && <p className='text-sm text-red-500'>{errors.password}</p>}
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Confirm Password</label>
              <input type="password" className={`rounded-lg p-2 transition-colors ${(form.data.confirmPassword && !isMatched) && "border-red-500 focus:border-red-900 focus:ring-0 focus:outline-none"}`} placeholder='•••••••••' value={form.data.confirmPassword} onChange={(e) => form.setData('confirmPassword', e.target.value)} />
            </div>
            {(form.data.confirmPassword && !isMatched) && (
              <div className="text-sm text-red-500">
                Password and Confirm Password isn't matched!
              </div>
            )}
            <div className="flex flex-row gap-2">
              {response.progress && <Loading />}
              <PrimaryButton label='Submit' className='w-full' type='submit' disabled={!isMatched || form.data.confirmPassword === ""} />
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Create