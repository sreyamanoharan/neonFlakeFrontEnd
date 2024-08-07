import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
          setLoading(true);
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/ds0dvm4ol/video/upload?upload_preset=react-project",
            formData
          );
          if (result.data.secure_url) {
            setLoading(false);
          }
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
    axios
      .post("https://neonfakebackend.onrender.com/inserting", { input })
      .then((res) => {
        console.log(res, "result");
        navigate("/view");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col box-container  bg-green-300 rounded-lg p-6 gap-6">
      <h1 className="text-black font-extrabold">Upload Page</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center "
      >
        <div className="flex justify-between  w-full items-center gap-2 px-20">
          <label className="flex justify-end">Title  :</label>
          <input
            type="text"
            value={title}
            maxLength="50"
            className="h-8 rounded w-80"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between  w-full items-center gap-2 px-20">
          <label className="flex justify-end">Description:</label>
          <textarea
            value={description}
            className="w-80"
            maxLength="200"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex justify-between  w-full items-center gap-2 px-20">
          <label className="flex justify-start w-[300px]">
            Upload Thumbnail:
          </label>
          <input
            type="file"
            className="w-80"
            accept="image/png, image/jpeg"
            required
            onChange={(e) => handleThumbnailUpload(e)}
          />
        </div>
        <div className=" flex justify-between  w-full items-center gap-2 px-20">
          <label className=" flex justify-start w-[300px]">
            Upload Video:
          </label>
          <input
            type="file"
            accept="video/mp4, video/avi, video/mpg"
            onChange={(e) => handleVideoUpload(e)}
            required
          />
        </div>
        {loading && <p>video is uploding...</p>}
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
