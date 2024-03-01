import {
  Input as AntInput,
  InputProps as AntInputProps,
  Form,
  Select,
  SelectProps,
  Typography,
} from "antd";
import { TextAreaProps } from "antd/es/input";
import React from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

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
  const inputComponent = React.useMemo(
    () => ({
      input: (field: ControllerRenderProps<T>) => (
        <AntInput {...(rest as AntInputProps)} {...field} />
      ),
      textarea: (field: ControllerRenderProps<T>) => (
        <AntInput.TextArea rows={4} {...field} {...(rest as TextAreaProps)} />
      ),
      select: (field: ControllerRenderProps<T>) => (
        <Select {...(rest as SelectProps)} {...field} />
      ),
    }),
    [rest]
  );

  const renderInput = inputComponent[inputType];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          help={
            <Typography.Text className="error-message">
              {fieldState.error?.message}
            </Typography.Text>
          }
          colon={false}
          labelCol={{ span: 24 }}
        >
          {renderInput(field)}
        </Form.Item>
      )}
    />
  );
}
