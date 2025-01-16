import { useContext } from "react";
import AddWorkForm from "../../components/employee-page-comps/AddWorkForm";
import DashboardTable from "../../components/employee-page-comps/DashboardTable";
import AuthContext from "../../context/AuthContext";
import NothingToShow from "../../components/shared/NothingToShow";
import Loading from "../../components/shared/Loading";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["works", uid],
    queryFn: async () => {
      const res = await API.get(`/works/${uid}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Designation", accessor: "position" },
    { Header: "Role", accessor: "role" },
    { Header: "Salary", accessor: "salary" },
    { Header: "Verified", accessor: "isVerified" },
  ];

  if (error) {
    return <NothingToShow />;
  }
  if (isPending) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800  mb-6 tracking-wide">
        WORK SHEET
      </h1>

      <AddWorkForm />

      <DashboardTable columns={columns} data={data} refetch={refetch} />
    </>
  );
};

export default WorkSheet;
