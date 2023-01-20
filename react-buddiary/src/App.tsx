import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Header2 from "./components/Header2";

function App() {  
  return (
    <>
        <Header2 />
        <Outlet />
    </>
  );
}

export default App;
