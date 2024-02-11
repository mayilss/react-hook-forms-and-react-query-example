import { useQuery } from "@tanstack/react-query";
import baseApi from "../config/api-config";
import { Todo } from "../models";

async function getTodos(): Promise<Todo[]> {
  const response = await baseApi.get("todos.json");

  return response.data;
}

function useGetTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}

export default { useGetTodos };
