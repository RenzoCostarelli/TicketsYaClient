"use client";

import { useCallback, Dispatch, SetStateAction } from "react";

import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
    setDeleteImageValue(false);
  }, []);

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
      {imageUrl ? (
        <Button variant="secondary"
          onClick={() => handleDeleteImage(imageUrl)}
        >
          <Trash2 className="h-6 w-6" />
        </Button>
      ) : (
        ""
      )}
      <div
        {...getRootProps()}
        className="flex-center border bg-dark-3 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
      >
        <input {...getInputProps()} className="cursor-pointer" type="file"/>

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
            <ImagePlus
              className="m-auto"
              size={40}
              strokeWidth={1}
              absoluteStrokeWidth
            />
            <h3 className="mb-2 mt-2">Subí tu foto max. "1MB"</h3>
            <p className="p-medium-12">SVG, PNG, JPG</p>
          </div>
        )}
      </div>
    </>
  );
}
