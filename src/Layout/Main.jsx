import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import DarkModeProvider from "../Providers/DarkModeProvider";

const Main = () => {
    return (
        <>
           <DarkModeProvider>
           <CssBaseline/>
            <NavBar/>
            <Outlet></Outlet>
            <Footer/>
           </DarkModeProvider>
        </>
    );
};

export default Main;