import { useQuery } from "@tanstack/react-query";
import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";
import { API } from "../../api/API";
import DisplayDate from "../shared/DisplayDate";
import { useEffect, useState } from "react";
import ProgressInsights from "../dashboard/ProgressInsights";
import WorkFilter from "./WorkFilter";

const ProgressTable = () => {
  // const [isAscending, setIsAscending] = useState(true);

  // Toggle Sorting: Low to High / High to Low
  // const toggleSorting = () => {
  //   const sorted = [...allData].sort((a, b) =>
  //     isAscending ? a.price - b.price : b.price - a.price
  //   );
  //   setSortedData(sorted);
  //   setIsAscending(!isAscending);
  // };

  const [sortedData, setSortedData] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["works"],
    queryFn: async () => {
      const res = await API.get(`/works`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  const totalWorkHours = sortedData.reduce((sum, item) => {
    return sum + parseFloat(item.workHour);
  }, 0);

  const totalPaymentSettled = sortedData.filter(
    (item) => item.paymentStatus !== "unpaid"
  );
  const totalPaymentPending = sortedData.filter(
    (item) => item.paymentStatus !== "paid"
  );

  if (error) {
    return <NothingToShow />;
  }
  if (isPending) {
    return (
      <Loading bg="https://i.ibb.co.com/jb4bG4d/Employee-Grievances-Management.gif" />
    );
  }

  return (
    <>
      {/* totalWorkDone,
  totalWorkHours,
  totalPaymentSettled,
  totalPaymentPending, */}
      <ProgressInsights
        totalWorkDone={sortedData?.length}
        totalWorkHours={totalWorkHours}
        totalPaymentSettled={totalPaymentSettled.length}
        totalPaymentPending={totalPaymentPending.length}
      />
      <WorkFilter />
      {/* Sorting Buttons */}
      {/* <div className="flex justify-end mb-4">
        <button
          // onClick={toggleSorting}
          aria-label={`Sort by price ${
            isAscending ? "Low to High" : "High to Low"
          }`}
          className=" py-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-black/70 dark:hover:bg-white/70 transition flex justify-center items-center gap-2 font-bold"
        >
          Sort by Price: {isAscending ? "Low to High" : "High to Low"}
        </button>
      </div> */}

      {/* Product Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Sl.
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Name
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Work Name
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Work Type
              </th>

              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Work Time(Hr.)
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Date
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="py-2 px-4 ">{item.name}</td>
                <td className="py-2 px-4">{item.workDetails}</td>
                <td className="py-2 px-4 text-center">{item.work}</td>
                <td className="py-2 px-4 text-center">{item.workHour}</td>
                <td className="py-2 px-4 text-center">
                  <DisplayDate date={item.date} />
                </td>
                <td className="py-2 px-4 text-center flex justify-center">
                  {item.paymentStatus === "paid" ? (
                    <p className="bg-green-50 text-green-500 py-1 px-3 rounded-full">
                      Paid
                    </p>
                  ) : (
                    <p className="bg-red-50 text-red-500 py-1 px-3 rounded-full">
                      Unpaid
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProgressTable;
