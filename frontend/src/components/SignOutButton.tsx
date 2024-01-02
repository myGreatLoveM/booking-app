import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const SignOutButton = () => {
  const { showToast } = useAppContext()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.SignOut, {
    onSuccess: async() => {
      await queryClient.invalidateQueries('validateToken') 
      showToast({ message: 'Signed Out!', type: 'SUCCESS' })
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    }
  })

  const clickHandle = () => {
    mutation.mutate()
    navigate('/')
  }

  return (
    <button onClick={clickHandle} className='flex items-center text-blue-600 px-3 font-bold hover:bg-gray-200 bg-white rounded-sm'>
      Sign out
    </button>
  )
}

export default SignOutButton