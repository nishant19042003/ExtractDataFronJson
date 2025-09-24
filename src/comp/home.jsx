import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { giveTime } from '../Methods/GiveTime';
function Home() {
    const [Date, setDate] = useState(null);
    const [time, settime] = useState("1day");
    const navitems = [
        { name: "Home", href: "/home" },
        { name: "Categories", href: "/categories" },
        { name: "Analysis", href: "/analysis" },
    ];
    const handleTimeChange=async(value)=>{
      settime(value);
      const val= await giveTime(time);
      setDate(val);
    }
  return (
    <div className='min-h-screen flex flex-col  items-center bg-gray-100 '>
      <h1 className="text-3xl font-bold mb-6 bg-gray-200 p-4 rounded">Welcome to the Home Page</h1>
      <nav>
        <ul className="flex space-x-4">
          {navitems.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="text-blue-500 hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6">
        <label htmlFor="time" className="mr-2 font-medium">Select Time Range:</label>
        <select id="time" onChange={(e) => handleTimeChange(e.target.value)} className="border rounded p-2">
          <option value="1day">Last 1 Day</option>
          <option value="1week">Last 1 Week</option>
          <option value="1month">Last 1 Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last 1 Year</option>
        </select>
      </div>
      {Date && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <p className="text-gray-700">Selected Date: {Date.toString()}</p>
        </div>
      )}  
    </div>
  );
}

export default Home;


