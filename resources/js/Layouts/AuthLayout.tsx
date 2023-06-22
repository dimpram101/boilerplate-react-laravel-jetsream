import React from 'react'

interface Props {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex w-full h-screen items-center">
      <div className="flex justify-center items-center w-[550px]  bg-white rounded-lg shadow-lg m-auto p-8">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout