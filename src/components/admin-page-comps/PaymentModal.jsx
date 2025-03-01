import { AiOutlineClose } from "react-icons/ai";
import { Elements } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { API } from "../../api/API";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PaymentModal = ({ id, onClose, refetch }) => {
  const [paymentData, setPaymentData] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Payment Data
  useEffect(() => {
    setLoading(true);
    API.get(`/salaries/${id}`)
      .then((res) => {
        setPaymentData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Payment Failed");
        setError(err.message);
        setLoading(false);
        onClose();
      });
  }, [id, onClose]);

  // Create Payment Intent
  useEffect(() => {
    if (paymentData.totalPayment) {
      setLoading(true);
      API.post("/create-payment-intent", {
        price: parseFloat(paymentData.totalPayment),
      })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError("Error processing payment intent.");
          setLoading(false);
        });
    }
  }, [paymentData.totalPayment]);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="p-6">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && paymentData && (
            <>
              <p className="mb-2">
                <strong>Name:</strong> {paymentData.name}
              </p>
              <p className="mb-2">
                <strong>Total Payment:</strong> ${paymentData.totalPayment}
              </p>
              <p className="mb-4">
                <strong>Total Work Hours:</strong> {paymentData.totalWorkHour}
              </p>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Card Details:
                </label>
                <div className="p-2 border rounded-lg">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      clientSecret={clientSecret}
                      refetch={refetch}
                      onClose={onClose}
                      paymentData={paymentData}
                    />
                  </Elements>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

export default PaymentModal;
