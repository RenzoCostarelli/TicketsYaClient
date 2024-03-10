"use client";

import { useCallback, Dispatch, SetStateAction } from "react";

import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setDeleteImageValue: Dispatch<SetStateAction<boolean>>;
};

const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  setDeleteImageValue,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
      setDeleteImageValue(false);
    },
    [setFiles, onFieldChange, setDeleteImageValue]
  );

  const handleDeleteImage = async (url: string) => {
    setFiles([]);
    onFieldChange("");
    setDeleteImageValue(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="flex-center border bg-dark-3 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
      >
        <div className="flex-center text-center flex-col py-5 text-grey-500 relative min-h-[145px]">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt="image"
                fill
                className="object-cover aspect-square"
              />
              <Button
                variant="secondary"
                onClick={() => handleDeleteImage(imageUrl)}
                className="absolute top-2 right-2"
              >
                <Trash2 className="h-6 w-6" />
              </Button>
            </>
          ) : (
            <>
              <input
                {...getInputProps()}
                className="cursor-pointer"
                type="file"
              />
              <ImagePlus
                className="m-auto"
                size={40}
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <h3 className="mb-2 mt-2">Tamaño máximo. {"1MB"}</h3>
              <p className="p-medium-12">PNG, JPG</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
