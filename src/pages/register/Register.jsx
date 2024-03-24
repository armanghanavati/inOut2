import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Col, Container, Row } from 'react-bootstrap';
import InputText from '../../components2/InputText';
import Btn from '../../components2/Btn';
import { useForm } from 'react-hook-form';

const Register = () => {

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        getValues,
    } = useForm({ reValidateMode: "onChange" });

    const handleSub = () => {
        console.log("Hello signUp");
    }

    return (
        <>
            <Container fluid className="vh-100 ">
                {/* bg-cover  bg-center flex items-center justify-center bg-zinc-100 h-screen */}
                <Row className="vh-100">
                    {/* <InstallPrompt /> */}
                    <div className="d-flex bg-dark justify-content-center align-items-center">
                        <Col
                            xs="12"
                            sm="9"
                            md="7"
                            lg="6"
                            xl="4"
                            className="bg-white shadow  mx-auto my-auto p-4 rounded-4 "
                        >
                            <form className="justify-content-center bg-white">
                                <div className="bg-white">
                                    <div className="d-flex  justify-content-center">
                                        {/* <Link className="" to="/">
                                    <img
                                        width={100}
                                        height={100}
                                        className="cursorPointer imageLogin"
                                        src={String(logo)}
                                    />
                                </Link> */}
                                    </div>
                                    <InputText
                                        xl={12}
                                        errmsg="لطفا نام کاربری خود را وارد کنید"
                                        label="نام کاربری:"
                                        type="number"
                                        validation={{
                                            required: "لطفا نام کاربری را وارد کنید",
                                            minLength: {
                                                message: "نام کاربری باید بیشتر از 2 حرف باشد",
                                                value: 2,
                                            },
                                        }}
                                        control={control}
                                        name="userName"
                                        errors={errors}
                                        important
                                        className="py-2"
                                        length_num={20}
                                    />
                                    <InputText
                                        xl={12}
                                        errmsg="لطفا کد ملی خود را وارد کنید"
                                        label="کد ملی:"
                                        type="number"
                                        validation={{
                                            required: "لطفا کد ملی را وارد کنید",
                                            minLength: {
                                                message: "کد ملی باید بیشتر از 2 حرف باشد",
                                                value: 2,
                                            },
                                        }}
                                        control={control}
                                        name="userName"
                                        errors={errors}
                                        important
                                        className="py-2"
                                        length_num={20}
                                    />
                                    <InputText
                                        errmsg="لطفا رمز عبور خود را وارد کنید"
                                        // setEditStyle={() => {
                                        //     setShowPass(!showPass);
                                        // }}
                                        showCharacter
                                        errors={errors}
                                        label="رمز عبور:"
                                        xl={12}
                                        important
                                        validation={{
                                            required: "لطفا رمز عبور خود را وارد کنید",
                                            minLength: {
                                                message: "رمز عبور خود باید بیشتر از 8 حرف باشد",
                                                value: 8,
                                            },
                                        }}
                                        name="password"
                                        control={control}
                                        // type={showPass ? "text" : "password"}
                                        className="py-2"
                                    />
                                    <InputText
                                        errmsg="لطفا تکرار رمز عبور خود را وارد کنید"
                                        // setEditStyle={() => {
                                        //     setShowPass(!showPass);
                                        // }}
                                        showCharacter
                                        errors={errors}
                                        label="تکرار رمز عبور:"
                                        xl={12}
                                        important
                                        validation={{
                                            required: "لطفا تکرار رمز عبور خود را وارد کنید",
                                            minLength: {
                                                message: "تکرار رمز عبور خود باید بیشتر از 8 حرف باشد",
                                                value: 8,
                                            },
                                        }}
                                        name="password"
                                        control={control}
                                        // type={showPass ? "text" : "password"}
                                        className="py-2"
                                    />
                                </div>
                                <Col sm="12" md="12" xl="12">
                                    <Btn
                                        xl={12}
                                        title="تایید"
                                        onClick={handleSubmit((data) => handleSub(data))}
                                        loadingName="login"
                                        className="bg-purple mt-4 text-white border-none py-2 rounded-4 w-100 p-2"
                                    />
                                </Col>
                            </form>
                        </Col>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Register;