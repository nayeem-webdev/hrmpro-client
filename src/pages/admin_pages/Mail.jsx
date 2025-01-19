import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";
import MailsTable from "../../components/admin-page-comps/MailsTable";
import Loading from "../../components/shared/Loading";
import NothingToShow from "../../components/shared/NothingToShow";

const Mail = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get(`/mails`);
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
      <Loading bg="https://i.ibb.co.com/Qjw41HP/First-dection-second-image.gif" />
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800  mb-6 tracking-wide">
        Mails
      </h1>

      <MailsTable
        isLoading={isLoading}
        error={error}
        data={data}
        refetch={refetch}
      />
    </>
  );
};

export default Mail;
