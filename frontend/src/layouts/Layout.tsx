import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen min-w-screen'>
      <Header />
      <Hero />
      <div className='w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] mx-auto py-12 flex-1'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
