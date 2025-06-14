import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { PiTrashBold } from "react-icons/pi";
import { Text, FieldError } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import UploadIcon from "@shared/components/shape/upload";
import { FileWithPath } from "react-dropzone";

interface UploadZoneProps {
  label?: string;
  name?: string;
  // setValue: any;
  className?: string;
  error?: string;
  formik?: any;
}

interface FileType {
  name?: string;
  base64?: string;
  size?: number;
}

export default function UploadZone({
  label,
  name,
  className,
  formik,
  // setValue,
  error,
}: UploadZoneProps) {
  const [file, setFile] = useState<FileType | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        const base64 = await fileToBase64(selectedFile);

        const newFile = {
          name: selectedFile.name,
          base64,
          size: selectedFile.size,
        };

        setFile(newFile);
        formik?.setFieldValue(name, newFile.base64);
      }
    },
    [formik, name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    formik?.setFieldValue(name, "");
  };

  return (
    <div className={cn("grid", className)}>
      {label && <span className="mb-1.5 block font-semibold">{label}</span>}

      {/* Image Upload Wrapper */}
      <div
        {...getRootProps()}
        className="relative w-[170px] h-[170px] rounded-xl border-[1.8px] overflow-hidden cursor-pointer transition-all duration-300"
      >
        <input {...getInputProps()} />

        {!file ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <UploadIcon className="h-12 w-12" />
            <Text className="text-base font-medium">Upload image</Text>
          </div>
        ) : (
          <div className="relative group w-full h-full">
            {/* Uploaded Image */}
            <img
              src={file.base64}
              alt={file.name}
              className="w-full h-full object-cover"
            />

            {/* Trash Icon for Deleting Image */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering file upload
                removeFile();
              }}
              className="absolute z-30 top-1 right-1 bg-red-500 text-white p-1.5 rounded-full shadow-md transition-all hover:bg-red-600"
            >
              <PiTrashBold className="text-lg" />
            </button>

            {/* Hover Effect - "Change Image" Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 text-black text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Change Image
            </div>
          </div>
        )}
      </div>

      {error && <FieldError error={error} />}
    </div>
  );
}
