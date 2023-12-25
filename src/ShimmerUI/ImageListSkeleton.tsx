import React from "react"
import Skeleton from "react-loading-skeleton"

const ImageListSkeleton = () => {
    return (
        <div className="w-[420px] mt-[27px]">
            <Skeleton width={'100%'} height={'100%'}></Skeleton>
        </div>
    )
}

export default ImageListSkeleton