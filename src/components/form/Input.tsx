import {
  Input as AntInput,
  Form,
  Select,
  Space,
  InputProps as AntInputProps,
  SelectProps,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

// type InputType = "input" | "textarea" | "select";

// type InputProps<A, T extends FieldValues = FieldValues> = A & {
//   control: Control<T>;
//   name: FieldPath<T>;
//   label: string;
//   type?: InputType;
//   options?: { label: string; value: string }[];
// };

type InputPropsBase<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};

type InputPropsInput<T extends FieldValues> = InputPropsBase<T> & {
  type: "input";
} & AntInputProps;

type InputPropsTextarea<T extends FieldValues> = InputPropsBase<T> & {
  type: "textarea";
} & TextAreaProps;

type InputPropsSelect<T extends FieldValues> = InputPropsBase<T> & {
  type: "select";
  options: { label: string; value: string }[];
} & SelectProps;

type InputProps<T extends FieldValues> =
  | InputPropsInput<T>
  | InputPropsTextarea<T>
  | InputPropsSelect<T>;

export default function Input<T extends FieldValues>(props: InputProps<T>) {
  const { type = "input", label, name, control, ...rest } = props;
  return (
    <Space direction="vertical">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <Form.Item label={label} help={fieldState.error?.message}>
            {type === "input" && (
              <AntInput {...(rest as AntInputProps)} {...field} />
            )}
            {type === "textarea" && (
              <AntInput.TextArea
                rows={4}
                {...field}
                {...(rest as TextAreaProps)}
              />
            )}
            {type === "select" && (
              <Select {...field} {...(rest as SelectProps)} />
            )}
          </Form.Item>
        )}
      />
    </Space>
  );
}
