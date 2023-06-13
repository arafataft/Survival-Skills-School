import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './checkoutForm.css'
import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CheckoutForm = ({classItem}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setError] = useState('');
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const { axiosSecure } = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const price=parseFloat(classItem.price).toFixed(2);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        setProcessing(true)
        const { paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'anonymous'
                    },
                },
            },
            
        );
        console.log(user);
        if(confirmError){
            setError(confirmError.message)
        }
        console.log('intend' ,paymentIntent);
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                className:classItem.className,
                classItem,
                status:'pending'
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data?.result?.insertedId) {
                        // 
                    }
                })
        }
    };

    return (
        <><form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <Typography variant="body2">{cardError}</Typography>
            <button type="submit" disabled={!stripe || !clientSecret || processing }>
                Pay
            </button>
        </form>
        {transactionId && <Typography variant="body2">Transaction complete with transactionId: {transactionId}</Typography>}
        </>
    );
};

export default CheckoutForm;