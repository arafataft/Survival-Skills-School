import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <>
            <CssBaseline/>
            <Outlet></Outlet>
            <Footer/>
        </>
    );
};

export default Main;