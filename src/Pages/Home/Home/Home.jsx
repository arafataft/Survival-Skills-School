import {  Rotate, Slide, Zoom } from "react-awesome-reveal";
import { Banner } from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstrutors";

const Home = () => {
    return (
        <div>
           
            <Banner/>
           
            <Slide>
            <PopularClasses/>
            </Slide>
            
            <Rotate><PopularInstructors/></Rotate>
            <Zoom><Gallery/></Zoom>
            
        </div>
    );
};

export default Home;