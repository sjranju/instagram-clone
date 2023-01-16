/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Instagram - Not Found'
    }, [])

    return (
        <div className='flex mx-auto align-center justify-center'>
            <p>Not Found!</p>
        </div>
    )
}

export default NotFound
