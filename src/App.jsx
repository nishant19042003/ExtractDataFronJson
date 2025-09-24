import Categories from "./comp/categories";
import Home from "./comp/home";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./comp/Login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  );
}
  

export default App;
