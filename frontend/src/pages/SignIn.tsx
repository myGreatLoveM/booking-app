import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<SignInFormData>()
    const { showToast,  } = useAppContext()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({message: 'Signin successful', type: 'SUCCESS'})
            await queryClient.invalidateQueries('validateToken')
            navigate('/')
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'SUCCESS' })
        }
    })

    const submitHandle  = handleSubmit((data) => {
        mutation.mutate(data)
    })

  return (
    <form className='flex flex-col gap-5' onSubmit={submitHandle}>
      <h2 className='text-3xl font-bold '>Sign In</h2>
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
      <span className="flex justify-between items-center">
        <span className="text-sm mt-5">
          Not Registered? {" "}
          <Link className="underline" to='/register'>Create an account here</Link>
        </span>
        <button
          type='submit'
          className='bg-blue-600 text-white py-1 px-3 font-semibold hover:bg-blue-500 text-xl mt-5 rounded-sm'
        >
          Sign In
        </button>
      </span>
    </form>
  )
}

export default SignIn