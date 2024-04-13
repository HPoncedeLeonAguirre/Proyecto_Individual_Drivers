import { useLocation, Routes, Route } from "react-router-dom";
import Home from './Views/Home/Home';
import Landing from "./Views/Landing/Landing";
import Create from "./Views/Create/Create";
import Detail from "./Views/Detail/Detail";
import Navbar from "./Components/Navbar/Navbar";
import './App.css';

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="app">
      {pathname !== "/" && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/form" element={<Create />}/>
      </Routes>
    </div>
  );
};

export default App;
