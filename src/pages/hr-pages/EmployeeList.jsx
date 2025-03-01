import NothingToShow from "../../components/shared/NothingToShow";
import Loading from "../../components/shared/Loading";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";
import DashboardTable from "../../components/dashboard/DashboardTable";

const EmployeeList = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get(`/users?userRole=employee`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

  const columns = [
    { Header: "Name", accessor: "displayName" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Salary",
      accessor: (row) => row.details?.salary || "N/A",
    },
    {
      Header: "Account No",
      accessor: (row) => row.details?.bankAccount || "N/A",
    },
    { Header: "Status", accessor: "isVerified" },
  ];

  if (error) {
    return <NothingToShow />;
  }
  if (isLoading) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800  mb-6 tracking-wide">
        Employee List
      </h1>

      <DashboardTable columns={columns} data={data} refetch={refetch} />
    </>
  );
};

export default EmployeeList;
