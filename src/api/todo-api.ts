import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseApi from "../config/api-config";
import helpers from "../helpers";
import { ITodo } from "../models";

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: add,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "inactive",
      });
      toast.success(res.message);
      navigate("/");
    },
    onError: helpers.onErrorResponse,
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

async function getById(id: string | undefined): Promise<ITodo> {
  const response = await baseApi.get(`todo/getById?id=${id}`);

  return response.data;
}

function useGetById(id: string | undefined) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => getById(id),
    enabled: Boolean(id),
  });
}

async function update(todo: ITodo) {
  const response = await baseApi.put("todo/update", todo);

  return response.data;
}

function useUpdate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: update,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "inactive",
      });
      toast.success(res.message);
      navigate("/");
    },
    onError: helpers.onErrorResponse,
  });
}

export default { useGetList, useRemove, useAdd, useGetById, useUpdate };
