import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Input from "../Input";
import Combobox from "../Combobox";
import DatePicker from "../DatePicker";
const Information = () => {
  const formik = useFormik({
    initialValues: {
      MCUSTNME: "",
    },

    validationSchema: Yup.object().shape({}),
    onSubmit: (value) => {},
  });

  return (
    <div className="h-full">
      <h5 className="text-gray-dark font-medium text-xl mb-4">
        Thông tin tài khoản
      </h5>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} onChange={() => {}}>
          <div className="grid grid-cols-3 gap-3 px-2">
            <div className="flex flex-col gap-y-2">
              {/* //Tài khoản */}
              <Input
                name="MCUSTNME"
                title={"Tên tài khoản:"}
                placeholder="Tên tài khoản"
                value={formik.values.MCUSTNME}
              ></Input>

              {/* Mật khẩu F */}
              <Input
                name="MCUSTNME"
                title={"Mật khẩu:"}
                placeholder="Mật khẩu"
                type="password"
                value={formik.values.MCUSTNME}
              ></Input>
              {/* Email */}
              <Input
                name="MCUSTNME"
                title={"Email:"}
                placeholder="Email"
                value={formik.values.MCUSTNME}
              ></Input>
              {/* Số điện thoại */}
              <Input
                name="MCUSTNME"
                title={"Số điện thoại:"}
                placeholder="Email"
                value={formik.values.MCUSTNME}
              ></Input>

              {/* Ngày đặt hàng */}
              <DatePicker
                name="ODERDATE"
                title="Ngày sinh:"
                value={formik.values.ODERDATE}
              ></DatePicker>
            </div>
            <div className="flex flex-col gap-y-2">
              {/*Tỉnh  */}
              <Combobox
                data={[]}
                itemKey={"ITEMCODE"}
                itemName="ITEMNAME"
                name="DCMNSBCD"
                title="Tỉnh:"
                value={formik.values.DCMNSBCD}
              ></Combobox>
              {/*Thành phố  */}
              <Combobox
                data={[]}
                itemKey={"ITEMCODE"}
                itemName="ITEMNAME"
                name="DCMNSBCD"
                title="Huyện/Thành phố:"
                value={formik.values.DCMNSBCD}
              ></Combobox>
              {/*Phường xã  */}
              <Combobox
                data={[]}
                itemKey={"ITEMCODE"}
                itemName="ITEMNAME"
                name="DCMNSBCD"
                title="Phường/xã:"
                value={formik.values.DCMNSBCD}
              ></Combobox>
              {/*Địa chỉ */}
              <Input
                name="MCUSTNME"
                title={"Địa chỉ:"}
                placeholder="Địa chỉ"
                value={formik.values.MCUSTNME}
              ></Input>
            </div>

            <div></div>
          </div>
          <div className="block ml-auto mt-12 w-fit">
            <button className="text-sm text-white bg-second px-2 py-1 rounded-sm">
              Thay đổi thông tin
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Information;
