import React, { useEffect, useState } from 'react'
import LeftBar from './LeftBar'
import Nav from './Nav'
import { getSession, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

const Layout = ({ children, data }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [activeNav, setActiveNav] = useState({ left: false })
  
  useEffect(()=>{
    if(status == 'authenticated' && !session?.user?.name){
      signOut({ redirect: false })
    }
  },[])

  if (status !== 'loading') {
    return (
      <div className='flex max-w-full'>
        {status == 'authenticated' && session?.user.role !== 'user' && session?.user?.name && <LeftBar activeNav={activeNav} setActiveNav={setActiveNav} />}
        <div className='flex-1'>
          {status == 'authenticated' && session?.user.role !== 'user' && session?.user?.name &&  <Nav setActiveNav={setActiveNav} />}
          <Container>
            {children}
          </Container>
        </div>
      </div>
    )
  }

  return (
    <h1 className='font-semibold text-4xl text-center mt-5'>Layout Loading...</h1>
  )
}

export default Layout