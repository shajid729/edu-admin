import React from 'react'
import LeftBar from './LeftBar'
import Nav from './Nav'

const Layout = ({ children }) => {
  const user = false
  return (
    <div className='flex max-w-full'>
      {user && <LeftBar />}
      <div className='flex-1'>
        {user && <Nav/>}
        {children}
      </div>
    </div>
  )
}

export default Layout