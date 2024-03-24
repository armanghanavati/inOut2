import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";

const InputText = ({
  label = "",
  checkedClickToShow = false,
  onChangeClickToShow = () => {},
  clickToShow = false,
  validMsg = "",
  validTrue = false,
  showCharacter,
  validate,
  percent = false,
  editStyle = {},
  deleteStyle = {},
  setDeleteStyle,
  setEditStyle,
  xs = 12,
  md = 12,
  xl = 4,
  rest,
  errors,
  addProps = false,
  errorValidation = false,
  redux = false,
  ltr = false,
  control,
  defaultValue,
  format,
  ref,
  onChange,
  minLength = 1,
  length_num = 50,
  value,
  type = "text",
  name = "",
  pattern = "",
  className = "",
  // id = "",
  validation,
  currency = false,
  disabled = false,
  important = false,
  normal = true,
  dotCount = 11,
  errmsg = "",
  errmsgmin = "",
  errminimum,
}) => {
  const [isDisable, setIsDisable] = useState(false);
  const [isAbsentField, setIsAbsentField] = useState(false);
  const [inputLength, setInputLength] = useState(false);
  const [operationDot, setOperationDot] = useState(dotCount);

  const [isClassStyle, setIsClassStyle] = useState("");
  const [isREQtest, setisREQtest] = useState(false);

  const formatCommas = (num) => {
    return num?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleKeyPress = (event) => {
    if (event.key === ".") {
      setOperationDot(dotCount);
      setInputLength(true);
      console.log("User entered a dot!");
    }
  };

  const handleChange = (e, field) => {
    let inputValue;
    inputValue = e.target.value.replace(/[^\d.0-9]/g, "");
    inputValue = inputValue.replace(/\.{2,}/g, ".");

    let part = inputValue.split(".");
    switch (field.name) {
      case "creditPrice":
      case "itemValueIncreasedTaxPrice":
      case "equivalentWithRial":
      case "article17TaxPrice":
      case "otherTaxPrice":
      case "constructionFee":
      case "sellerProfit":
      case "commission":
      case "otherLegalFundsPrice":
        inputValue = parseFloat(inputValue || "0").toFixed(0);
        break;
      case "name":
      case "lastName":
        inputValue = e.target.value?.replace(/[^a-zA-Zآ-ی]/g, "");
        break;
      case "count":
      case "unitPrice":
        if (
          part[0].length > 18 ||
          (part[1] && part[0].length + part[1].length > 18)
        ) {
          part[0] = part[0].slice(0, 18);
        }

        if (part[1] && part[1].length > 8) {
          part[1] = part[1].slice(0, 8);
        }
        inputValue = part.join(".");
        break;
      case "otherLegalFundsRate":
      case "otherTaxRate":
        let partRate = inputValue.split(".");
        if (
          partRate[0].length > 3 ||
          (partRate[1] && partRate[0].length + partRate[1].length > 3)
        ) {
          partRate[0] = partRate[0].slice(0, 3);
        }
        if (partRate[1] && partRate[1].length > 2) {
          partRate[1] = partRate[1].slice(0, 2);
        }
        inputValue = partRate.join(".");
        break;
      default:
        break;
    }
    if (currency) {
      const dot = inputValue.split(".");
      dot[0] = dot[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputValue = dot.join(".");
      // if (inputValue.startsWith("0") && inputValue.length > 1) {
      //   inputValue = inputValue.slice(1);
      // }
    }
    field.onChange(inputValue);
  };

  return (
    <>
      <>
        {value !== undefined || defaultValue !== undefined ? (
          <>
            <Col className="mt-4" xs={xs} md={md} xl={xl}>
              <Form.Label
                className={`ms-3  ${important && "star"}  align-items-center`}
              >
                {" "}
                {label}{" "}
              </Form.Label>
              <Form.Control
                name={name}
                className={`input - form ${
                  ltr ? " dir-ltr " : ""
                } ${className} ${isClassStyle} `}
                maxLength={length_num}
                defaultValue={defaultValue}
                value={currency ? formatCommas(value) : value}
                disabled={isDisable || disabled}
                onChange={onChange}
                onInput={(e) => {
                  type === "number" &&
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""));
                }}
              />
            </Col>
          </>
        ) : (
          <Col className="mt-4" xs={xs} md={md} xl={xl}>
            <Controller
              name={name}
              control={control}
              rules={{
                validate,
                required: { value: isREQtest || validTrue, message: errmsg },
                minLength: { message: errmsgmin, value: errminimum },
                ...validation,
              }}
              render={({ field }) => (
                <>
                  <Row>
                    <Col
                      className={`${
                        isAbsentField && "d-none"
                      } positionRelative`}
                    >
                      <Form.Label
                        className={`ms-3 text-end  ${
                          important && "star"
                        }  align-items-center`}
                      >
                        {label}
                      </Form.Label>
                      <span className="">
                        <Form.Control
                          errmsgmin={errmsgmin}
                          errminimum={errminimum}
                          errmsg={errmsg}
                          minLength={minLength}
                          type={type === "password" ? "password" : "text"}
                          value={field.value}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                          maxLength={
                            !!inputLength
                              ? operationDot + length_num
                              : length_num
                          }
                          disabled={isDisable || disabled}
                          {...rest}
                          onKeyDown={handleKeyPress}
                          onChange={(e) =>
                            currency ||
                            type === "number" ||
                            type === "character"
                              ? handleChange(e, field)
                              : field.onChange(e)
                          }
                          onInput={(e) => {
                            type === "number" &&
                              !currency &&
                              (e.target.value = e.target.value.replace(
                                /[^\d.]/g,
                                ""
                              ));
                          }}
                          className={`input-form ${
                            ltr ? " dir-ltr " : ""
                          } ${className} ${
                            errors?.[name] && "border border-danger"
                          } `}
                        />
                        {addProps && (
                          <span className="fitShowPass d-flex">
                            <i
                              className={` ms-2 ${
                                deleteStyle
                                  ? " test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill fa-disabled"
                                  : "cursorPointer"
                              }  test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill `}
                              onClick={setDeleteStyle}
                              aria-disabled
                            />
                            <i
                              onClick={setEditStyle}
                              className={` ms-2 ${
                                editStyle
                                  ? " test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill bi bi-plus-circle-fill "
                                  : "bi bi-pencil-square cursorPointer"
                              } test-white d-flex  align-items-center justify-content-start font20 fw-bold cursorPointer  rounded-pill`}
                            />
                          </span>
                        )}
                        {percent && (
                          <span className="fitShowPass d-flex">%</span>
                        )}
                        {clickToShow && (
                          <span className="fitShowPass d-flex">
                            <Form.Check
                              className="cursorPointer"
                              checked={checkedClickToShow}
                              onChange={onChangeClickToShow}
                            />
                          </span>
                        )}
                        {showCharacter && (
                          <>
                            <span className="fitShowPass d-flex">
                              <i
                                className={` ms-2 ${
                                  editStyle
                                    ? " test-white bi bi-eye-fill d-flex align-items-center justify-content-start font20 cursorPointer fw-bold  rounded-pill"
                                    : "cursorPointer"
                                }  test-white d-flex align-items-center justify-content-start font20 fw-bold rounded-pill `}
                                onClick={setEditStyle}
                              />
                            </span>
                          </>
                        )}
                      </span>
                    </Col>
                    {errors?.[name] && (
                      <span className="text-danger font12">
                        {errors?.[name]?.message}
                      </span>
                    )}
                  </Row>
                </>
              )}
            />
          </Col>
        )}
      </>
    </>
  );
};

export default InputText;
