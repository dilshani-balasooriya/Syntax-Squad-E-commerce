import React, { useEffect, useState } from "react";

const ImageGallery = ({ carDetail }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (carDetail?.imageUrl && carDetail.imageUrl.length > 0) {
      setSelectedImage(0);
    }
  }, [carDetail?.imageUrl]);

  return (
    <div>
      <img
        src={carDetail?.imageUrl[selectedImage]}
        className="w-full h-[500px] object-cover rounded-xl"
      />
      <div className="flex gap-2 mb-6 overflow-x-auto py-2">
        {carDetail?.imageUrl?.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className="cursor-pointer flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border border-gray-400"
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
