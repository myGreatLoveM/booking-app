import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import SignOutButton from "./SignOutButton"

const Header = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <div className='bg-blue-800 py-6 '>
      <div className='w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] mx-auto flex justify-between '>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>Holidays.com</Link>
        </span>
        <span className='flex space-x-2 '>
          {isLoggedIn ? (
            <>
              <Link
                to='/my-bookings'
                className='flex items-center text-white px-3 font-bold hover:bg-blue-500 bg-blue-600 rounded-sm'
              >
                My Bookings
              </Link>
              <Link
                to='/my-hotels'
                className='flex items-center text-white px-3 font-bold hover:bg-blue-500 bg-blue-600 rounded-sm'
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to='/signin'
              className='flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white rounded-sm'
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header