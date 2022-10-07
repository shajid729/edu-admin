import { Edit } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useMediaQuery } from '@mui/material';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Courses({ courses }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [filter, setFilter] = useState({ class: '', subject: '', value: '' })
  const isMobile = useMediaQuery('(max-width:1000px)')

  console.log(courses);

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  else if (status == 'authenticated' && session?.user?.name) {
    return (
      <>
        <Box className='flex justify-between items-center my-4'>
          <h1 className='font-semibold text-2xl'>Courses</h1>
          <Button onClick={() => router.push('/courses/create')} variant='contained' size={'medium'} sx={{ bgcolor: '#5848ff', '&:hover': { bgcolor: '#4032dd' } }}>+ Add New</Button>
        </Box>
        <Box className='flex flex-wrap'>
          <Autocomplete
            options={Class}
            size="small"
            sx={{ width: 150, margin: '10px 10px 0 0' }}
            value={filter.class}
            onChange={(e, v) => setFilter({ subject: '', value: '', class: v })}
            renderInput={(params) => <TextField size="small" {...params} label="Class" />}
          />
          <Autocomplete
            options={filter.class ? (filter.class == 'SSC' ? SSubject : HSubject) : []}
            size="small"
            sx={{ width: 170, margin: '10px 10px 0 0' }}
            value={filter.subject}
            onChange={(e, v) => setFilter({ ...filter, subject: v?.label, value: v?.value })}
            renderInput={(params) => <TextField size="small" {...params} label="Subject" />}
          />
        </Box>
        {/* Courses Section */}
        <div className={`${!isMobile ? 'max-w-[80vw]' : 'max-w-[90vw]'} m-auto`}>
          <div className='w-[100%] overflow-x-auto my-4'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: { md: '700px', xs: '900px' } }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Class</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Chapter</TableCell>
                    <TableCell align="center">Toal</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Box className='w-[130px] flex justify-center items-center border  overflow-hidden max-h-full aspect-video bg-gray-500 rounded mx-auto'>
                          <img
                            src={row.image}
                            alt={row.title}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ maxWidth: '300px' }}>{row.name}</TableCell>
                      <TableCell align="center">{row.class}</TableCell>
                      <TableCell align="center">{row.subject}</TableCell>
                      <TableCell align="center">{row.chapter}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </>
    )
  }

  return (
    <h1 className='text-center text-4xl font-semibold'>Loading...</h1>
  )
}


export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const res = await fetch("https://shajid-edu-admin.vercel.app//api/course")
  const data = await res.json()

  if (session?.user?.name) {
    return {
      props: { courses: data.message }
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