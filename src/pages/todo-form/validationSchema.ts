import * as yup from "yup";

export default yup.object({
  title: yup
    .string()
    .required("title is required field.")
    .min(6, "title must be at least 6 characters."),
  statusId: yup.string().required("status is required field."),
});
