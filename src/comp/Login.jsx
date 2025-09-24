import React from 'react'

function Login() {
    // Handle login
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/email/auth";
  };
  

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h1 className='text-3xl font-bold mb-6 text-indigo-600'>Welcome to Receet</h1>
        <button onClick={handleLogin} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition'>
            Login with Google
        </button>
    </div>
  )
}

export default Login
