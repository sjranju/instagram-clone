import React from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const LogoSkeleton = () => {
    return (
        <div className="mr-8">
            <Skeleton width={150} height={60}></Skeleton>
        </div>
    )
}

export default LogoSkeleton