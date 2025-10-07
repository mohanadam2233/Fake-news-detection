// src/components/Header.jsx
import React from 'react';


const Header = () => (
  <header className="bg-gradient-to-r from-green-500 to-teal-400 p-6 shadow-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          <span className="text-gray-100 text-4xl md:text-5xl mr-1">Fake</span>
          <span className="text-white">News Sentinel</span></h1>
      </div>
    </div>
  </header>
);

export default Header;
