import React, { useState } from "react";
import axios from "axios";

const VideoUploader = () => {
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const videoFile = e.target.video.files[0]; // Get the uploaded file

    if (!videoFile) {
      alert("Please select a video to upload.");
      return;
    }

    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bike-video-detection/",
        formData
      );
      setUploadedVideoUrl(`http://127.0.0.1:8000${response.data.video_url}`); // Set the full video URL
      console.log(`http://127.0.0.1:8000${response.data.video_url}`);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
    <div>
      <h1>Upload Video and View Result</h1>
      <form onSubmit={handleVideoUpload}>
        <input type="file" name="video" accept="video/*" required />
        <button type="submit">Upload</button>
      </form>

      {uploadedVideoUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <video
            width="500"
            controls
            style={{
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <source src={uploadedVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
