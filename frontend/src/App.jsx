import React from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";
import Boards from "./components/Boards";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="boards" element={<Boards />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
