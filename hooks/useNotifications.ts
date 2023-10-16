import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  const _uri = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(_uri, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
