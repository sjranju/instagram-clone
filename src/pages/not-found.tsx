/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
// import notfound from '/images/notfound.png'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Instagram - Not Found'
    }, [])

    return (
        <div className='flex flex-col items-center justify-center space-y-4 h-screen'>
            <img src="./images/notfound.png" alt="not-found" className='h-60 w-60' />
            <div className='flex flex-col justify-center items-center'>
                <div className='text-2xl font-bold'>There's nothing here...</div>
                <div className='text-sm'>..maybe the page that you are looking for is not found or never existed.</div>
            </div>
            <div className="bg-postSeperator text-white py-2 px-4 rounded-full hover:bg-notfoundbg hover:text-white hover:scale-x-110 hover:scale-y-110 ">
                <Link to={ROUTES.LOGIN} >Go to Home Page!</Link>
            </div>

        </div>
    )
}

export default NotFound
