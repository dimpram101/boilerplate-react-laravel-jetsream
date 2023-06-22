import { Link, useForm, Head } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/Jetstream/InputError';
import AuthLayout from '@/Layouts/AuthLayout';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <AuthLayout>
      <Head title="Login" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}
      <div className='w-full h-full flex flex-col'>
        <div className="mb-4 flex flex-col gap-4">
          <h1 className='text-center font-bold text-3xl'>Boiler Plate - Login</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col w-full'>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-lg"
              value={form.data.email}
              onChange={e => form.setData('email', e.currentTarget.value)}
              required
              autoFocus
            />
            <InputError className="mt-2" message={form.errors.email} />
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full rounded-lg"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
              required
              autoComplete="current-password"
            />
            <InputError className="mt-2" message={form.errors.password} />
          </div>

          <div className="mt-4 flex flex-col">
            <label className="flex items-center">
              <input type='checkbox'
                className='checked:bg-deep-sky checked:hover:bg-deep-sky ring-0 outline-none checked:outline-none focus:ring-0'
                name="remember"
                checked={form.data.remember === 'on'}
                onChange={e =>
                  form.setData('remember', e.currentTarget.checked ? 'on' : '')
                }
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
          </div>
          <div className="flex flex-row items-center justify-between mt-6 w-full">
            {canResetPassword && (
              <Link href={route('password.request')} className='text-sm underline text-gray-500 hover:text-gray-700 transition-colors duration-300'>Forgot your password?</Link>
            )}
            <div className="flex flex-row items-center gap-4">
              <Link href={route('register')} className='text-sm underline text-gray-500 hover:text-gray-700 transition-colors duration-300'>Don't have an account?</Link>
              <PrimaryButton label='Login' className='px-1 py-[4px] transition-colors duration-300' type='submit'/>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
