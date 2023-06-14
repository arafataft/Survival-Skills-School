import { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export class Banner extends Component {
    render() {
        return (
            <Carousel showThumbs={false} showStatus={false} style={{ height: "300px", width: "100%" }}>
                <div style={{ position: "relative" }}>
                    <img src="https://source.unsplash.com/800x612/?survive-camp-teens" alt="Image 1" style={{ height: "78vh", width: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "24px", color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))", padding: "10px" }}>Survival Skills School</div>
                </div>
                <div style={{ position: "relative" }}>
                    <img src="https://source.unsplash.com/random/800x600/?survive-camp-teens" alt="Image 1" style={{ height: "78vh", width: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "24px", color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))", padding: "10px" }}>Survival Skills Camp</div>
                </div>
                
            </Carousel>
        );
    }
}
