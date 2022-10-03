import { AppShortcut, Menu as MenuIcon, Class, Logout, PeopleAlt, Close } from '@mui/icons-material'
import { Box, Button, Drawer, IconButton, MenuItem, MenuList, useMediaQuery } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LeftBar = ({ activeNav, setActiveNav }) => {
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width:1000px)')

    const pathName = router.route.split("/")

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setActiveNav({ left: false });
    };

    return (
        <>
            {
                isMobile ?
                    <Drawer
                        anchor={'left'}
                        open={activeNav.left}
                        onClose={toggleDrawer(false)}
                        sx={{
                            display: 'block',
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', maxWidth: '280px', width: '100%' },
                        }}
                    >
                        <div className='max-w-[280px] w-full h-full max-h-[100vh] overflow-y-auto border-r bg-none border-gray-200 sticky top-0'>
                            <Box className='flex justify-between items-center py-[24px] px-4'>
                                <Link href='/'>
                                    <a className='block font-semibold text-4xl'>
                                        Logo
                                    </a>
                                </Link>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={() => setActiveNav({ left: false })}
                                    sx={{ bgcolor: 'none', borderColor: '#000' }}
                                    className='bord border-red-500'
                                >
                                    <Close sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                            <MenuList className='nav mt-5'>
                                <MenuItem sx={{ padding: '0', marginTop: '5px' }} onClick={() => setActiveNav({ left: false })}>
                                    <Link href='/'>
                                        <a className={` block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                            <AppShortcut className='w-[20px] text-gray-700' />
                                            <span className='ml-3'>App</span>
                                        </a>
                                    </Link>
                                </MenuItem>
                                <MenuItem sx={{ padding: '0', marginTop: '5px' }} onClick={() => setActiveNav({ left: false })}>
                                    <Link href='/users'>
                                        <a className={` block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/users' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                            <PeopleAlt className='w-[20px] text-gray-700' />
                                            <span className='ml-3'>Users</span>
                                        </a>
                                    </Link>
                                </MenuItem>
                                <MenuItem sx={{ padding: '0', marginTop: '5px' }} onClick={() => setActiveNav({ left: false })}>
                                    <Link href='/courses'>
                                        <a className={` block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/courses' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                            <Class className='w-[20px] text-gray-700' />
                                            <span className='ml-3'>Courses</span>
                                        </a>
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    sx={{ padding: '0', marginTop: '5px' }}
                                    onClick={() => {
                                        signOut({ redirect: false })
                                        setActiveNav({ left: false })
                                    }}
                                >
                                    {/* <Link href='/login'> */}
                                    <a className={` block w-full h-full px-4 py-2 text-lg cursor-pointer ${router.route == '/login' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                        <Logout className='w-[20px] text-gray-700' />
                                        <span className='ml-3'>Logout</span>
                                    </a>
                                    {/* </Link> */}
                                </MenuItem>
                            </MenuList>
                        </div>
                    </Drawer> :
                    <div className='max-w-[280px] w-full h-full max-h-[100vh] overflow-y-auto border-r bg-none border-gray-200 px-8 sticky top-0'>
                        <Link href='/'>
                            <a className='font-semibold text-4xl py-[24px] inline-block'>
                                Logo
                            </a>
                        </Link>
                        <MenuList className='nav mt-5'>
                            <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                                <Link href='/'>
                                    <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${pathName[1] == '' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                        <AppShortcut className='w-[20px] text-gray-700' />
                                        <span className='ml-3'>App</span>
                                    </a>
                                </Link>
                            </MenuItem>
                            <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                                <Link href='/users'>
                                    <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${pathName[1] == 'users' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                        <PeopleAlt className='w-[20px] text-gray-700' />
                                        <span className='ml-3'>Users</span>
                                    </a>
                                </Link>
                            </MenuItem>
                            <MenuItem sx={{ padding: '0', marginTop: '5px' }}>
                                <Link href='/courses'>
                                    <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer ${pathName[1] == 'courses' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition`}>
                                        <Class className='w-[20px] text-gray-700' />
                                        <span className='ml-3'>Courses</span>
                                    </a>
                                </Link>
                            </MenuItem>
                            <MenuItem sx={{ padding: '0', marginTop: '5px' }} onClick={() => signOut({ redirect: false })}>
                                {/* <Link href='/login'> */}
                                <a className={`rounded block w-full h-full px-4 py-2 text-lg cursor-pointer transition`}>
                                    <Logout className='w-[20px] text-gray-700' />
                                    <span className='ml-3'>Logout</span>
                                </a>
                                {/* </Link> */}
                            </MenuItem>
                        </MenuList>
                    </div>
            }
        </>
    )
}

export default LeftBar