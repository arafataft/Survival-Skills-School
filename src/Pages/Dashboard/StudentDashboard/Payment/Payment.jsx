import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const {classItem} = location.state;
    console.log(classItem.price);
    

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm classItem={classItem}/>
            </Elements>
        </div>
    );
};

export default Payment;