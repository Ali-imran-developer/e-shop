import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { PiTrashBold } from "react-icons/pi";
import { Text, FieldError } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import UploadIcon from "@shared/components/shape/upload";
import { FileWithPath } from "react-dropzone";
import isEmpty from "lodash/isEmpty";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

interface UploadZoneProps {
  label?: string;
  name: string;
  className?: string;
  error?: string;
  formik?: any;
  setBase64Images?: any;
  editproduct?: any;
  row?: any;
}

interface FileType {
  name: string;
  base64: string;
  size: number;
  url?: string;
}

// export default function UploadZone({
//   label,
//   name,
//   className,
//   setBase64Images,
//   formik,
//   editproduct,
//   error,
//   row,
// }: UploadZoneProps) {
//   const [files, setFiles] = useState<FileType[]>([]);
//   const [isInitialized, setIsInitialized] = useState(false);

//   const rowRef = useRef(row);

//   useEffect(() => {
//     if (!isInitialized || rowRef.current !== row) {
//       rowRef.current = row;
//       if (row?.row?.images && !isInitialized) {
//         const initialImages = Array.isArray(row?.row?.images)
//           ? row?.row?.images
//           : [row?.row?.images];
//         const processedImages = initialImages.map((image: any) => {
//           if (typeof image === "object" && image.url) {
//             return image;
//           }
//           return {
//             url: `https://static.shopilam.com/${image}`,
//           };
//         });
//         setFiles(processedImages);
//         formik?.setFieldValue(name, processedImages);
//         setIsInitialized(true);
//       } else if (!row?.row?.images) {
//         setFiles([]);
//         setIsInitialized(true);
//       }
//     }
//   }, [row, isInitialized]);

//   useEffect(() => {
//     const convertAllImages = async () => {
//       if (Array.isArray(editproduct?.images) && editproduct.images.length > 0) {
//         const conversions = await Promise.all(
//           editproduct.images.map((img: any) => imageUrlToBase64(img.url))
//         );
//         const validConversions = conversions.filter((item) => item !== null);
//         setBase64Images(validConversions as { id: number; url: string }[]);
//       }
//     };
//     convertAllImages();
//   }, [editproduct?.images?.length]);

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const onDrop = useCallback(
//     async (acceptedFiles: FileWithPath[]) => {
//       const newFiles = await Promise.all(
//         acceptedFiles.map(async (file, index) => {
//           const base64 = await fileToBase64(file);
//           return {
//             id: Date.now() + index,
//             url: base64,
//           };
//         })
//       );
//       setFiles((prevFiles: any) => {
//         const safePrev = Array.isArray(prevFiles) ? prevFiles : [];
//         const updatedFiles = [...safePrev, ...newFiles];
//         formik?.setFieldValue(name, updatedFiles);
//         return updatedFiles;
//       });
//       setBase64Images((prev: any[]) => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         const updatedBase64 = [...safePrev, ...newFiles];
//         return updatedBase64;
//       });
//     },
//     [formik, name]
//   );

//   const removeFile = (index: number) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     setFiles(updatedFiles);
//     formik?.setFieldValue(name, updatedFiles);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: true,
//   });

//   return (
//     <div className={cn("grid @container", className)}>
//       {label && <span className="mb-1.5 block font-semibold">{label}</span>}

//       <div
//         {...getRootProps()}
//         className="flex cursor-pointer justify-center items-center gap-4 rounded-md border-[1.8px] px-6 py-5 transition-all duration-300"
//       >
//         <input {...getInputProps()} />
//         <UploadIcon className="h-12 w-12" />
//         <Text className="text-base font-medium">Drop or select images</Text>
//       </div>

//       {!isEmpty(files) && (
//         <div className="mt-5 flex gap-3">
//           {files.map((file, index) => {
//             const imageUrl = file?.url?.startsWith("data:image")
//               ? file.url
//               : file?.url?.startsWith("https://")
//               ? file.url
//               : `https://static.shopilam.com/${file.url}`;
//             return (
//               <div key={index} className="relative rounded-md bg-gray-50">
//                 <div className="max-w-32 max-h-[136px] w-full overflow-hidden rounded ">
//                   <img
//                     src={imageUrl}
//                     alt={file?.name || `Image ${index + 1}`}
//                     className="rounded object-cover w-full h-full"
//                     width={160}
//                     height={130}
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => removeFile(index)}
//                   className="absolute right-0 top-0 rounded-full p-1.5 transition duration-300"
//                 >
//                   <PiTrashBold className="text-red-600" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {error && <FieldError error={error} />}
//     </div>
//   );
// }
