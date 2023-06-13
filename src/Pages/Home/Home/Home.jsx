import { Banner } from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstrutors";

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularClasses/>
            <PopularInstructors/>
            <Gallery/>
        </div>
    );
};

export default Home;