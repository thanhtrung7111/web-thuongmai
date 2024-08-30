import { Form, Formik, useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useFetchDistrictMutation,
  useFetchProvinceQuery,
  useFetchWardMutation,
} from "../../redux/query/commonQuery";
import InputFormikForm from "../../components/formikCustomForm/InputFormikForm";
import PasswordFormikForm from "../../components/formikCustomForm/PasswordFormikForm";
import SelectFormikForm from "../../components/formikCustomForm/SelectFormikForm";
import ButtonForm from "../../components/commonForm/ButtonForm";
const RegisterPage = () => {
  const { errorServer } = useSelector((state) => state.exception);
  const {
    data: dataProvince,
    isLoading: isLoadingProvince,
    isError: isErrorProvince,
    isSuccess: isSuccessProvince,
  } = useFetchProvinceQuery(undefined, { skip: errorServer.isError });
  const [
    fetchDistrict,
    {
      data: dataDistrict,
      isLoading: isLoadingDistrict,
      isError: isErrorDistrict,
    },
  ] = useFetchDistrictMutation();
  const [
    fetchWard,
    { data: dataWard, isLoading: isLoadingWard, isError: isErrorWard },
  ] = useFetchWardMutation();
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const { isLoadingUser, errorMessageUser } = useSelector(
    (state) => state.user
  );

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Không để trống username!")
      .matches(/[a-zA-Z0-9]{6,20}/, "Tài khoản không hợp lệ!"),
    password: Yup.string()
      .required("Không để trống mật khẩu!")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Mật khẩu gồm 8 kí tự, có ít nhất 1 số và 1 kí tự in hoa!"
      ),
    confirmPassword: Yup.string()
      .required("Không để trống xác nhận mật khẩu!")
      .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp!"),
    fullName: Yup.string().required("Không để trống họ tên!"),
    // dayOfBirth: Yup.date().required("Không để trống ngày sinh"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Không để trống email!"),
    province: Yup.string().required("Không để trống tỉnh!"),
    // .equals("000", "Bạn cần chọn tỉnh!"),
    city: Yup.string().required("Không để trống huyện/thành phố!"),
    // .equals("000", "Bạn cần chọn thành phố!"),
    ward: Yup.string().required("Không để trống phường/thị xã!"),
    // .equals("000", "Bạn cần chọn thị xã!"),
    // address: Yup.string().required("Không được để trống địa chỉ!"),
    addressDetail: Yup.string().required("Không được để trống địa chỉ!"),
    phone: Yup.string()
      .required("Không được để trống số điện thoại!")
      .matches(/0[0-9]{9}/, "Số điện thoại không đúng định dạng"),
  });

  const handleRegister = (values) => {};

  return (
    <div>
      <div className="xl:container xl:mx-auto mx-5">
        <Formik
          // enableReinitialize={true}
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            dayOfBirth: "",
            email: "",
            province: "",
            city: "",
            ward: "",
            address: "",
            addressDetail: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleRegister(values);
          }}
          // validateOnChange={true}
        >
          {({ setValues, setFieldValue, values, isValid }) => (
            <Form className="bg-white w-[800px] shadow-md py-14 px-10 flex flex-col gap-y-3 text-sm mx-auto">
              <h2 className="font-semibold text-4xl tracking-widest text-second text-center mb-8">
                Đăng kí
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-4 text-gray-dark">
                    <InputFormikForm
                      label={"Họ tên"}
                      important={true}
                      placeholder="Nhập tên người dùng..."
                      name="fullName"
                      // id="username"
                      // value={formik.values.username}
                    ></InputFormikForm>
                    <InputFormikForm
                      label={"Tên đăng nhập"}
                      important={true}
                      placeholder="Nhập tên đăng nhập..."
                      name="username"
                      // id="username"
                      // value={formik.values.username}
                    ></InputFormikForm>
                    <PasswordFormikForm
                      label={"Mật khẩu"}
                      important={true}
                      placeholder="Nhập mật khẩu..."
                      name="password"
                      // id="username"
                      // value={formik.values.username}
                    ></PasswordFormikForm>{" "}
                    <PasswordFormikForm
                      label={"Xác nhận mật khẩu"}
                      important={true}
                      placeholder="Nhập mật khẩu xác nhận..."
                      name="confirmPassword"
                      // id="username"
                      // value={formik.values.username}
                    ></PasswordFormikForm>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 text-gray-dark">
                    <InputFormikForm
                      label={"Email"}
                      important={true}
                      placeholder="Nhập địa chỉ email..."
                      name="email"
                      // id="username"
                      // value={formik.values.username}
                    ></InputFormikForm>
                    <InputFormikForm
                      label={"Số điện thoại"}
                      important={true}
                      placeholder="Nhập số điện thoại..."
                      name="phone"
                      // id="username"
                      // value={formik.values.username}
                    ></InputFormikForm>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 text-gray-dark">
                    <SelectFormikForm
                      label={"Tỉnh"}
                      important={true}
                      placeholder="Chọn tỉnh..."
                      loading={isLoadingProvince}
                      name="province"
                      options={isSuccessProvince ? dataProvince : []}
                      itemKey={"ITEMCODE"}
                      itemValue={"ITEMNAME"}
                      onChange={(i) => {
                        setFieldValue(
                          "address",
                          values.addressDetail +
                            ", " +
                            dataProvince?.find(
                              (item) => item.ITEMCODE == i.ITEMCODE
                            ).ITEMNAME
                        );
                        fetchDistrict(i.ITEMCODE);
                      }}
                    ></SelectFormikForm>

                    <SelectFormikForm
                      label={"Thành phố"}
                      important={true}
                      placeholder="Chọn quận huyện..."
                      loading={isLoadingDistrict}
                      disabled={!dataDistrict?.RETNDATA}
                      name="city"
                      options={
                        dataDistrict?.RETNDATA ? dataDistrict.RETNDATA : []
                      }
                      itemKey={"ITEMCODE"}
                      itemValue={"ITEMNAME"}
                      onChange={(i) => {
                        setFieldValue(
                          "address",
                          values.addressDetail +
                            ", " +
                            dataDistrict?.RETNDATA.find(
                              (item) => item.ITEMCODE == i.ITEMCODE
                            ).ITEMNAME +
                            ", " +
                            dataProvince.find(
                              (item) => item.ITEMCODE == values.province
                            ).ITEMNAME
                        );
                        fetchWard(i.ITEMCODE);
                      }}
                    ></SelectFormikForm>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 text-gray-dark">
                    <SelectFormikForm
                      label={"Chọn thị xã"}
                      important={true}
                      placeholder="Chọn thị xã..."
                      loading={isLoadingWard}
                      name="ward"
                      options={dataWard?.RETNDATA ? dataWard.RETNDATA : []}
                      disabled={!dataWard?.RETNDATA}
                      itemKey={"ITEMCODE"}
                      itemValue={"ITEMNAME"}
                      onChange={(i) => {
                        setFieldValue(
                          "address",
                          values.addressDetail +
                            ", " +
                            dataWard?.RETNDATA.find(
                              (item) => item.ITEMCODE == i.ITEMCODE
                            )?.ITEMNAME +
                            ", " +
                            dataDistrict?.RETNDATA.find(
                              (item) => item.ITEMCODE == values.city
                            )?.ITEMNAME +
                            ", " +
                            dataProvince.find(
                              (item) => item.ITEMCODE == values.province
                            )?.ITEMNAME
                        );
                      }}
                    ></SelectFormikForm>
                    <InputFormikForm
                      label={"Địa chỉ cụ thể"}
                      important={true}
                      placeholder="Nhập địa chỉ...."
                      name="addressDetail"
                      disabled={
                        !dataProvince ||
                        !dataDistrict?.RETNDATA ||
                        !dataWard?.RETNDATA
                      }
                      onChange={(e) => {
                        setFieldValue(
                          "address",
                          e.target.value +
                            ", " +
                            dataWard?.RETNDATA.find(
                              (item) => item.ITEMCODE == values.ward
                            ).ITEMNAME +
                            ", " +
                            dataDistrict?.RETNDATA.find(
                              (item) => item.ITEMCODE == values.city
                            ).ITEMNAME +
                            ", " +
                            dataProvince.find(
                              (item) => item.ITEMCODE == values.province
                            ).ITEMNAME
                        );
                      }}
                    ></InputFormikForm>
                  </div>

                  <div className="flex flex-col gap-y-4 text-gray-dark">
                    <InputFormikForm
                      readOnly
                      label={"Địa chỉ"}
                      important={true}
                      disabled={true}
                      placeholder="Nhập địa chỉ...."
                      name="address"
                      // id="username"
                      // value={formik.values.username}
                    ></InputFormikForm>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4"></div>
              </div>
              <div className="text-gray-dark flex gap-x-1 text-xs">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  className="accent-first disabled:cursor-not-allowed"
                  disabled={!isValid}
                  onChange={() => setAgree(!agree)}
                />
                <label htmlFor="agree">Tôi đồng ý với các điều khoản</label>
              </div>

              <ButtonForm
                loading={isLoadingUser}
                label={"Đăng nhập"}
                type="submit"
                disabled={!agree || !isValid}
              ></ButtonForm>

              <div className="text-xs text-gray-dark justify-center flex gap-x-1">
                <span>Đã có tài khoản?</span>
                <NavLink to={"/login"} className="text-second">
                  Đăng nhập
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
