import React from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const DownloadAppSkeleton = () => {
    return (
        <div className="flex space-x-4 justify-center items-center">
            <Skeleton width={100} height={40}></Skeleton>
            <Skeleton width={100} height={40}></Skeleton>
        </div>
    )
}

export default DownloadAppSkeleton