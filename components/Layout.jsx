import React, { useState } from 'react'
import LeftBar from './LeftBar'
import Nav from './Nav'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Layout = ({ children, data }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [activeNav, setActiveNav] = useState({left: false})

  if (status !== 'loading') {
    return (
      <div className='flex max-w-full'>
        {status == 'authenticated' && <LeftBar activeNav={activeNav} setActiveNav={setActiveNav} />}
        <div className='flex-1'>
          {status == 'authenticated' && <Nav setActiveNav={setActiveNav} />}
          {children}
        </div>
      </div>
    )
  } 

  return (
    <h1 className='font-semibold text-4xl text-center mt-5'>Layout Loading...</h1>
  )
}

export default Layout