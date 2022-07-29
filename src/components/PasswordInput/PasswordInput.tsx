import { FC, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { capitalize } from "../../utils/capitalize";
import { validPassword } from "../../utils/validation.util";
interface IPasswordInput {
  register: UseFormRegister<any>;

  name: string;
  error?: string;
}
export const PasswordInput: FC<IPasswordInput> = ({
  register,
  name,
  error,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{capitalize(name)} </Form.Label>

      <InputGroup>
        <Form.Control
          {...register(name)}
          required
          value={password}
          type={showPass ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputGroup.Text>
          <Form.Text
            className="eye"
            onClick={() => {}}
            onMouseDown={() => {
              setShowPass(true);
            }}
            onMouseUp={() => {
              setShowPass(false);
            }}
            onTouchStart={() => {
              setShowPass(true);
            }}
            onTouchEnd={() => {
              setShowPass(false);
            }}
          >
            {showPass ? (
              <i className="far fa-eye"></i>
            ) : (
              <i className="far fa-eye-slash"></i>
            )}
          </Form.Text>
        </InputGroup.Text>
      </InputGroup>
      <Form.Text>{error}</Form.Text>
    </Form.Group>
  );
};
