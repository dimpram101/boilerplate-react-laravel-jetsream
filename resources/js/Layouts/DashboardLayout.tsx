import React, { useState, useMemo } from 'react'
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const [isUserDropdownOpen, setIsUserDropdown] = useState<boolean>(false);
  const { user } = useTypedPage().props.auth;
  const isSuperAdmin = useMemo(() => {
    //@ts-ignore
    const guest = user?.roles.map(role => role.name);
    return guest.includes('super-admin') ? true : false;
  }, [user]);
  return (
    <div>
      <Head title='Boiler Plate' />
      <div className="w-72 fixed h-screen bg-[#137CBD] text-white shadow-2xl top-0 left-0 p-4">
        <div className="flex flex-col gap-3 justify-between h-full">
          <div className="flex flex-col gap-3 font-semibold text-lg">
            <div className="flex items-center gap-3 justify-start">
              <Link href='/dashboard' className='block text-2xl text-center w-full font-bold'>Boiler Plate</Link>
            </div>
            <hr className='opacity-60' />
            <div className="flex flex-col gap-[3px]">
              <Link href={route('profile.index')} className="flex justify-between cursor-pointer items-center p-2 hover:bg-[#29ABE2] rounded-lg" as='button'>
                <p>Profile</p>
              </Link>
              {isSuperAdmin && (
                <>
                  <div className="flex justify-between cursor-pointer items-center  gap-2 hover:bg-[#29ABE2] p-2 rounded-lg" onClick={() => setIsUserDropdown(prev => !prev)}>
                    <p>User</p>
                    <svg viewBox="0 0 24 24" className={`w-5 transition-all duration-300 ${isUserDropdownOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 20L17 12L9 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  </div>
                  <div className={`${isUserDropdownOpen ? 'h-full' : 'h-0'} transition-all duration-300 overflow-hidden`}>
                    <div className='pl-2'>
                      <Link href={route('user.index')} className='hover:bg-[#29ABE2] pl-2 py-2 rounded-lg block cursor-pointer'>List</Link>
                      <Link href={route('user.create')} className='hover:bg-[#29ABE2] pl-2 py-2 rounded-lg cursor-pointer block'>Add User</Link>
                    </div>
                  </div>
                </>
              )}
              <Link href='/logout' method='post' className="flex justify-between cursor-pointer items-center p-2 hover:bg-[#29ABE2] rounded-lg" as='button'>
                <p>Logout</p>
                <svg fill="#FFFFFF" className='w-5' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"></path> </g></svg>
              </Link>
            </div>
          </div>
          <div className="text-center text-xs">
            Created by <a target='_blank' href='https://www.instagram.com/dimpram_'>@dimpram_</a>
          </div>
        </div>
      </div>
      <div className="ml-72 p-6">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout