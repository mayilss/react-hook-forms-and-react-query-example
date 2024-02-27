import { Flex, Tooltip, Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import {
  Link as RouterDomLink,
  LinkProps as RouterDomLinkProps,
} from "react-router-dom";

type HeadingProps = {
  children: React.ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <Flex justify="space-between" align="center">
      {children}
    </Flex>
  );
}

function Title({ children, ...rest }: TitleProps) {
  return <Typography.Title {...rest}>{children}</Typography.Title>;
}

type LinkProps = {
  tooltip: string;
} & RouterDomLinkProps;

function Link({ tooltip, children, ...rest }: LinkProps) {
  return (
    <Tooltip title={tooltip}>
      <RouterDomLink {...rest}>{children}</RouterDomLink>
    </Tooltip>
  );
}

Heading.Title = Title;
Heading.Link = Link;
