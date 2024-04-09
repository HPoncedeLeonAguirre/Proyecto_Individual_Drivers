import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Views/Home/Home';
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Form";
import Details from "./Views/Details/Details";
import Navbar from "./Components/Navbar/Navbar";

function App() {

  return (
    <div>
      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route path="/home" Component={Home}/>
          <Route path="/details:id" Component={Details}/>
          <Route path="/form" Component={Form}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
