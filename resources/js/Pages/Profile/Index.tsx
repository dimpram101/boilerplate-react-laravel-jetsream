import Loading from '@/Components/Animation/Loading';
import PrimaryButton from '@/Components/PrimaryButton';
import { useResponse } from '@/Hooks/useResponse';
import useTypedPage from '@/Hooks/useTypedPage';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { User } from '@/types/user';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react'
import route from 'ziggy-js';

interface Props {
  user: User
}

const Index = ({ user }: Props) => {
  console.log(user.profile_photo_url);
  const [profilePhoto, setProfilePhoto] = useState<File>();
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | undefined>(user.profile_photo_url);
  const [response, dispatch] = useResponse();
  const form = useForm({
    name: user.name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const isPasswordFieldFilled = (form.data.password !== "" || form.data.confirmPassword !== "" || form.data.currentPassword !== "");
  const isPasswordMatched = (form.data.password === form.data.confirmPassword);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.data);
    //@ts-ignore
    form.data._method = 'put';
    form.put(route('profile.update', user.id), {
      onError: () => form.reset('confirmPassword', 'currentPassword', 'password')
    });
  }

  const updateProfilePhotoHandler = () => {
    if (!profilePhoto) return;

    const data = new FormData();
    data.append('profile_photo', profilePhoto);
    dispatch({ type: 'PROGRESS', payload: null });
    axios.post(route('profile.photo', user.id), data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch({ type: 'SUCCESS', payload: "Success" });
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: err.response.data.errors });
      });
  }

  console.log(response);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full bg-white rounded-lg shadow-lg border p-4">
        <h1 className='text-3xl font-medium'>Profile - <span className='text-deep-sky font-black'>{user.name}</span></h1>
        <hr className='mt-3' />
        <div className="mt-4 flex flex-row font-bold justify-between gap-4">
          <form onSubmit={submitHandler} className="w-1/2 flex flex-col">
            <div className="flex flex-col gap-1 w-full mb-4">
              <label>Name</label>
              <input type="text" className='rounded-lg font-medium border border-deep-sky' required value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
              {form.errors.name && <p className='text-xs text-red-500 font-thin'>{form.errors.name}</p>}
            </div>
            <div className="flex flex-col gap-1 w-full mb-4">
              <label>E-mail</label>
              <input type="email" className='rounded-lg font-medium border border-deep-sky hover:cursor-not-allowed' value={form.data.email} disabled />
            </div>
            <div className="flex flex-col gap-1 w-full mb-4">
              <label>Phone Number</label>
              <input type="number" className='rounded-lg font-medium border border-deep-sky [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' required value={form.data.phone_number} onChange={(e) => form.setData('phone_number', e.target.value)} />
              {form.errors.phone_number && <p className='text-xs text-red-500 font-thin'>{form.errors.phone_number}</p>}
            </div>
            <hr className='mb-4' />
            <div className="flex flex-col gap-1 w-full mb-4">
              <label>Current Password</label>
              <input type="password" className='rounded-lg font-medium border border-deep-sky' placeholder='Current Password' value={form.data.currentPassword} onChange={(e) => form.setData('currentPassword', e.target.value)} required={isPasswordFieldFilled} />
              {form.errors.currentPassword && <p className='text-xs text-red-500 font-thin'>{form.errors.currentPassword}</p>}
            </div>
            <div className="flex flex-col gap-1 w-full mb-4">
              <label>New Password</label>
              <input type="password" className={`rounded-lg font-medium border ${(form.data.password && !isPasswordMatched) ? "border-red-500 focus:border-red-500 focus:ring-0 focus:outline-none" : "border-deep-sky"}`} placeholder='New Password' value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} required={isPasswordFieldFilled} />
              {form.errors.password && <p className='text-xs text-red-500 font-thin'>{form.errors.password}</p>}
            </div>
            <div className="flex flex-col gap-1 w-full mb-4">
              <label>Confirm Password</label>
              <input type="password" className={`rounded-lg font-medium border ${(form.data.confirmPassword && !isPasswordMatched) ? "border-red-500 focus:border-red-500 focus:ring-0 focus:outline-none" : "border-deep-sky"}`} placeholder='Confirm Password' value={form.data.confirmPassword} onChange={(e) => form.setData('confirmPassword', e.target.value)} required={isPasswordFieldFilled} />
              {form.errors.confirmPassword && <p className='text-xs text-red-500 font-thin'>{form.errors.confirmPassword}</p>}
            </div>
            <div className="self-end">
              <PrimaryButton label='Save' className='px-6' type='submit' />
            </div>
          </form>
          <div className="w-2/5 ">
            <div className="flex flex-col gap-1">
              <h1>Photo Profile</h1>
              <div className="flex flex-row gap-2 w-full">
                <input type="file" name="" id="" className='border border-deep-sky rounded-lg file:rounded-l-lg file:border-none file:bg-deep-sky file:text-white file:px-2 file:py-2 file:mr-4 w-full' accept='.jpg, .jpeg, .png' onChange={(e) => {
                  setProfilePhoto(e.target?.files![0]);
                  setProfilePhotoPreview(URL.createObjectURL(e.target?.files![0]));
                }} />
                <PrimaryButton label='Save Photo' className='w-36' onClick={updateProfilePhotoHandler} disabled={response.progress || !profilePhoto && true } />
                {response.progress && <Loading />}
              </div>
              {response.error.message && <p className='text-xs text-red-500 font-thin'>{response.error.message.profile_photo[0]}</p>}
              {response.success.message && <p className='text-xs text-green-600'>{response.success.message}</p>}
              <div className="w-[200px] h-[200px] border border-black rounded-lg border-opacity-20 mt-1">
                {profilePhotoPreview ?
                  (
                    <img src={profilePhotoPreview} className='w-full h-full object-contain rounded-lg' alt="" />
                  ) :
                  (
                    <div className='flex flex-col w-full h-full justify-center items-center text-xs font-normal opacity-50'>
                      Image will be shown here...
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index