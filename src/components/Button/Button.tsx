import { FC, ReactNode } from "react";
import { Button, ButtonProps } from "react-bootstrap";

interface ICustomButton extends ButtonProps {}
export const CustomButton: FC<ICustomButton> = (props) => {
  return <Button {...props}>{props.children}</Button>;
};
