import { Route, Routes } from "react-router-dom";

import Sinopse from "../pages/Sinopse";
import Home from "../pages/Home";

const Router = () => {
  return(
    <Routes>
      <Route path="" element={<Home/>}/> //renderiza tela
      <Route path="filme/:filmeId" element={<Sinopse/>} />
    </Routes>
  )
  
}
export default Router;