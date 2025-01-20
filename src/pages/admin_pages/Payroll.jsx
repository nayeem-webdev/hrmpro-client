import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PayrollTable from "../../components/admin-page-comps/PayrollTable";

const Payroll = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { uid } = user;
  console.log(uid);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await API.get(`/salaries`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
    enabled: !!uid,
  });
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800  mb-6 tracking-wide">
        Payroll
      </h1>
      <PayrollTable
        isLoading={isLoading}
        error={error}
        data={data}
        refetch={refetch}
      />
    </>
  );
};

export default Payroll;
