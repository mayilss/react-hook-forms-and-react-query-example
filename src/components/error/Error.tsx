import Typography from "antd/es/typography/Typography";

type ErrorProps = {
  message?: string;
};

export default function Error({ message }: ErrorProps) {
  return <Typography>{message ? message : "Something went wrong."}</Typography>;
}
