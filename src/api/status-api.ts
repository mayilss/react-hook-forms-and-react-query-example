import { useQuery } from "@tanstack/react-query";
import baseApi from "../config/api-config";
import { IStatus } from "../models";

async function getList(): Promise<IStatus[]> {
  const response = await baseApi.get("status/getList");

  return response.data;
}

function useGetList() {
  return useQuery({
    queryKey: ["status"],
    queryFn: getList,
  });
}

export default { useGetList };
