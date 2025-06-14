import { useEffect, useRef, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import { Button, Input, Loader } from "rizzui";
import { BsFile, BsUpload, BsX } from "react-icons/bs";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  formik,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    setUploadError(null);
    // Clear the image field in formik
    if (formik) {
      formik.setFieldValue("image", "");
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      setUploadError(null);

      // OPTION 1: Upload via your backend
      const data = new FormData();
      data.append("my_file", imageFile);

      console.log("Uploading file:", imageFile.name);

      const response = await axios.post(
        `${BASE_URL}/api/products/upload-image`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Add a longer timeout for larger files
          timeout: 30000,
        }
      );

      if (response?.data?.success) {
        const cloudinaryUrl = response.data.result.url;
        console.log("Upload successful:", cloudinaryUrl);
        setUploadedImageUrl(cloudinaryUrl);

        // Update the formik field with the Cloudinary URL
        if (formik) {
          formik.setFieldValue("image", cloudinaryUrl);
        }
      } else {
        console.error("Upload failed:", response?.data?.message);
        setUploadError(response?.data?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(
        error.response?.data?.error || error.message || "Upload failed"
      );
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          accept="image/*"
        />
        {!(imageFile || formik?.values?.image || uploadedImageUrl) ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <BsUpload className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </label>
        ) : imageLoadingState ? (
          <div className="flex flex-col items-center justify-center h-32">
            <Loader className="h-10 bg-gray-100" />
            <span className="mt-2">Uploading image...</span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center">
              {formik?.values?.image || uploadedImageUrl ? (
                <img
                  src={formik?.values?.image || uploadedImageUrl}
                  alt="Uploaded preview"
                  className="w-12 h-12 object-cover rounded mr-2"
                />
              ) : (
                <BsFile className="w-8 text-primary mr-2 h-8" />
              )}
            </div>
            <p className="text-sm font-medium">
              {imageFile?.name || "Previously uploaded image"}
            </p>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <BsX className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
      {uploadError && (
        <div className="mt-2 text-sm text-red-600">Error: {uploadError}</div>
      )}
      {uploadedImageUrl && !uploadError && (
        <div className="mt-2 text-sm text-green-600">
          Image uploaded successfully!
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;