import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";
import { capitalize } from "../../utils/capitalize";
interface Input {
  register: UseFormRegister<any>;
  name: string;
  value?: string;
  error?: string;
  disabled?: boolean;
}
export const Input: FC<Input> = ({
  register,
  name,
  value = "",
  disabled,
  error,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setTimeout(() => setText(value), 200);
  }, []);

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{capitalize(name)} </Form.Label>
      <Form.Control
        {...register(name)}
        value={text}
        type="text"
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
      />
      <Form.Text>{error}</Form.Text>
    </Form.Group>
  );
};
