import ProgressTable from "../../components/hr-page-comps/ProgressTable";
import { API } from "../../api/API";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProgressInsights from "../../components/dashboard/ProgressInsights";
import WorkFilter from "../../components/hr-page-comps/WorkFilter";

const Progress = () => {
  const [sortedData, setSortedData] = useState([]);

  const { isLoading, error, data } = useQuery({
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

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800  mb-6 tracking-wide">
        Work Progress
      </h1>
      <ProgressInsights
        totalWorkDone={sortedData?.length}
        totalWorkHours={totalWorkHours}
        totalPaymentSettled={totalPaymentSettled.length}
        totalPaymentPending={totalPaymentPending.length}
      />
      <WorkFilter setSortedData={setSortedData} initialData={data || []} />

      {/* Sorting Buttons */}
      <div className="flex justify-end mb-4"></div>
      <ProgressTable isLoading={isLoading} error={error} data={sortedData} />
    </>
  );
};

export default Progress;
