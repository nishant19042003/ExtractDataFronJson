import React from 'react'
import { Link } from "react-router-dom";
function Home() {
    const navitems = [
        { name: "Home", href: "/home" },
        { name: "Categories", href: "/categories" },
        { name: "Analysis", href: "/analysis" },
    ];
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
    </div>
  )
}

export default Home;


