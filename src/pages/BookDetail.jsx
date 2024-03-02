import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BookImg from "../assets/book.png";
import useTheme from "../hooks/useTheme";

export default function BookDetail() {
  const { id } = useParams();
  const { isDark } = useTheme();
  const {
    data: book,
    loading,
    error,
  } = useFetch(`http://localhost:3001/books/${id}`);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading...</p>}
      {!!book && (
        <div className=" grid grid-cols-2 h-screen">
          <div>
            <img src={BookImg} className=" w-[80%]" />
          </div>
          <div className=" space-y-4">
            <h1 className={` text-3xl ${isDark ? 'text-white' : ''}`}>{book.title}</h1>
            <div className=" space-x-2">
              {book.categories.map((category) => (
                <span
                  key={category}
                  className=" text-white rounded-full px-2 py-1 text-sm bg-blue-500"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className={isDark ? 'text-white' : ''}>{book.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
