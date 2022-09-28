import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Courses() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status == 'unauthenticated') {
    router.push('/login')
  }
  
  else if(status == 'authenticated') {
    return (
      <>
        <h1>Courses</h1>
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
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/login`
      }
    }
  }
}