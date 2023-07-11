import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Testimonials.css";
import { Slide } from "react-awesome-reveal";
import { styled } from "styled-components";


const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      title: "Survival Instructor",
      quote:
        "I learned so much from Survival Skill School! I'm now confident in my ability to survive in the wilderness.",
    },
    {
      name: "Jane Doe",
      title: "Camp Counselor",
      quote:
        "My kids had so much fun at Survival Skill School! They learned a lot about survival skills and had a great time doing it.",
    },
    {
      name: "Alex Smith",
      title: "Outdoor Enthusiast",
      quote:
        "Survival Skill School exceeded my expectations. The instructors were knowledgeable, and I gained valuable skills for outdoor adventures.",
    },
    {
      name: "Emily Johnson",
      title: "Nature Photographer",
      quote:
        "As a nature photographer, it's important for me to have survival skills. Survival Skill School taught me essential techniques that enhance my fieldwork.",
    },
  ];

  return (
    <div>
      <h1>Testimonials</h1>
      <Container>
        <Carousel>
          {testimonials.map((testimonial, index) => (
            <Slide key={index}>
              <h3>{testimonial.name}</h3>
              <h4>{testimonial.title}</h4>
              <p>{testimonial.quote}</p>
            </Slide>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

const Container = styled.div`
  background-color: #ffc;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #cfc;
  align-items: center;
`;

export default Testimonials;
