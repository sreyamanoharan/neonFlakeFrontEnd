import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoView = () => {
  const [selectedVideo ,setSelectedVideo] = useState("")
  const {id} = useParams()
  console.log(id);
  useEffect(()=>{
    
    axios.get(`https://neonfakebackend.onrender.com/getVideo/${id}`).then((res)=>{
console.log(res.data.data)
setSelectedVideo(res.data.data)            
    },)
  },[])
  return (
    <div>
      <video className="h-full w-full rounded-lg" src={selectedVideo} autoPlay controls>
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
