import {
  Input as AntInput,
  InputProps as AntInputProps,
  Form,
  Select,
  SelectProps,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type InputPropsBase<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};

type InputPropsInput<T extends FieldValues> = InputPropsBase<T> & {
  inputType: "input";
} & AntInputProps;

type InputPropsTextarea<T extends FieldValues> = InputPropsBase<T> & {
  inputType: "textarea";
} & TextAreaProps;

type InputPropsSelect<T extends FieldValues> = InputPropsBase<T> & {
  inputType: "select";
} & SelectProps;

type InputProps<T extends FieldValues> =
  | InputPropsInput<T>
  | InputPropsTextarea<T>
  | InputPropsSelect<T>;

export default function Input<T extends FieldValues>({
  inputType,
  label,
  name,
  control,
  ...rest
}: InputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          help={fieldState.error?.message}
          colon={false}
          labelCol={{ span: 24 }}
        >
          {inputType === "input" && (
            <AntInput {...(rest as AntInputProps)} {...field} />
          )}
          {inputType === "textarea" && (
            <AntInput.TextArea
              rows={4}
              {...field}
              {...(rest as TextAreaProps)}
            />
          )}
          {inputType === "select" && (
            <Select {...(rest as SelectProps)} {...field} />
          )}
        </Form.Item>
      )}
    />
  );
}