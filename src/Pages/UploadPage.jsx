import axios from "axios";
import { useState } from "react";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleThumbnailUpload = async (e) => {
    if (e.target.files) {
      console.log(e);
      const formData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("file", file);
        formData.append("uplode_preset", "react-project");
        try {
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload?upload_preset=react-project",
            formData
          );
          setThumbnail(result.data.secure_url);
          console.log(thumbnail, "hu");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleVideoUpload = async (e) => {
    if (e.target.files) {
      const formData = new FormData();
      // const imageUrl = [];
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("file", file);
        formData.append("uplode_preset", "stadGOimage");
        try {
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/ds0dvm4ol/video/upload?upload_preset=react-project",
            formData
          );
          setVideo(result.data.secure_url);
          console.log(video);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const input = {
    title,
    description,
    thumbnail,
    video,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://neonfakebackend.onrender.com/inserting", { input }).then((res) => {
      console.log(res,"result");
    });
  };

  return (
    <div className="flex flex-col box-container bg-blue-100 rounded-lg p-6 gap-6">
      <h1>Upload Page</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center "
      >
        <div className="flex justify-center items-center gap-2">
          <label className="flex justify-center">Title:</label>
          <input
            type="text"
            value={title}
            maxLength="50"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <label className="flex justify-center">Description:</label>
          <textarea
            value={description}
            maxLength="200"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center     ">
          <label className="flex justify-center w-[300px]">
            Upload Thumbnail:
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={(e) => handleThumbnailUpload(e)}
          />
        </div>
        <div className=" flex items-center    ">
          <label className=" flex justify-center w-[300px]">
            Upload Video:
          </label>
          <input
            type="file"
            accept="video/mp4, video/avi, video/mpg"
            onChange={(e) => handleVideoUpload(e)}
            required
          />
        </div>
        <button
          className="flex  bg-neutral-900 p-2 rounded text-white"
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
