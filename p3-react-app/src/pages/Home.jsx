import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate =  useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleKanban = () => {
        navigate('/kanban')
    }

  return (
    <div className='w-full h-screen'>

        {/* Header */}
        <div className='w-full flex px-8 py-6 justify-between'>
            <p className='font-bold text-xl text-purple-800'>CaliKan</p>

            {/* Nav */}
            <div className='flex w-[140px] justify-between'>
                <p className='text-gray-700'>Calendar</p>
                <p className='text-gray-700'>|</p>
                <p className='text-gray-700 cursor-pointer hover:text-gray-500'
                    onClick={handleKanban}
                >KanBan</p>
            </div>

            <Button
                variant='contained'
                className='bg-purple-800 text-purple-100 text-xs'
                onClick={handleLogin}
            >
                Sign In
            </Button>
        </div>

        {/* Main */}
        <div className='w-full flex justify-center flex-col'>
            <div className='flex justify-center flex-col'>
                <h1 className='text-center text-4xl font-bold mt-36'>
                    Take Control of Your Schedule and Tasks
                </h1>
                <p className='text-center text-2xl mt-4'>Get organized and boost your productivity with CaliKan 
                    - the app for managing your schedule and tasks.
                </p>
            </div>
        </div>

    </div>
  )
}

export default Home