import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Courses() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [filter, setFilter] = useState({ class: '', subject: '' })

  filter.subject && console.log(filter);

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  else if (status == 'authenticated' && session?.user?.name) {
    return (
      <>
        <Box className='flex justify-between items-center my-4'>
          <h1 className='font-semibold text-2xl'>Courses</h1>
          <Button variant='contained' size={'medium'} sx={{ bgcolor: '#5848ff', '&:hover': { bgcolor: '#4032dd' } }}>+ Add New</Button>
        </Box>
        <Box className='flex flex-wrap'>
          <Autocomplete
            options={Class}
            size="small"
            sx={{ width: 150, margin: '10px 10px 0 0' }}
            value={filter.class}
            onChange={(e, v) => setFilter({ ...filter, class: v })}
            renderInput={(params) => <TextField size="small" {...params} label="Class" />}
          />
          <Autocomplete
            options={filter.class ? (filter.class == 'SSC' ? SSubject : HSubject) : []}
            size="small"
            sx={{ width: 170, margin: '10px 10px 0 0' }}
            value={filter.subject}
            onChange={(e, v) => setFilter({ ...filter, subject: v.value })}
            renderInput={(params) => <TextField size="small" {...params} label="Subject" />}
          />
        </Box>
      </>
    )
  }

  return (
    <h1 className='text-center text-4xl font-semibold'>Loading...</h1>
  )
}


export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  // console.log(session);
  if (session?.user?.name) {
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
        destination: `/login`
      }
    }
  }
}

const Class = [
  'HSC',
  'Admission',
  'SSC',
]

const HSubject = [
  { label: 'Physics 1st', value: 'phsics1' },
  { label: 'Physics 2nd', value: 'phsics2' },
  { label: 'Chemistry 1st', value: 'chemestry1' },
  { label: 'Chemistry 2nd', value: 'chemestry2' },
  { label: 'Higher Math 1st', value: 'hmath1' },
  { label: 'Higher Math 2nd', value: 'hmath2' },
]

const SSubject = [
  { label: 'Physics', value: 'phsics' },
  { label: 'Chemistry', value: 'chemestry' },
  { label: 'Math', value: 'math' },
  { label: 'Higher Math', value: 'hmath' },
]