import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthApi";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false //para el cambio de pestañas no haga otro request
  });

  return { data, isError, isLoading };
};
