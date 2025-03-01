import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useState } from "react";
import { API } from "../../api/API";
import { toast } from "react-toastify";

const CheckoutForm = ({ clientSecret, refetch, onClose, paymentData }) => {
  const [trxId, setTrxId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not properly loaded.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage("Card details are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      console.log("Payment Method:", paymentMethod);

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: paymentData.email || "anonymous@example.com",
              name: paymentData.name || "Anonymous User",
            },
          },
        });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          setTrxId(paymentIntent.id);
          const cardElement = elements.getElement(CardElement);
          if (cardElement) {
            cardElement.clear();
            console.log("Card cleared");
          } else {
            console.log("CardElement is unavailable to clear.");
          }

          console.log("Payment Succeeded:", paymentIntent.id);
          API.patch("/update-status", {
            ids: paymentData.workIds,
            paymentApprovedStatus: "approved",
          })
            .then((res) => {
              console.log("API Response: ", res.data);
              const updates = {
                trxId: paymentIntent.id,
                isApproved: true,
              };
              API.patch(`/update-salary/${paymentData._id}`, updates)
                .then((res) => {
                  console.log("API Response: ", res.data);
                  toast.success("Payment Successful!");
                  setTimeout(() => {
                    onClose();
                    refetch();
                  }, 4000);
                })
                .catch((err) => {
                  console.log("Error in API patch:", err.message);
                  toast.error("Payment Failed!");
                  onClose();
                });
            })
            .catch((err) => {
              console.log("Error in API patch:", err.message);
              toast.error("Payment Failed!");
              onClose();
            });
        } else {
          setErrorMessage("Payment Failed.");
          console.log("Payment Status:", paymentIntent.status);
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Unexpected Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Card Details:</label>
        <div className="p-2 border rounded-lg">
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
        </div>
      </div>

      {errorMessage && (
        <div className="error-message text-red-500">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-primary text-white w-full py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {trxId && (
        <div className="text-green-600 mt-4">
          Payment Successful! trxID: {trxId}
        </div>
      )}
    </form>
  );
};

CheckoutForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  refetch: PropTypes.func,
  onClose: PropTypes.func,
  paymentData: PropTypes.object.isRequired,
};

export default CheckoutForm;
