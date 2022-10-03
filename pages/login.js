import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { signIn, getSession, useSession } from 'next-auth/react'
import LoadingOverlay from '../components/LoadingOverlay';

const Login = () => {
  const router = useRouter()
  const [value, setValue] = useState({ email: '', password: '' })
  const [active, setActive] = useState(false)
  const { data: session, status } = useSession()

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!value.email) {
      toast.error('Email is required')
    } else if (!value.password) {
      toast.error('Password is required')
    } else {
      // new Promise(resolve => {
      setActive(true)
      const toastId = toast.loading('Loading...')
      // resolve()
      setTimeout(async () => {
        const res = await signIn('credentials', { ...value, redirect: false, login: true })
        if (res.ok) {
          toast.dismiss(toastId)
          toast.success('Login Successful')
          console.log(res);
          setValue({ email: '', password: '' })
          router.push('/')
        } else {
          toast.dismiss(toastId)
          toast.error(res.error)
          // console.log(res);
        }
        setActive(false)
        // }, 10)
      })
    }
  }

  if (status == 'authenticated' && session?.user?.name) {
    router.push('/')
  }

  if (status == 'unauthenticated') {
    return (
      <>
        <LoadingOverlay overlay={active} />
        <Box className='min-h-[100vh] w-full flex  flex-col items-center justify-center'>
          <Box className='max-w-[600px] w-full'>
            <h1 className='text-center font-semibold text-4xl'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-full p-8 border border-gray-300 mt-8 rounded' autoComplete="off">
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
              <p className='text-center mt-4'>Dont have an account ? <Link href='/signup'><a className='text-blue-600 underline'>Sign Up</a></Link></p>
            </form>
          </Box>
          <Box className='mt-5 p-4 border max-w-[600px] w-full text-center'>
            <h1 className='font-semibold text-2xl mb-4'>Test User</h1>
            <div className='text-lg'>
              <span className='font-medium'>Email :</span> admin@gmail.com
            </div>
            <div className='text-lg'>
              <span className='font-medium'>Password :</span> admin
            </div>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <h1 className='text-center text-4xl font-semibold'>Loading...</h1>
  )


}

export default Login


export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session?.user?.name) {
    return {
      props: {}
    }
  } else if (session?.user?.name && session?.user.role == 'user') {
    return {
      redirect: {
        permanent: false,
        destination: `/wait`
      }
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