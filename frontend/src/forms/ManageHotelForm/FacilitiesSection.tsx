import { useFormContext } from 'react-hook-form'
import { hotelFacilities } from '../../config/hotel-options-config'
import { HotelFormData } from './ManageHotelForm'

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Facilities</h2>
      <div className='grid grid-cols-5 gap-3'>
        {hotelFacilities.map((facility, i) => (
          <label key={i} className='flex items-center text-sm text-gary-700'>
            <input
              type='checkbox'
              value={facility}
              className='mr-1'
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true
                  } else {
                    return 'Atleast one facility is required!'
                  }
                },
              })}
            />
            <p className='flex-1'>{facility}</p>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className='text-red-500  font-bold'>
          {errors.facilities.message}
        </span>
      )}
    </div>
  )
}

export default FacilitiesSection
