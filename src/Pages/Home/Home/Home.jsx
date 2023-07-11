import { useContext } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import { Banner } from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstrutors";
import { DarkModeContext } from "../../../Providers/DarkModeProvider";
import './Home.css';
import Testimonials from "../Testimonials/Testimonials"; 

const Home = () => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={`home ${darkMode ? 'dark' : ''}`}>
                <Banner />

                <Slide>
                    <PopularClasses />
                </Slide>
                <Slide><PopularInstructors /></Slide>
                <Zoom><Gallery /></Zoom>

                <Testimonials/>

        </div>

    );
};

export default Home;
