import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardLayout from '@/Layouts/DashboardLayout'
import React, { useMemo } from 'react';
import Select from "react-select";
import route from 'ziggy-js';

interface Props {
  user: {
    id: number,
    name: string,
    email: string,
    phone_number: string,
    roles: [{
      id: number,
      name: string,
    }],
  },
  roles: any[]
}

const Show = ({ user, roles }: Props) => {
  const roleMap = useMemo(() => roles.map(role => {
    return {
      label: role.name,
      value: role.id,
    }
  }), [user, roles]);
  const userRoleMap = useMemo(() => user.roles.map(role => {
    return {
      label: role.name,
      value: role.id,
    }
  }), [user]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center">
        <h1 className='text-3xl font-bold mb-4'>User - {user.name}</h1>
        <div className="w-1/2 h-full m-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Name</label>
              <input type="text" className='rounded-lg p-2' placeholder='John Doe' value={user.name} />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Email</label>
              <input type="email" className='rounded-lg p-2' placeholder='example@gmail.com' value={user.email} />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className='text-lg font-semibold'>Phone Number</label>
              <input type="number" className='rounded-lg p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='081234567890' value={user.phone_number} />
            </div>
            <div className="flex flex-col">
              <label className='text-lg font-semibold'>Roles</label>
              <Select
                isMulti
                isDisabled
                //@ts-ignore
                options={roleMap}
                value={userRoleMap}
              />
            </div>
            <LinkButton label='Back' href={route('user.index')} className='text-center'/>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Show