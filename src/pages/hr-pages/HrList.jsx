import { useQuery } from "@tanstack/react-query";
import NothingToShow from "../../components/shared/NothingToShow";
import Loading from "../../components/shared/Loading";
import { API } from "../../api/API";
import AllEmployeeTable from "../../components/admin-page-comps/AllEmployeeTable";
import { useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import EmployeeListCard from "../../components/admin-page-comps/EmployeeListCard";

const HrList = () => {
  const [isTableView, setIsTableView] = useState(true);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get(`/users?isVerified=true&userRole=hr_executive`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

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

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsTableView(true)}
          className={`flex items-center gap-2 px-4 py-2 ${
            !isTableView ? "bg-gray-300 text-gray-500" : "bg-primary text-white"
          } rounded-bl-lg rounded-tl-lg hover:bg-primary hover:text-white focus:outline-none transition-all`}
        >
          <FaThList size={20} />
        </button>
        <button
          onClick={() => setIsTableView(false)}
          className={`flex items-center gap-2 px-4 py-2 ${
            isTableView ? "bg-gray-300 text-gray-500" : "bg-primary text-white"
          } rounded-br-lg rounded-tr-lg hover:bg-primary hover:text-white focus:outline-none transition-all`}
        >
          <IoGrid size={20} />
        </button>
      </div>

      {isTableView ? (
        <AllEmployeeTable
          isLoading={isLoading}
          error={error}
          data={data}
          refetch={refetch}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
          {data.map((item) => (
            <EmployeeListCard item={item} key={item._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default HrList;
