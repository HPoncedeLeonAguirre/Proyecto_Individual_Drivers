import { useLocation, Routes, Route } from "react-router-dom";
import Home from './Views/Home/Home';
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Form";
import Details from "./Views/Details/Details";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="app">
      {pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/form" element={<Form />}/>
      </Routes>
    </div>
  );
};

export default App;
