import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const View = () => {
  const [tumbnails, setTumbnail] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    console.log("hiii");
    axios.get("http://localhost:4000/gettingTumbnail").then((res) => {
      setTumbnail(res.data);
      console.log(res.d);
    });
  }, []);

  const handleNavigate = (id) => {
    navigate(`/VideoView/${id}`);
  };
  return (
    <>   
      {tumbnails.map((res, index) => (
        <div key={index} className="relative p-4 flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
          <div className="relative cursor-pointer h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40" onClick={()=>handleNavigate(res?.id)}>
            <img className="cursor-pointer" src={res?.tumbnail} alt="card-image" />
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
    </>
  );
};

export default View;
