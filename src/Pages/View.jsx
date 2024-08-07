import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const View = () => {
  const [tumbnails, setTumbnail] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("https://neonfakebackend.onrender.com/gettingTumbnail").then((res) => {
      setTumbnail(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const handleNavigate = (id) => {
    navigate(`/VideoView/${id}`);
  };
  return (
    <>   
    <div className="grid grid-cols-3 p-3">

      {tumbnails.map((res, index) => (
        <div key={index} className="relative p-4 flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
          <div className="relative cursor-pointer h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40" onClick={()=>handleNavigate(res?._id)}>
            <img className="cursor-pointer" src={res?.thumbnail} alt="card-image" />
          </div>
          <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {res?.title}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {res?.description}
            </p>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default View;
