'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

var cloudinary

export default function ImageUpload ({
    onChange,
    value
}) {

    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="qgfltncp"
            options={{
                maxFiles: 1
            }}
        >
            {({open}) => {
                return(
                    <div onClick={()=> open?.()} className="
                        relative
                        cursor-pointer
                        hover:opacity-70
                        transition
                        border-dashed
                        border-2
                        p-20
                        border-neutral-300
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600
                    ">
                        <TbPhotoPlus size={40}/>
                        <div className="font-semibold text-lg">
                            Click to Upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full max-h-full">
                                <Image
                                    alt="Upload"
                                    fill
                                    style={{objectFit: 'cover'}}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}