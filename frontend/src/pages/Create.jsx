import React from "react";
import InputField from "../components/InputField";
import { inputs } from "../utils/constants";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    data.genre = data.genre.split(",");

    api
      .post("/movies", data)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert("hata oluştu");
        console.log("hata", err);
      });
  };
  return (
    <div className="bg-yellow-600 flex-1 grid place-items-center p-5 py-8">
      <div className="bg-white max-w-[1000px] p-10 rounded shadow-lg grid grid-cols-1 sm:grid-cols-2  gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8" action="">
          <h1 className="text-4xl font-bold mb-10">Yeni Film Oluştur</h1>
          {inputs.map((props) => (
            <InputField key={props.name} {...props} />
          ))}

          <button className="bg-yellow-600 p-1 rounded-md text-white font-semibold hover:bg-yello-500">
            Oluştur
          </button>
        </form>
        <div className="flex items-center justify-centers">
          <img
            className="rounded-full max-h-[300px]"
            src="/movie-bg.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
