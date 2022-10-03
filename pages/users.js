import { MoreVert } from '@mui/icons-material';
import { Box, Button, IconButton, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Users() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isMobile = useMediaQuery('(max-width:1000px)')
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(1)
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState({ id: null, action: null });

  const openModal = (id, action) => {
    setOpen(true)
    setAction({ id, action })
  }

  const handleAction = async () => {
    if (action.action == 'editor') {
      const res = await fetch(`/api/users?id=${action.id}`, {
        method: 'PATCH'
      })
      const data = await res.json()
      setAction({ action: null, id: null })
      setOpen(false)
      if (res.status == 200) {
        toast.success(data.message)
        setUpdate(e=>update+1)
      } else {
        toast.error(data.error)
      }
    }

    else if (action.action == 'delete') {
      const res = await fetch(`/api/users?id=${action.id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      setAction({ action: null, id: null })
      setOpen(false)
      if (res.status == 200) {
        toast.success(data.message)
        setUpdate(e=>update+1)
      } else {
        toast.error(data.error)
      }
    }
  }

  const getUsers = async () => {
    const res = await fetch("/api/users")
    const data = await res.json()
    setUsers(data.message)
  }

  useEffect(()=>{
    getUsers()
  },[update])

  if (status == 'unauthenticated') {
    router.push('/login')
  }

  else if (status == 'authenticated' && session?.user?.name) {
    return (
      <>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 className='text-center my-4 text-2xl font-medium'>Are You Sure ?</h2>
            <Box className='flex w-full justify-between'>
              <Button
                variant='outlined'
                onClick={() => {
                  setOpen(false)
                  setAction({ action: null, id: null })
                }}>
                No
              </Button>
              <Button variant='contained' onClick={handleAction}>Yes</Button>
            </Box>
          </Box>
        </Modal>
        <Box className='flex justify-between items-center my-4'>
          <h1 className='font-semibold text-2xl'>Users</h1>
        </Box>
        <div className={`${!isMobile ? 'max-w-[80vw]' : 'max-w-[90vw]'} m-auto`}>
          <div className='w-[100%] overflow-x-auto my-4'>
            <TableContainer sx={{minWidth:'600px'}} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, i) => (
                    <TableRow
                      key={i}
                      sx={{ '& td, & th': { padding: '7px 0' } }}
                    >
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                      <TableCell align="center">
                        <Box>
                          <Button sx={{ textTransform: 'inherit' }} disabled={user.role == 'admin' || session?.user?.role !== 'admin' || user.role == 'editor'} onClick={() => openModal(user._id, 'editor')}>Editor</Button>
                          <Button sx={{ textTransform: 'inherit', color: 'red' }} disabled={user.role == 'admin' || session?.user?.role !== 'admin'} onClick={() => openModal(user._id, 'delete')}>Delete</Button>
                        </Box>
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};