import React from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const ImageCarouselSkeleton = () => {
    return (
        <div className="mr-8">
            <Skeleton width={380} height={560}></Skeleton>
        </div>
    )
}

export default ImageCarouselSkeleton