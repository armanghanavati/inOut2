import { Col, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

const SwitchCase = ({
  normal = true,
  label,
  name,
  checked,
  onChecked,
  className,
  control,
  checkBox = false,
}) => {

    return (
    <>
      {checkBox ? (
        <Col className=" d-flex align-items-center">
          <label className="ms-3">{label} </label>
          <Form.Check
            type="switch"
            aria-label="radio 1"
            checked={checked}
            onChange={onChecked}
          />
        </Col>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Col className=" d-flex align-items-end">
                <Form.Check
                  className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
                  color="#00000"
                  width={400}
                  {...field}
                  id={name}
                  type="switch"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)} // custom onChange handler
                />
                <label htmlFor={name} className="px-2">
                  {label}
                </label>
              </Col>
            </>
          )}
        />
      )}
    </>
  );
};

export default SwitchCase;
