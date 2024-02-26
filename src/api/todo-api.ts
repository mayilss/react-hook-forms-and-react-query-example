import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import baseApi from "../config/api-config";
import { Todo } from "../models";
import { toast } from "react-toastify";

async function getTodos(): Promise<Todo[]> {
  const response = await baseApi.get("/todo/getList");

  return response.data;
}

function useGetTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}

async function removeTodo(id: number) {
  const response = await baseApi.delete(`todo/remove?id=${id}`);

  return response.data;
}

function useRemoveTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(res.message);
    },
  });
}

export default { useGetTodos, useRemoveTodo };
