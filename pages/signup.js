import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { signIn, getSession, useSession } from 'next-auth/react'
import LoadingOverlay from '../components/LoadingOverlay';

const Signup = () => {
  const router = useRouter()
  const [value, setValue] = useState({ name: '', email: '', password: '' })
  const [active, setActive] = useState({ overlay: false, otpBox: false })
  const { data: session, status } = useSession()

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!value.name) {
      toast.error('Fullname is required')
    } else if (!value.email) {
      toast.error('Email is required')
    } else if (!value.password) {
      toast.error('Password is required')
    } else {
      setActive({ ...active, overlay: true })
      const toastId = toast.loading('Loading...')
      const res = await signIn('credentials', { ...value, redirect: false, signup: true })
      if (res.ok) {
        toast.dismiss(toastId)
        setActive({ overlay: true, otpBox: true })
        toast.success('An OTP has sent to your mail')
        console.log({ session, status })
      } else {
        toast.dismiss(toastId)
        toast.error(res.error)
        // console.log(res);
        setActive({ overlay: false, otpBox: false })
      }
    }
  }

  if (status == 'authenticated' && session?.user?.name) {
    router.push('/')
  }

  if (status == 'unauthenticated') {
    return (
      <>
        <LoadingOverlay overlay={active.overlay} otpBox={active.otpBox} setActive={setActive} email={value.email} />
        <Box className='min-h-[100vh] w-full flex  flex-col items-center justify-center'>
          <Box className='max-w-[600px] w-full'>
            <h1 className='text-center font-semibold text-4xl'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-full p-8 border border-gray-300 mt-8 rounded' autoComplete="off">
              <TextField
                variant='outlined'
                label='Fullname'
                type='text'
                name='name'
                value={value.name}
                onChange={handleChange}
                className='w-full'
                sx={{ marginTop: '2rem' }}
              />
              <TextField
                variant='outlined'
                label='Email'
                type='email'
                name='email'
                value={value.email}
                onChange={handleChange}
                className='w-full'
                sx={{ marginTop: '2rem' }}
              />
              <TextField
                variant='outlined'
                label='Password'
                type='password'
                name='password'
                value={value.password}
                onChange={handleChange}
                className='w-full'
                sx={{ marginTop: '2rem' }}
              />
              <Button
                variant='contained'
                type='submit'
                className='w-full transition'
                sx={{ marginTop: '2rem', bgcolor: '#5772ff', padding: '8px 12px', '&:hover': { bgcolor: '#4b65e8' } }}
              >
                Submit
              </Button>
              <p className='text-center mt-4'>Already have an account ? <Link href='/login'><a className='text-blue-600 underline'>Login</a></Link></p>
            </form>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <h1 className='text-center text-4xl font-semibold'>Loading...</h1>
  )

}

export default Signup


export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  // console.log(session);
  if (!session?.user?.name) {
    return {
      props: {}
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`
      }
    }
  }
}