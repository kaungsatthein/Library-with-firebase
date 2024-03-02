import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { isDark } = useTheme()
  const { setPostData, data: book } = useFetch(
    "http://localhost:3001/books",
    "POST"
  );
  const navigate = useNavigate();
  const addCategory = (e) => {
    e.preventDefault();
    if (!newCategory || categories.includes(newCategory)) {
      setNewCategory("");
      return;
    }
    setCategories([newCategory, ...categories]);
    setNewCategory("");
  };
  const addBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      categories,
    };
    setPostData(data);
  };
  useEffect(() => {
    if (book) {
      navigate("/");
    }
  }, [book]);
  return (
    <div className=" h-screen">
      <form className="w-full max-w-lg mx-auto mt-4" onSubmit={addBook}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
            >
              BOOK TITLE
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Book Title"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
            >
              BOOK DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Book Description"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
            >
              BOOK CATEGORIES
            </label>
            <div className=" flex items-center space-x-2 justify-center">
              <input
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Book Category"
              />
              <button
                className=" bg-primary text-white p-3 rounded-lg mb-3"
                onClick={addCategory}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <div className=" space-x-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className=" text-white rounded-full px-2 py-1 text-sm bg-primary"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className=" text-white bg-primary px-4 py-2 rounded-lg flex justify-center items-center gap-1 w-full">
          <span className=" hidden md:block text-center text-lg">
            Create Book
          </span>
        </button>
      </form>
    </div>
  );
}
