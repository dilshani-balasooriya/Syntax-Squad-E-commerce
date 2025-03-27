import { storage } from "../../../../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const UploadImages = ({
  onUploadComplete,
  onImageRemove,
  setLoader,
  carInfo,
  mode,
  existingImages = [],
  uploadedImages = [],
}) => {
  const [selectedFileList, setSelectedFileList] = useState([]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setSelectedFileList((prev) => [...prev, ...fileArray]);
  };

  useEffect(() => {
    if (selectedFileList.length > 0) {
      UploadImageToServer();
    }
  }, [selectedFileList]);

  const UploadImageToServer = async () => {
    setLoader(true);
    try {
      const uploadedUrls = await Promise.all(
        selectedFileList.map(async (file) => {
          const fileName = `${Date.now()}_${file.name}`;
          const storageRef = ref(storage, `car-marketplace/${fileName}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      onUploadComplete(uploadedUrls);
      // Reset selectedFileList after uploading
      setSelectedFileList([]);
    } catch (error) {
      console.log("Error uploading images:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleImageRemove = (image) => {
    // If it's an existing image, call the parent's remove method
    onImageRemove(image);

    // If it's a local file, remove from selectedFileList
    if (selectedFileList.some((file) => URL.createObjectURL(file) === image)) {
      setSelectedFileList(
        selectedFileList.filter((file) => URL.createObjectURL(file) !== image)
      );
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {/* Existing Images */}
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => handleImageRemove(image)}
            />
            <img
              src={image}
              className="w-full h-[130px] object-cover rounded-xl"
              alt={`Existing car image ${index + 1}`}
            />
          </div>
        ))}

        {/* Recently Uploaded Images */}
        {uploadedImages.map((image, index) => (
          <div key={`uploaded-${index}`} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => handleImageRemove(image)}
            />
            <img
              src={image}
              className="w-full h-[130px] object-cover rounded-xl"
              alt={`Uploaded car image ${index + 1}`}
            />
          </div>
        ))}

        {/* Local Selected Files */}
        {selectedFileList.map((file, index) => (
          <div key={`local-${index}`} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => handleImageRemove(URL.createObjectURL(file))}
            />
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt={`Selected image ${index + 1}`}
            />
          </div>
        ))}

        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple
          id="upload-images"
          className="hidden"
          onChange={onFileSelected}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default UploadImages;
