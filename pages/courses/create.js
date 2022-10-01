import React, { useState } from 'react';
import { Autocomplete, TextField, Button, StepLabel, Step, Stepper, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

const steps = ['Add Playlist ID', 'Create Course'];

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [playlistId, setPlaylistId] = useState('')
  const [errorPlaylistId, setErrorPlaylistId] = useState("")
  const [courseData, setCourseData] = useState({ image: '', total: '', class: '', subject: '', subValue: '' })
  const router = useRouter()
  const YOUTUBE_LINK = 'https://www.googleapis.com/youtube/v3/playlistItems'
  const YOUTUBE_PLAYLIST_ID = 'PLubWB9tWo5lVAdd2bXEW3Tgn99tcxzDbt'

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setCourseData({ image: '', total: '', class: '', subject: '', subValue: '' })
    setPlaylistId('')
  }

  const handleCancel = () => {
    handleReset()
    router.back()
  }

  const handlePlaylistIdSubmit = async () => {

    const res = await fetch(`${YOUTUBE_LINK}?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`)
    const data = await res.json()
    if (data?.items) {
      handleNext()
      const content = {
        total: data?.items?.length,
        thumb: data?.items[0]?.snippet?.thumbnails.high.url,
      }
      setCourseData({ ...courseData, total: content.total, image: content.thumb })
    } else {
      setErrorPlaylistId("Invalid PlaylisId")
    }
  }

  const handleCourseSubmit = () => {
    console.log(courseData)
  }

  return (
    <Box sx={{ maxWidth: '700px', width: '100%', margin: '2rem auto' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label} >
              <StepLabel sx={{ display: 'grid', placeItems: 'center', gridGap: '8px' }}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {
        activeStep == 0 ? (
          <Box sx={{ margin: '2rem auto' }}>
            <TextField
              label='Playlist ID'
              width='100%'
              sx={{ width: '100%', margin: '1rem auto' }}
              onChange={(e) => {
                setPlaylistId(e.target.value)
                setErrorPlaylistId('')
              }}
              value={playlistId}
              helperText={errorPlaylistId}
              error={errorPlaylistId ? true : false}
            />
          </Box>
        ) : (
          <Box sx={{ margin: '2rem auto' }}>
            <Box>
              {courseData.image && <BlurImage image={'https://i.ytimg.com/vi/CNNkrvV_JaM/hqdefault.jpg'} />}
            </Box>
            <TextField
              label='Course Thumbnail'
              width='100%'
              sx={{ width: '100%', margin: '1rem auto' }}
              onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
              value={courseData.image}
            />
            <TextField
              label='Total Video'
              width='100%'
              sx={{ width: '100%', margin: '1rem auto' }}
              onChange={(e) => setCourseData({ ...courseData })}
              value={courseData.total}
              disabled
            />
            <Autocomplete
              options={Class}
              sx={{ width: '100%', margin: '1rem auto' }}
              value={courseData.class}
              onChange={(e, v) => setCourseData({ ...courseData, subject: '', subValue: '', class: v })}
              renderInput={(params) => <TextField size="small" {...params} label="Class" />}
            />
            <Autocomplete
              options={courseData.class ? (courseData.class == 'SSC' ? SSubject : HSubject) : []}
              sx={{ width: '100%', margin: '2rem auto' }}
              value={courseData.subject}
              onChange={(e, v) => setCourseData({ ...courseData, subject: v?.label, subValue: v?.value })}
              renderInput={(params) => <TextField size="small" {...params} label="Subject" />}
            />
          </Box>
        )
      }

      {/* Common Component for all steps */}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          onClick={handleCancel}
          variant='outlined'
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === 0 ?
          <Button
            onClick={handlePlaylistIdSubmit}
            disabled={!playlistId}
            variant='contained'
          >
            Next
          </Button> :
          <Button
            onClick={handleCourseSubmit}
            disabled={!courseData.image || !courseData.class || !courseData.subject}
            variant='contained'
          >
            Submit
          </Button>}
      </Box>
    </Box>
  );
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