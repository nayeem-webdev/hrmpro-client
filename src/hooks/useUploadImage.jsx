import { useState } from "react";
import axios from "axios";

const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const uploadImage = async (file) => {
    if (!file) {
      setError("No file provided.");
      return;
    }

    const imageHostApi = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_HOST_KEY
    }`;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setError(null);

    try {
      const response = await axios.post(imageHostApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const photoURL = response.data.data.display_url;
      setUploadedImageUrl(photoURL);
      setUploading(false);
      return photoURL; // Return URL if needed
    } catch (err) {
      setError("Image upload failed. Please try again.");
      setUploading(false);
      console.error("Upload Error:", err);
      return null;
    }
  };

  return {
    uploading,
    error,
    uploadedImageUrl,
    uploadImage,
  };
};

export default useUploadImage;
