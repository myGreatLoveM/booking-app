const Footer = () => {
  return (
    <div className='bg-blue-800 py-10'>
      <div className='w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%] mx-auto flex justify-between items-center gap-4'>
        <span className='text-2xl sm:text-3xl text-white font-bold tracking-tight'>
          Booking.com
        </span>
        <span className='text-white font-bold tracking-tight flex gap-2 sm:gap-4 items-center'>
          <p className=' text-[14px] sm:text-[16px] cursor-pointer'>
            Privacy Policy
          </p>
          <p className='text-[14px] sm:text-[16px] cursor-pointer'>
            Terms of Service
          </p>
        </span>
      </div>
    </div>
  )
}

export default Footer
