import { AppShortcut, Class, Logout, PeopleAlt } from '@mui/icons-material'
import { MenuItem, MenuList } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const LeftBar = () => {
    const router = useRouter()
    return (
        <div className='max-w-[280px] w-full h-full max-h-[100vh] overflow-y-auto border-r bg-none border-gray-200 px-8 sticky top-0'>
            <Link href='/'>
                <a className='block font-semibold text-4xl py-[24px]'>
                    Logo
                </a>
            </Link>
            <MenuList className='nav mt-5'>
                <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                    <Link href='/'>
                        <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                            <AppShortcut className='w-[20px] text-gray-700' />
                            <span className='ml-3'>App</span>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                    <Link href='/users'>
                        <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/users' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                            <PeopleAlt className='w-[20px] text-gray-700' />
                            <span className='ml-3'>Users</span>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                    <Link href='/courses'>
                        <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/courses' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                            <Class className='w-[20px] text-gray-700' />
                            <span className='ml-3'>Courses</span>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                    <Link href='/login'>
                        <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/login' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                        <Logout className='w-[20px] text-gray-700' />
                        <span className='ml-3'>Logout</span>
                        </a>
                    </Link>
                </MenuItem>
            </MenuList>
        </div>
    )
}

export default LeftBar