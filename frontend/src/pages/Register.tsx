import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { showToast,  } = useAppContext()
  
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({message: 'Registration successful!', type: 'SUCCESS'})
      await queryClient.invalidateQueries('validateToken')
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({message: error.message, type:'ERROR'})
    },
  })

  const submitHandle = handleSubmit((data) => {
    mutation.mutate(data)
  })



  return (
    <form className='flex flex-col gap-5' onSubmit={submitHandle}>
      <h2 className='text-4xl font-semibold text-gray-800 mb-4'>
        Create an Account
      </h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-base font-bold flex-1 '>
          First Name
          <input
            className='border rounded w-full py-2 px-3 font-medium text-base text-gray-600'
            {...register('firstName', { required: 'This field is required!' })}
          />
          {errors.firstName && (
            <span className='text-red-500'>{errors.firstName.message}</span>
          )}
        </label>
        <label className='text-gray-700 text-base font-bold flex-1'>
          Last Name
          <input
            className='border rounded w-full py-2 px-3 font-medium text-base text-gray-600'
            {...register('lastName', { required: 'This field is required!' })}
          />
          {errors.lastName && (
            <span className='text-red-500'>{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className='text-gray-700 text-base font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-2 px-3 font-medium text-base text-gray-600'
          {...register('email', { required: 'This field is required!' })}
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-base font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-2 px-3 font-medium text-base text-gray-600'
          {...register('password', {
            required: 'This field is required!',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long!',
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-base font-bold flex-1'>
        Confirm Password
        <input
          type='confirmPassword'
          className='border rounded w-full py-2 px-3 font-medium text-base text-gray-600'
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required!'
              } else if (watch('password') !== val) {
                return 'Your password do not match!!'
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex justify-between items-center">
        <span className="text-sm mt-5">
          Already Registered? {" "}
          <Link className="underline" to='/signin'>Sign in here</Link>
        </span>
        <button
          type='submit'
          className='bg-blue-600 text-white py-1 px-3 font-semibold hover:bg-blue-500 text-xl mt-5 rounded-sm'
        >
          Create Account
        </button>
      </span>
    </form>
  )
}

export default Register
