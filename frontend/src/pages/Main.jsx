import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import api from "../utils/api";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Card from "../components/Card";

const Main = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies").then((res) => res.data),
  });

  return (
    <div>
      <Hero />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="p-4 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((movie, key) => (
            <Card movie={movie} key={key} index={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
