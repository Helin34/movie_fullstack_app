import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get(`/movies/${id}`).then((res) => res.data),
  });
  const r = +data?.rating;
  const color = r > 9 ? "blue" : r > 7.5 ? "green" : r > 5 ? "orange" : "red";

  const handleDelete = () => {
    api
      .delete(`/movies/${data.id}`)
      .then((res) => navigate("/"))
      .catch((err) => console.log("hata", err));
  };

  return (
    <div className="p-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <>
            <div>
              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="flex flex-col gap-10 items-center md:flex-row">
                <div className="">
                  <img
                    className="rounded-md"
                    src="https://picsum.photos/250/400"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-10">
                  <h1 className="text-3xl font-semibold">
                    {data.title} <span>({data.year})</span>
                  </h1>
                  <p>
                    <span className="font-semibold me-3">İzleyici Skoru:</span>
                    <span
                      style={{ background: color }}
                      className="p-2 rounded-full text-white font-semibold "
                    >
                      {" "}
                      {data.rating}
                    </span>
                  </p>
                  <div
                    className="flex
                  gap-5"
                  >
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaRegHeart />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaRegBookmark />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaRegStar />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <BiCameraMovie />
                    </button>
                  </div>
                  <div className="flex gap-5">
                    <p className="font-semibold">Kategoriler:</p>
                    <p className="flex gap-3 items-center">
                      {data.genre.map((genre) => (
                        <span className="bg-yellow-600 py-1 px-3 rounded-full text-white">
                          {genre}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Detail;
