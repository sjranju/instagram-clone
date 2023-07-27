/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'

const UnderConstruction = () => {
    return (
        <div className='bg-black space-y-4 h-screen'>
            <div className="flex flex-col justify-center items-center">
                <img src="./images/underConstruction1.png" alt="under construction" className='h-60 w-60' />
                <div className="text-white text-lg">This page is under construction</div>
            </div>
        </div>
    )
}

export default UnderConstruction
