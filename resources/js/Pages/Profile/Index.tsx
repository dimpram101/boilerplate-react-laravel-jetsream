import DashboardLayout from '@/Layouts/DashboardLayout'
import React from 'react'

interface Props {
  user: {
    id: number,
    name: string,
    email: string,
    phone_number: string,
  },
}

const Index = ({ user }: Props) => {
  console.log(user);
  return (
    <DashboardLayout>
      Profile
    </DashboardLayout>
  )
}

export default Index