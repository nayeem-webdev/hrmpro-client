import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";
import PaymentHistoryTable from "../../components/employee-page-comps/PaymentHistoryTable";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get(`/salaries?uid${user.uid}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800  mb-6 tracking-wide">
        Payment History
      </h1>
      <PaymentHistoryTable isLoading={isLoading} error={error} data={data} />
    </>
  );
};

export default PaymentHistory;
