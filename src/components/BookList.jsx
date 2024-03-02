import React from "react";
import Book from "../assets/book.png";
import useFetch from "../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function BookList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const { isDark } = useTheme();
  const {
    data: books,
    loading,
    error,
  } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ""}`);
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {loading && <p>loading...</p>}
      {!!books && (
        <div className=" grid grid-cols-2 gap-4 md:grid-cols-4 my-2 h-screen">
          {books.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id}>
              <div className={`p-4 border border-1 min-h-[420px] ${isDark ? 'bg-dcard border-primary' : ''}`}>
                <img src={Book} />
                <div className=" text-center space-y-2 mt-2">
                  <h1 className={isDark ? 'text-white' : ''}>{book.title}</h1>
                  <p className={isDark ? 'text-white' : ''}>{book.description}</p>
                  <div className=" flex flex-wrap">
                    {book.categories.map((category) => (
                      <span
                        key={category}
                        className=" mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
