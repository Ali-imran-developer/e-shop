import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@utils/helperFunctions/uploadthing";
import UploadIcon from "@shared/components/shape/upload";
import { FieldError, Loader, Text } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { PiPencilSimple } from "react-icons/pi";
import { FileWithPath } from "react-dropzone";
import { ClientUploadedFileData } from "uploadthing/types";

interface UploadZoneProps {
  name: string;
  getValues?: any;
  setValue?: any;
  className?: string;
  error?: string;
}

export default function AvatarUpload({
  name,
  error,
  className,
  getValues,
  setValue,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const formValue = getValues(name);

  const { startUpload, routeConfig, isUploading } = useUploadThing("avatar", {
    onClientUploadComplete: (
      res: ClientUploadedFileData<any>[] | undefined
    ) => {
      if (setValue) {
        const respondedUrls = res?.map((r) => ({
          name: r.name,
          size: r.size,
          url: r.url,
        }));
        setValue(name, respondedUrls?.[0]);
      }
      toast.success(
        <Text as="b" className="font-semibold">
          Avatar updated
        </Text>
      );
    },
    // onUploadError: (error: Error) => {
    //   console.error(error);
    //   toast.error(error.message);
    // },
  });

  const fileTypes = routeConfig ? Object.keys(routeConfig) : [];

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);

      console.log("file", files);
      const respondedUrls = files?.map((r) => ({
        name: r.name,
        size: r.size,
        // url: r.url,
      }));

      console.log("@respondedUrls", respondedUrls);

      setValue(name, respondedUrls?.[0]);

      // startUpload(files);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  console.log("formValue", formValue);

  return (
    <div className={cn("grid gap-5", className)}>
      <div
        className={cn(
          "relative grid h-40 w-40 place-content-center rounded-full border-[1.8px]"
        )}
      >
        {formValue ? (
          <>
            <figure className="absolute inset-0 rounded-full">
              <img
                // fill
                alt="user avatar"
                src={formValue?.url}
                className="rounded-full"
              />
            </figure>
            <div
              {...getRootProps()}
              className={cn(
                "absolute inset-0 grid place-content-center rounded-full bg-black/70"
              )}
            >
              {isUploading ? (
                // <LoadingSpinner />
                <p>Loading...</p>
              ) : (
                <PiPencilSimple className="h-5 w-5 text-white" />
              )}

              <input {...getInputProps()} />
            </div>
          </>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              "absolute inset-0 z-10 grid cursor-pointer place-content-center"
            )}
          >
            <input {...getInputProps()} />
            <UploadIcon className="mx-auto h-12 w-12" />

            {isUploading ? (
              <Loader variant="spinner" className="justify-center" />
            ) : (
              <Text className="font-medium">Drop or select file</Text>
            )}
          </div>
        )}
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}
