import { UseFormReturn } from "react-hook-form";
import { ITodo } from "../models";
import React from "react";

function useSetTodoToForm(
  data: ITodo | undefined,
  methods: UseFormReturn<ITodo>
) {
  React.useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);
}

export default { useSetTodoToForm };
