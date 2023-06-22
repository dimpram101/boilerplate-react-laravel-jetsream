import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import Checkbox from '@/Components/Jetstream/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/Jetstream/InputError';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthLayout>
      <Head title="Register" />

      <div className="flex flex-col w-full">
        <div className="mb-4 flex flex-col gap-4">
          <h1 className='text-center font-bold text-3xl'>Boiler Plate - Register</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full rounded-lg"
              value={form.data.name}
              onChange={e => form.setData('name', e.currentTarget.value)}
              required
              autoFocus
              autoComplete="name"
            />
            <InputError className="mt-2" message={form.errors.name} />
          </div>

          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-lg"
              value={form.data.email}
              onChange={e => form.setData('email', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={form.errors.email} />
          </div>

          <div className="mt-4">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              type="number"
              className="mt-1 block w-full rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={form.data.phone_number}
              onChange={e => form.setData('phone_number', e.currentTarget.value)}
              required
              autoComplete="new-phone_number"
            />
            <InputError className="mt-2" message={form.errors.phone_number} />
          </div>

          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full rounded-lg"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2" message={form.errors.password} />
          </div>

          <div className="mt-4">
            <label htmlFor="password_confirmation">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full rounded-lg"
              value={form.data.password_confirmation}
              onChange={e =>
                form.setData('password_confirmation', e.currentTarget.value)
              }
              required
              autoComplete="new-password"
            />
            <InputError
              className="mt-2"
              message={form.errors.password_confirmation}
            />
          </div>

          {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
            <div className="mt-4">
              <label htmlFor="terms">
                <div className="flex items-center">
                  <Checkbox
                    name="terms"
                    id="terms"
                    checked={form.data.terms}
                    onChange={e => form.setData('terms', e.currentTarget.checked)}
                    required
                  />

                  <div className="ml-2">
                    I agree to the
                    <a
                      target="_blank"
                      href={route('terms.show')}
                      className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      Terms of Service
                    </a>
                    and
                    <a
                      target="_blank"
                      href={route('policy.show')}
                      className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
                <InputError className="mt-2" message={form.errors.terms} />
              </label>
            </div>
          )}

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route('login')}
              className="text-sm underline text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              Already registered?
            </Link>

            <PrimaryButton
              className={classNames('ml-4', { 'opacity-25': form.processing })}
              disabled={form.processing}
              type='submit'
              label='Register'
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
