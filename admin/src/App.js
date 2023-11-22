import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import Home from "./components/screen/Home";
import CreatePost from "./components/screen/CreatePost";
import UpdatePost from "./components/screen/UpdatePost";
import NotFound from "./components/screen/NotFound";
import Navbar from "./components/navigation/Navbar";
import SearchForm from "./components/screen/SearchForm";

export default function App() {
  const [closeNav, setCloseNav] = useState(false);

  const toggleNav = () => {
    setCloseNav(!closeNav);
  };
  const getNavWidth = () => (closeNav ? "w-16" : "w-56");
  return (
    <div className="flex">
      {/*nav section*/}
      <div
        className={`${getNavWidth()} + "min-h-screen  transition-width border border-r`}
      >
        <Navbar closed={closeNav} />
      </div>
      {/*content section*/}
      <div className="flex-1 min-h-screen bg-blue-100">
        <div className="sticky top-0">
          <div className="flex items-centers p-2 space-x-2">
            <button onClick={toggleNav}>
              {closeNav ? (
                <AiOutlineMenuFold size={25} />
              ) : (
                <AiOutlineMenuUnfold size={25} />
              )}
            </button>
            <SearchForm />
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:slug" element={<UpdatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
