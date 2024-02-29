'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'

import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { ImagePlus } from 'lucide-react'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}
const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center border bg-dark-3 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center text-center flex-col py-5 text-grey-500">
          <ImagePlus className="m-auto" size={40} strokeWidth={1} absoluteStrokeWidth />          
          <h3 className="mb-2 mt-2">Subí tu foto "1MG"</h3>
          <p className="p-medium-12">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  )
}