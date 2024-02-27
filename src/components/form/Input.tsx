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

export default function Input<T extends FieldValues>({
  type,
  label,
  name,
  control,
  ...rest
}: InputProps<T>) {
  return (
    <Space direction="vertical">
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
              <Select {...(rest as SelectProps)} {...field} />
            )}
          </Form.Item>
        )}
      />
    </Space>
  );
}
