import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const Main = () => {
    return (
        <>
            <CssBaseline/>
            <NavBar/>
            <Outlet></Outlet>
            <Footer/>
        </>
    );
};

export default Main;