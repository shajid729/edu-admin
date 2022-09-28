import { Container } from '@mui/material';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Wait() {
  const router = useRouter()
  const { data: session, status } = useSession()
  // console.log(session);

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  else if (status == 'authenticated' && !session?.user?.role == 'user') {
    router.push('/')
  }

  else if (status == 'authenticated' && session?.user?.role == 'user') {
    return (
      <>
        <h1>Wait</h1>
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
  if (session?.user?.name && session?.user.role === 'user') {
    return {
      props: {}
    }
  } else if (session?.user?.name && session?.user.role !== 'user') {
    return {
      redirect: {
        permanent: false,
        destination: `/`
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
