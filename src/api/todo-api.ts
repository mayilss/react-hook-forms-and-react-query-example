import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import baseApi from "../config/api-config";
import { ITodo } from "../models";
import { toast } from "react-toastify";

async function getList(): Promise<ITodo[]> {
  const response = await baseApi.get("/todo/getList");

  return response.data;
}

function useGetList() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getList,
  });
}

async function add(todo: ITodo) {
  const response = await baseApi.post("/todo/add", todo);

  return response.data;
}

function useAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: add,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(res.message);
    },
  });
}

async function remove(id: string) {
  const response = await baseApi.delete(`/todo/remove?id=${id}`);

  return response.data;
}

function useRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(res.message);
    },
  });
}

export default { useGetList, useRemove, useAdd };
