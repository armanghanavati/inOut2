import { Col, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

const SwitchCase = ({
  normal = true,
  label,
  isValid,
  name,
  checked,
  onChecked,
  onChange,
  className,
  control,
  checkBox = false,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={checked} // Set the default value based on the 'checked' prop
        render={({ field: { onChange, value } }) => (
          <>
            <Col className=" d-flex align-items-end">
              <Form.Check
                isValid={isValid}
                className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
                color="#00000"
                width={400}
                id={name}
                type="switch"
                checked={value} // Use 'value' instead of 'field.value'
                onChange={(e) => onChange(e.target.checked)} // Use 'onChange' directly
              />
              <label htmlFor={name} className="px-2">
                {label}
              </label>
            </Col>
          </>
        )}
      />
    </>
  );
};

export default SwitchCase;
