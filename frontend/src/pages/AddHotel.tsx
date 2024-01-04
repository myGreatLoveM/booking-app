import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext"

const AddHotel = () => {
  const {showToast} = useAppContext()

  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({message: 'Hotel saved!', type: 'SUCCESS'})
    },
    onError: () => {
      showToast({ message: 'Error saving Hotel!', type: 'SUCCESS' })
    }
  })

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData)
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotel