import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  const _uri = userId ? `/api/users/${userId}` : null;
  const { data, error, isLoading, mutate } = useSwr(_uri, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
