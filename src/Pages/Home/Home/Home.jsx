import { Rotate, Slide, Zoom } from "react-awesome-reveal";
import { Banner } from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstrutors";
import { useContext } from "react";
import { DarkModeContext } from "../../../Providers/DarkModeProvider";
import './Home.css'

const Home = () => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={`home ${darkMode ? 'dark' : ''}`}>
                <Banner />

                <Slide>
                    <PopularClasses />
                </Slide>
                <Rotate><PopularInstructors /></Rotate>
                <Zoom><Gallery /></Zoom>

        </div>

    );
};

export default Home;