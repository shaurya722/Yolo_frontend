import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = e.target.image.files[0]; // Get the uploaded file

    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bike-detection/",
        formData
      );
      setUploadedImageUrl(`http://127.0.0.1:8000${response.data.image_url}`); // Set the full image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div>
      <h1>Upload Image and View Result</h1>
      <form onSubmit={handleImageUpload}>
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Upload</button>
      </form>

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImageUrl}
            alt="Annotated"
            style={{
              maxWidth: "300px",
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "5px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
