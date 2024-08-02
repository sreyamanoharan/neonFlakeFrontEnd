import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoView = () => {
  const [selectedVideo ,setSelectedVideo] = useState("")
  const {id} = useParams()
  console.log(id);
  useEffect(()=>{
    
    axios.get(`http://localhost:4000/getVideo/${id}`).then((res)=>{
console.log(res.data[0].video);
setSelectedVideo(res.data[0].video)            
    },)
  },[])
  return (
    <div>
      <video className="h-full w-full rounded-lg" controls>
        <source
          src={selectedVideo}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoView;
