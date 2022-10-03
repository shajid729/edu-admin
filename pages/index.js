import { Container } from '@mui/material';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  else if (status == 'authenticated' && session?.user?.name) {
    return (
      <>
        <h1 className='text-center font-semibold sm:text-4xl text-2xl mt-4'>👋 {session?.user?.name}</h1>
        <h1 className='text-center font-semibold sm:text-4xl text-2xl mt-4'>Welcome to Edu-Admin Panel</h1>
      </>
    )
  }

  return (
    <h1 className='text-center text-4xl font-semibold'>Loading...</h1>
  )
}


export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session?.user?.name && session?.user.role !== 'user') {
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
