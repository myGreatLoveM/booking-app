import { FormProvider, useForm } from 'react-hook-form'
import DetailsSection from './DetailsSection'
import TypeSection from './TypeSection'
import FacilitiesSection from './FacilitiesSection'
import GuestSection from './GuestSection'
import ImagesSection from './ImagesSection'

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  imageFiles: FileList
  adultCount: number
  childCount: number
}

type Props = {
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit } = formMethods

  const submitHandle = handleSubmit((formDataJson: HotelFormData) => {
    // create new formData object & call api
    console.log(formDataJson)
    const formData = new FormData()
    formData.append('name', formDataJson.name)
    formData.append('city', formDataJson.city)
    formData.append('country', formDataJson.country)
    formData.append('description', formDataJson.description)
    formData.append('type', formDataJson.type)
    formData.append('pricePerNight', formDataJson.pricePerNight.toString())
    formData.append('starRating', formDataJson.starRating.toString())
    formData.append('adultCount', formDataJson.adultCount.toString())
    formData.append('childCount', formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile)
    })
    console.log(formData)

    onSave(formData)
  })

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={submitHandle}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className='flex justify-end'>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-blue-600 text-white py-1 px-4 font-semibold hover:bg-blue-500 text-xl rounded disabled:bg-gray-500'
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
