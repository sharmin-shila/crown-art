import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./CheckoutForm.css";

const CheckoutForm = ({ bookingInfo }) => {
  const { _id, bookingItemId, name, price, image, description } =
    bookingInfo || {};

  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
    }

    setProcessing(false);

    if (paymentIntent?.status === "succeeded") {
      const transactionId = paymentIntent?.id;
      toast.success(
        `Transaction complete with TransactionId: ${transactionId}`
      );

      const payment = {
        email: user?.email,
        transactionId,
        price,
        date: new Date(),
        bookedItemId: _id,
        bookingItemId: bookingItemId,
        courseName: name,
        image,
        description,
      };

      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          navigate("/dashboard/enrolled-courses");
        }
      });
    }
  };

  return (
    <div className="w-full px-6">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-success text-white"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
