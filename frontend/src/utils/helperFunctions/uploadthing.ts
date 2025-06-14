import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";
// import type { OurFileRouter } from "../../../../apps/isomorphic/src/app/api/uploadthing/core";

export const Uploader = generateUploader<any>();
export const UploadButton = generateUploadButton<any>();
export const UploadDropzone = generateUploadDropzone<any>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>();
