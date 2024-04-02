import { Col, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

const SwitchCase = ({
  normal = true,
  label,
  isValid,
  name,
  checked,
  onChange,
  className,
  control,
  checkBox = false,
  defaultChecked,
}) => {
  return (
    <>
      <Col className=" d-flex align-items-end">
        <Form.Check
          defaultChecked={defaultChecked}
          isValid={isValid}
          className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
          color="#00000"
          width={400}
          id={name}
          type="switch"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={name} className="px-2">
          {label}
        </label>
      </Col>
    </>
  );
};

export default SwitchCase;

// export const SwitchCase2 = ({
//   normal = true,
//   label,
//   name,
//   checked,
//   onChecked,
//   className,
//   control,
//   radioType = false,
// }) => {
//   return (
//     <>
//       {radioType ? (
//         <Col className=" d-flex align-items-end">
//           <label className="">{label} </label>
//         </Col>
//       ) : (
//         )}
//     </>
//   );
// };

// <Controller
//   name={name}
//   control={control}
//   render={({ field }) => (
//     <>
//       <Col className=" d-flex align-items-end">
//         <Form.Check
//           className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
//           color="#00000"
//           width={400}
//           {...field}
//           id={name}
//           type="checkbox"
//           checked={field.value}
//           onChange={(e) => field.onChange(e.target.checked)} // custom onChange handler
//         />
//         <label htmlFor={name} className="px-2">
//           {label}
//         </label>
//       </Col>
//     </>
//   )}
// />
