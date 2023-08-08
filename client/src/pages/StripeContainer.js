import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51NcZlvDwljHNKXVAvRAFARlQXHvJRT9WutJD52ikaAkSHZ9vLqab7XF43SacfXBqLraC5UYqA9FX6endsNJQER1p00MQzZRJRN"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}        
