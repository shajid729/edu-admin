import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'

const login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <Box className='min-h-[100vh] w-full flex  flex-col items-center justify-center'>
        <Box className='max-w-[600px] w-full'>
          <h1 className='text-center font-semibold text-4xl'>Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col w-full p-8 border border-gray-300 mt-8 rounded' autocomplete="off">
            <TextField
              variant='outlined'
              label='Email'
              type='email'
              className='mt-8 w-full'
            />
            <TextField
              variant='outlined'
              label='Password'
              type='password'
              className='mt-8 w-full'
            />
            <Button
              variant='contained'
              type='submit'
              className='mt-8 w-full transition bg-[#5772ff] hover:bg-[#4b65e8] py-3'
            >
              Submit
            </Button>
            <p className='text-center mt-4'>Dont have an account ? <Link href='/signup'><a className='text-blue-600 underline'>Sign Up</a></Link></p>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default login