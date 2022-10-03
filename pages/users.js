import { Edit } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Users() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isMobile = useMediaQuery('(max-width:1000px)')

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  else if (status == 'authenticated' && session?.user?.name) {
    return (
      <>
        <h1>Users</h1>
        <div className={`${!isMobile ? 'max-w-[80vw]' : 'max-w-[90vw]'} m-auto`}>
          
        </div>
      </>
    )
  }

  return (
    <h1 className='text-center text-4xl font-semibold'>Loading...</h1>
  )
}


const rows = [
  {
    image: '',
    title: 'Newtonian Mecahnics Newtonian Mecahnics Newtonian Mecahnics Newtonian Mecahnics Newtonian Mecahnics Newtonian Mecahnics Newtonian Mecahnics ',
    class: 'HSC',
    subject: 'Physics 1st',
    chapter: '1',
    date: '18/04/2022'
  },
  {
    image: '',
    title: 'Newtonian Mecahni',
    class: 'HSC',
    subject: 'Physics 1st',
    chapter: '1',
    date: '18/04/2022'
  },
  {
    image: '',
    title: 'Newtonian Mecahni',
    class: 'HSC',
    subject: 'Physics 1st',
    chapter: '1',
    date: '18/04/2022'
  },
];


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
