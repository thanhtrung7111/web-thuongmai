import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useLoginLCTNMutation,
  useLoginMutation,
} from "../redux/query/authQuery";
import { errorServerOff } from "../redux/reducer/exceptionReducer";
import { Form, Formik } from "formik";
import InputFormikForm from "../components/formikCustomForm/InputFormikForm";
import PasswordFormikForm from "../components/formikCustomForm/PasswordFormikForm";
import * as Yup from "yup";
import ButtonForm from "../components/commonForm/ButtonForm";
import SelectFormikForm from "../components/formikCustomForm/SelectFormikForm";
import PopupProductEvaluate from "../components/commonPopup/PopupProductEvaluate";
import NumberFormikForm from "../components/formikCustomForm/NumberFormikForm";
const Login = () => {
  const navigate = useNavigate();
  const [
    login,
    {
      data: dataLogin,
      isLoading: isLoadingLogin,
      isError: isErrorLogin,
      isSuccess: isSuccessLogin,
      error,
    },
  ] = useLoginMutation();

  const [
    loginLCTN,
    {
      data: dataLctn,
      isLoading: isLoadingLoginLCTN,
      isError: isErrorLoginLCTN,
      isSuccess: isSuccessLoginLCTN,
    },
  ] = useLoginLCTNMutation();
  const [compCode, setCompCode] = useState("");
  const dispath = useDispatch();
  const { locations, tokenUser } = useSelector((state) => state.user);
  const [remember, setRemember] = useState(
    localStorage.getItem("remember")
      ? localStorage.getItem("remember").remember
      : false
  );
  const [compList, setCompList] = useState(null);
  const [lctnList, setLctnList] = useState(null);
  const changeLCTN = (e) => {
    setCompCode(e.target.value);
    console.log(compCode);
  };
  const handleLogin = async (values) => {
    try {
      login({
        APP_CODE: "AER",
        LGGECODE: "V",
        CUSTLGIN: values.username,
        PASSWORD: values.password,
        SYSTCODE: 2,
        SYSTCHAR: "",
        INPTCHAR: "",
        PHONNAME: "",
        TKENDEVC: "",
      }).unwrap;
      dispath(errorServerOff());
      if (values.remember) {
        const dataRemember = {
          remember: true,
          username: values.username,
          password: values.password,
        };
        localStorage.setItem("remember", JSON.stringify(dataRemember));
      } else {
        localStorage.removeItem("remember");
      }
    } catch (error) {}

    dispath(errorServerOff());
    // dispatch(errorServerOff());
    window.scroll(0, 0);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Không để trống tài khoản!"),
    password: Yup.string().required("Không để trống mật khẩu!"),
  });

  const handleSubmitLctn = async (e) => {
    console.log(e);
    await loginLCTN(e);
  };

  useEffect(() => {
    if (isSuccessLogin) {
      setCompList(dataLogin?.RETNDATA?.COMPLIST);
      setLctnList(dataLogin?.RETNDATA?.COMPLIST[0].LCTNLIST);
    }
  }, [isSuccessLogin]);

  useEffect(() => {
    if (isSuccessLoginLCTN) {
      window.scroll(0, 0);
      navigate("/");
    }
  }, [isSuccessLoginLCTN]);

  console.log(compList);
  return (
    <div className="relative">
      <div className="xl:container xl:mx-auto mx-5">
        <div className="bg-white shadow-md py-14 px-10 flex flex-col gap-y-3 w-[450px] text-sm ml-auto">
          <h2 className="font-semibold text-3xl text-second text-center mb-8">
            Đăng nhập
          </h2>
          <div className="w-full h-64 overflow-y-hidden overflow-x-hidden">
            <div
              className={`w-[200%] h-full grid grid-cols-2 ${
                compList ? "translate-x-[-50%]" : "translate-x-0"
              } transition-transform duration-200`}
            >
              <Formik
                key={"formLogin"}
                initialValues={{
                  username: localStorage.getItem("remember")
                    ? JSON.parse(localStorage.getItem("remember"))?.username
                    : "",
                  password: localStorage.getItem("remember")
                    ? JSON.parse(localStorage.getItem("remember"))?.password
                    : "",
                  remember: localStorage.getItem("remember") ? true : false,
                  COMPCODE: "",
                  LCTNCODE: "",
                  // number: 0.0,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  handleLogin(values);
                }}
              >
                {({ setFieldValue, handleChange, values }) => (
                  <Form id="formLogin">
                    <div className="flex flex-col gap-y-4">
                      <div className="flex flex-col gap-y-4">
                        <InputFormikForm
                          name="username"
                          label={"Tài khoản"}
                          disabled={isLoadingLogin}
                          important={true}
                          placeholder="Nhập tài khoản..."
                        ></InputFormikForm>
                      </div>
                      <div className="flex flex-col gap-y-4">
                        <PasswordFormikForm
                          name="password"
                          label={"Mật khẩu"}
                          disabled={isLoadingLogin}
                          important={true}
                          placeholder="Nhập mật khẩu..."
                        ></PasswordFormikForm>
                      </div>
                      <div className="text-gray-dark flex gap-x-1 text-xs">
                        <input
                          disabled={isLoadingLogin}
                          type="checkbox"
                          id="remember"
                          name="remember"
                          checked={values.remember}
                          onChange={(e) =>
                            setFieldValue("remember", e.target.checked)
                          }
                          className="w-4 h-4 disabled:opacity-90 accent-first"
                        />
                        <label htmlFor="remember" className="cursor-pointer">
                          Ghi nhớ
                        </label>
                      </div>
                    </div>
                    <div className="mt-2">
                      {isErrorLogin && (
                        <div className="text-red-600 text-xs">Lỗi hệ thống</div>
                      )}
                      <ButtonForm
                        loading={isLoadingLogin}
                        label={"Đăng nhập"}
                        type="submit"
                      ></ButtonForm>
                    </div>
                  </Form>
                )}
              </Formik>
              <Formik
                key={"formLctn"}
                initialValues={{
                  COMPCODE: "",
                  LCTNCODE: "",
                }}
                onSubmit={(values) => {
                  handleSubmitLctn(values);
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form id="formLctn">
                    <div className="flex flex-col mb-4 gap-y-3 text-gray-dark">
                      <SelectFormikForm
                        itemValue={"COMPNAME"}
                        disabled={isLoadingLoginLCTN}
                        itemKey={"COMPCODE"}
                        label={"Chọn công ty"}
                        name="COMPCODE"
                        important={true}
                        options={compList ? compList : []}
                        onChange={(e) => {
                          console.log(e);
                          setLctnList(e?.LCTNLIST);
                        }}
                      ></SelectFormikForm>
                      <SelectFormikForm
                        itemValue={"LCTNNAME"}
                        disabled={isLoadingLoginLCTN}
                        itemKey={"LCTNCODE"}
                        label={"Chọn chi nhánh"}
                        name="LCTNCODE"
                        important={true}
                        options={lctnList ? lctnList : []}
                      ></SelectFormikForm>
                    </div>
                    <div className="flex gap-x-2">
                      <ButtonForm
                        className="bg-slate-500"
                        onClick={() => setCompList(null)}
                        // loading={isLoadingLogin}
                        label={"Quay về"}
                        icon={<i className="ri-arrow-go-back-line"></i>}
                        type="submit"
                      ></ButtonForm>
                      {/* <input type="submit" value={"SUbmit"} /> */}
                      <ButtonForm
                        loading={isLoadingLoginLCTN}
                        disabled={isLoadingLoginLCTN}
                        label={"Tiếp tục"}
                        type="submit"
                      ></ButtonForm>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="text-xs text-gray-dark justify-center flex gap-x-1">
            <span>Chưa có tài khoản?</span>
            <NavLink to={"/register"} className="text-second">
              Đăng ký
            </NavLink>
          </div>

          <div className="flex items-center gap-x-3 text-gray-dark justify-center">
            <span className="h-[1px] flex-auto border border-gray-100"></span>
            <span>hoặc</span>
            <span className="h-[1px] flex-auto border border-gray-100"></span>
          </div>

          <div className="flex items-center justify-center gap-x-2">
            <svg
              enable-background="new 0 0 32 32"
              height="32px"
              id="Layer_1"
              version="1.0"
              viewBox="0 0 32 32"
              width="32px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  d="M32,30c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h28c1.104,0,2,0.896,2,2V30z"
                  fill="#3B5998"
                />
                <path
                  d="M22,32V20h4l1-5h-5v-2c0-2,1.002-3,3-3h2V5c-1,0-2.24,0-4,0c-3.675,0-6,2.881-6,7v3h-4v5h4v12H22z"
                  fill="#FFFFFF"
                  id="f"
                />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
            <svg
              enable-background="new 0 0 32 32"
              height="32px"
              id="Layer_1"
              version="1.0"
              viewBox="0 0 32 32"
              width="32px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  d="M32,30c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h28c1.104,0,2,0.896,2,2V30z"
                  fill="#55ACEE"
                />
                <path
                  d="M25.987,9.894c-0.736,0.322-1.525,0.537-2.357,0.635c0.85-0.498,1.5-1.289,1.806-2.231   c-0.792,0.461-1.67,0.797-2.605,0.978C22.083,8.491,21.017,8,19.838,8c-2.266,0-4.1,1.807-4.1,4.038   c0,0.314,0.036,0.625,0.104,0.922c-3.407-0.172-6.429-1.779-8.452-4.221c-0.352,0.597-0.556,1.29-0.556,2.032   c0,1.399,0.726,2.635,1.824,3.36c-0.671-0.022-1.304-0.203-1.856-0.506c-0.001,0.017-0.001,0.034-0.001,0.052   c0,1.955,1.414,3.589,3.29,3.96c-0.343,0.09-0.705,0.142-1.081,0.142c-0.264,0-0.52-0.024-0.77-0.072   c0.52,1.604,2.034,2.771,3.828,2.805C10.67,21.594,8.9,22.24,6.979,22.24c-0.33,0-0.658-0.018-0.979-0.056   c1.814,1.145,3.971,1.813,6.287,1.813c7.541,0,11.666-6.154,11.666-11.491c0-0.173-0.005-0.35-0.012-0.521   C24.741,11.414,25.438,10.703,25.987,9.894z"
                  fill="#FFFFFF"
                />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
