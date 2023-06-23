export interface Role {
  id: number,
  name: string,
}

export interface User {
  id?: number,
  name: string,
  email: string,
  phone_number: string,
  profile_photo_url?: string,
  roles?: Role[]
}

export interface UserForm extends User{
  currentPassword?: string,
  password: string,
  confirmPassword: string
}