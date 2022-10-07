import React, { useState } from 'react';
import { Autocomplete, TextField, Button, StepLabel, Step, Stepper, Box, Stack, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react'


const PaperComponent = ({ children }) => (
    <Paper style={{ position: 'absolute', bottom: '60px', background: 'white', width: '100%', border: '1px solid #00000060', boxShadow: '0 -5px 8px #00000010' }}>{children}</Paper>
)

const EditCourse = ({ course, error }) => {
    const { data: session } = useSession()
    const [playlistId, setPlaylistId] = useState('')
    const [courseData, setCourseData] = useState({ image: course.image, total: course.total, name: course.name, class: course.class, subject: course.subject, subValue: course.subValue, chapter: course.chapter, title: course.title, category: course.category })
    const router = useRouter()

    const handleReset = () => {
        setTimeout(() => {
            setCourseData({ image: '', total: '', name: '', class: '', subject: '', subValue: '', chapter: '', title: '', category: '' })
            setPlaylistId('')
        }, 1500)
    }

    const handleCancel = () => {
        handleReset()
        router.back()
    }

    const handleCourseSubmit = async () => {
        const toastId = toast.loading('Loading...')
        const res = await fetch('/api/course/create', {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ playlistId, ...courseData, id: course._id, role: session?.user?.role })
        })
        const data = await res.json()
        if (res.ok) {
            toast.dismiss(toastId)
            toast.success(data.message)
            router.push('/courses')
            handleReset()
        } else {
            toast.dismiss(toastId)
            toast.error(data.error)
        }
    }

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    return (
        <>
            <Box sx={{ maxWidth: '700px', width: '100%', margin: '2rem auto' }}>
                <Box sx={{ margin: '2rem auto' }}>
                    <Box>
                        {courseData.image && <BlurImage image={courseData.image} />}
                    </Box>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <TextField
                            label='Course Thumbnail'
                            width='100%'
                            sx={{ width: '100%' }}
                            disabled
                            onChange={(e) => setCourseData({ ...courseData })}
                            value={courseData.image}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <TextField
                            label='Name'
                            width='100%'
                            sx={{ width: '100%' }}
                            onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
                            value={courseData.name}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <TextField
                            label='Title'
                            width='100%'
                            sx={{ width: '100%' }}
                            disabled
                            onChange={(e) => setCourseData({ ...courseData })}
                            value={courseData.title}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <TextField
                            label='Total Video'
                            width='100%'
                            sx={{ width: '100%' }}
                            disabled
                            onChange={(e) => setCourseData({ ...courseData })}
                            value={courseData.total}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <Autocomplete
                            options={Class}
                            sx={{ width: '100%' }}
                            value={courseData.class}
                            onChange={(e, v) => setCourseData({ ...courseData, subject: '', subValue: '', class: v })}
                            renderInput={(params) => <TextField size="small" {...params} label="Class" />}
                            PaperComponent={PaperComponent}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <Autocomplete
                            options={courseData.class ? (courseData.class == 'SSC' ? SSubject : HSubject) : []}
                            sx={{ width: '100%' }}
                            value={courseData.subject}
                            onChange={(e, v) => setCourseData({ ...courseData, subject: v?.label, subValue: v?.value })}
                            renderInput={(params) => <TextField size="small" {...params} label="Subject" />}
                            PaperComponent={PaperComponent}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <TextField
                            label='Chatpter'
                            width='100%'
                            sx={{ width: '100%', }}
                            onChange={(e) => setCourseData({ ...courseData, chapter: e.target.value })}
                            value={courseData.chapter}
                        />
                    </div>
                    <div className='course_create_autocomplete' style={{ display: 'flex', alignItems: 'flex-end', margin: '2rem auto' }}>
                        <Autocomplete
                            options={Category}
                            sx={{ width: '100%' }}
                            value={courseData.category}
                            onChange={(e, v) => setCourseData({ ...courseData, category: v })}
                            renderInput={(params) => <TextField size="small" {...params} label="Category" />}
                            PaperComponent={PaperComponent}
                        />
                    </div>
                </Box>

                {/* Common Component for all steps */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        color="inherit"
                        onClick={handleCancel}
                        variant='outlined'
                        sx={{ mr: 1 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCourseSubmit}
                        disabled={!courseData.image || !courseData.class || !courseData.subject || !courseData.chapter}
                        variant='contained'
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default EditCourse


export const getServerSideProps = async (ctx) => {
    const res = await fetch(`https://shajid-edu-admin.vercel.app/api/course?id=${ctx?.query.courseId}`)
    const data = await res.json()

    if (res.status == 200) {
        return {
            props: {
                course: data.message
            }
        }
    } else {
        return {
            props: {
                error: data.error
            }
        }
    }
}

const BlurImage = ({ image }) => {
    const [loading, setLoading] = useState(true)
    return (
        <Image
            src={image}
            width={1280}
            height={720}
            objectFit='cover'
            className={`transition duration-500 rounded aspect-video ${loading ? 'blur-[20px] scale-110' : 'blur-[0] scale-100'}`}
            onLoadingComplete={() => setTimeout(() => setLoading(false), 100)}
        />
    )
}

const Class = [
    'HSC',
    'SSC',
]

const Category = [
    'Basic',
    'Advanced',
    'Admission',
]

const HSubject = [
    { label: 'Physics 1st', value: 'physics1' },
    { label: 'Physics 2nd', value: 'physics2' },
    { label: 'Chemistry 1st', value: 'chemistry1' },
    { label: 'Chemistry 2nd', value: 'chemistry2' },
    { label: 'Higher Math 1st', value: 'hmath1' },
    { label: 'Higher Math 2nd', value: 'hmath2' },
    { label: 'Biology 1st', value: 'biology1' },
    { label: 'Biology 2nd', value: 'biology2' },
    { label: 'ICT', value: 'ict' },
    { label: 'Bangla 1st', value: 'bangla1' },
    { label: 'Bangla 2nd', value: 'bangla2' },
    { label: 'English 1st', value: 'english1' },
    { label: 'English 2nd', value: 'english2' },
]

const SSubject = [
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Math', value: 'math' },
    { label: 'Higher Math', value: 'hmath' },
    { label: 'Biology', value: 'biology' },
    { label: 'ICT', value: 'ict' },
    { label: 'Bangla 1st', value: 'bangla1' },
    { label: 'Bangla 2nd', value: 'bangla2' },
    { label: 'English 1st', value: 'english1' },
    { label: 'English 2nd', value: 'english2' },
]