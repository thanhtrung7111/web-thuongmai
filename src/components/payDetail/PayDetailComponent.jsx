import React, { useEffect, useState } from "react";
import Wrapper from "@components/Wrapper";
import Asus from "@assets/img/asus.jpg";
import ProductSlider from "@components/ProductSlider";
import InfoPage from "@components/InfoPage";
import LoadingView from "@components/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import {
  decreamentAmountProduct,
  increamentAmountProduct,
} from "@redux/actions/cartAction";
import { chooseProduct } from "@redux/reducer/cartReducer";
import { chooseAllProduct } from "@redux/reducer/cartReducer";
import { deleteProductFromCart } from "../../redux/actions/cartAction";
import Combobox from "../Combobox";
import Input from "../Input";
import DatePicker from "../DatePicker";
import moment from "moment";
import TextArea from "../TextArea";
import {
  Form,
  Formik,
  FormikProvider,
  useFormik,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { postOrder } from "../../redux/actions/orderActions";
const PayDetailComponent = () => {
  const dispatch = useDispatch();
  const [chooseAll, setChooseAll] = useState(false);
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const {
    isLoadingCommon,
    products,
    lstWareHouse,
    lstDcmnSbCd,
    lstDlvrMthd,
    lstDlvrType,
    lstListHour,
    lstinpCustOdMtPayMthd2,
    lstTimeType,
  } = useSelector((state) => state.common);
  console.log(productCarts);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      COMPCODE: "PMC", //Công ty
      LCTNCODE: "001", //Chi nhánh
      DCMNSBCD: lstDcmnSbCd?.at(0)?.ITEMCODE, // phân loại
      ODERCODE: "", //Mã đơn hàng
      ODERDATE: moment(new Date()).format("yyyy-MM-DD"), //Ngày đơn hàng
      CUSTCODE: currentUser?.CUSTCODE, //Mã khách hàng
      MCUSTNME: currentUser?.CUSTNAME, //Tên khách hàng
      CUSTADDR: currentUser?.CUSTADDR, //Địa chỉ khách hàng
      CUST_TEL: currentUser?.USER_TEL, //Số điệnt thoại khách hàng
      NOTETEXT: "", //Diễn giải
      SUM_CRAM: 0, //Tổng tiền
      SMPRQTTY: 0, //Tổng số lượng
      RDTNRATE: 0, //%Chiết khấu
      RDTNCRAM: 0, //Tiền chiết khấu
      CSCMRATE: 0, //Huê hồng khách hàng
      TAX_CODE: "", //Mã số thuế
      VAT_RATE: 0, //THuế suất
      VAT_CRAM: 0, //Tiền thuế
      DLVRMTHD: lstDlvrMthd?.at(0)?.ITEMCODE, //Phương thức giao hàng
      DLVRTYPE: lstDlvrType?.at(0)?.ITEMCODE, //PHương thức vận chuyển
      DLVRDATE: moment(new Date()).format("yyyy-MM-DD"), //Ngày giao hàng
      DLVRHOUR: lstListHour?.at(0)?.ITEMCODE, //Giờ giao hàng
      DLVRPLCE: "", //Nơi giao hàng
      DLVRADDR: "", //Địa chỉ giao
      RCVREMPL: "", //Người nhận hàng
      RCVR_TEL: "", //Điện thoại
      PAY_MTHD: lstinpCustOdMtPayMthd2?.at(0)?.ITEMCODE, //Phương thức thanh toán
      PYMNPERD: lstTimeType?.at(0)?.ITEMCODE, //Chu kì thanh toán
      PYMNNUMB: "", //Thời hạn thanh toán
      SRC_DATA: "3", //Window hoặc web
      EMPLCODE: "", //Mã nhân viên
      SUM_AMNT: 0, //Tổng tiền qui đổi
      RDTNAMNT: 0, //Tiền chiết khấu
      VAT_AMNT: 0, //Tiền thuế qui đổi
      DETAIL: [], //Chi tiết
    },
    validationSchema: Yup.object().shape({
      MCUSTNME: Yup.string().required("Không được để trống"),
      CUSTADDR: Yup.string().required("Địa chỉ không được để trống"),
      CUST_TEL: Yup.string().required("Số điện thoại không được để trống"),
      ODERDATE: Yup.string().required("Ngày đặt hàng không để trống"),
      DCMNSBCD: Yup.string().required("Không để trống phân loại"),
      DLVRMTHD: Yup.string().required("Không để trống phân loại"),
    }),
    onSubmit: (value) => {
      const body = { ...value };
      console.log(body);
      dispatch(postOrder({ DCMNCODE: "DDHKH", HEADER: [body] }));
    },
  });

  const handlePlus = (id) => {
    console.log(id);
    dispatch(increamentAmountProduct({ id: id }));
  };

  const handleSubstract = (id) => {
    dispatch(decreamentAmountProduct({ id: id }));
  };

  const handleChangeChoose = (id) => {
    dispatch(chooseProduct({ id: id }));
    const productFind = productCarts.find((item) => item.PRDCCODE == id);
    console.log(productFind);
    if (!productFind.choose) {
      formik.setFieldValue("DETAIL", [...formik.values.DETAIL, productFind]);
    } else {
      formik.setFieldValue(
        "DETAIL",
        formik.values.DETAIL.filter((item) => item.PRDCCODE != id)
      );
    }
  };

  const handleClickAllProduct = () => {
    dispatch(chooseAllProduct(!chooseAll));
    setChooseAll(!chooseAll);
    if (!chooseAll) {
      formik.setFieldValue("DETAIL", productCarts);
    } else {
      formik.setFieldValue("DETAIL", []);
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductFromCart({ id: id }));
  };

  const changeForm = () => {
    formik.setFieldValue(
      "RDTNCRAM",
      formik.values.SUM_CRAM * formik.values.RDTNRATE
    );
    formik.setFieldValue(
      "VAT_CRAM",
      formik.values.VAT_RATE * formik.values.SUM_CRAM
    );

    formik.setFieldValue(
      "SUM_AMNT",
      formik.values.SUM_CRAM - formik.values.VAT_CRAM - formik.values.RDTNCRAM
    );
    formik.setFieldValue("RDTNAMNT", formik.values.RDTNCRAM);
    formik.setFieldValue("VAT_AMNT", formik.values.VAT_CRAM);
  };

  useEffect(() => {
    const detail = productCarts
      .filter((item) => item.choose == true)
      .map((item) => {
        return {
          PRDCCODE: item.PRDCCODE, //Mã sản phẩm
          ORGNCODE: "1", //Nguồn sản phẩm
          SORTCODE: "1", //Phân loại sản phẩm
          QUOMCODE: item.QUOMCODE, //Đơn vị tính
          QUOMQTTY: item.quantity, //Số lượng
          CRSLPRCE: item.PRCEDSCN, //Đơn giá theo tiền tệ
          MNEYCRAM: item.PRCEDSCN * item.quantity, //Thành tiền
          DISCRATE: 0, //%Chiết khấu
          DCPRCRAM: 0, //Tiền giảm CK
          PRDCQTTY: item.quantity, //Số lượng qui đổi
          SALEPRCE: item.PRCEDSCN, //Đơn giá qui đổi
          MNEYAMNT: item.PRCEDSCN * item.quantity, //Thành tiền qui đổi
          DCPRAMNT: 0, //Tiền giảm CK qui đổi
        };
      });
    formik.setFieldValue("DETAIL", detail);
    formik.setFieldValue(
      "SMPRQTTY",
      detail.reduce((value, currentValue) => value + currentValue.PRDCQTTY, 0)
    );
    formik.setFieldValue(
      "SUM_CRAM",
      detail.reduce((value, currentValue) => value + currentValue.MNEYCRAM, 0)
    );
  }, [productCarts, chooseAll]);

  console.log(formik.values);
  return isLoadingCommon ? (
    <div className="grid grid-cols-1 xl:container xl:mx-auto mx-5 gap-x-2 mb-5">
      <LoadingView></LoadingView>
    </div>
  ) : (
    <div className="product-detail">
      <InfoPage data={["Giỏ hàng", "Thanh toán và đặt hàng"]} />

      <div className="grid grid-cols-1 xl:container xl:mx-auto mx-5 gap-x-2 mb-5">
        <div
          style={{ marginBottom: "10px" }}
          className="shadow-md border-t border-gray-200 h-[500px] overflow-y-scroll"
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <th class="px-6 py-3 uppercase">
                <input
                  type="checkbox"
                  className="accent-first border-gray-light"
                  onClick={handleClickAllProduct}
                  value={chooseAll}
                />{" "}
                Tất cả
              </th>

              <th class="px-6 py-3 uppercase">Số lượng</th>
              <th class="px-6 py-3 uppercase">Đơn giá</th>
              <th class="px-6 py-3 uppercase">Thành tiền</th>
              <th class="px-6 py-3 w-fit uppercase">Xóa tất cả</th>
            </thead>

            <tbody>
              {productCarts?.length >= 1
                ? productCarts.map((item) => {
                    // const [imageState, setImageState] = useState(null);
                    // async function fetchImage() {
                    //   await fetch(item["PRDCIMGE"], {
                    //     method: "GET",
                    //     headers: {
                    //       TOKEN: localStorage.getItem("tokenUser"),
                    //     },
                    //   })
                    //     .then((response) => {
                    //       // console.log(response);
                    //       return response.blob();
                    //     })
                    //     .then((blob) => {
                    //       setImageState(URL.createObjectURL(blob));
                    //     });
                    // }
                    // fetchImage();
                    // console.log(imageState);
                    return (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center gap-x-2 w-fit">
                            <input
                              type="checkbox"
                              className="accent-first border-gray-light"
                              checked={item.choose}
                              onClick={() =>
                                handleChangeChoose(item["PRDCCODE"])
                              }
                            />
                            <img
                              src={""}
                              alt=""
                              className="w-20 h-16 object-cover object-center border p-[1px]"
                            />
                            <span className="text-gray-dark text-wrap lg:w-60 line-clamp-2 w-0">
                              {item["PRDCNAME"]}
                            </span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div className="flex items-center w-fit gap-x-1">
                            <button
                              onClick={() => handleSubstract(item["PRDCCODE"])}
                              className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark"
                            >
                              -
                            </button>
                            <div className="border rounded-md w-6 h-6 flex items-center justify-center text-xs text-gray-dark">
                              {item["quantity"]}
                            </div>
                            <button
                              onClick={() => handlePlus(item["PRDCCODE"])}
                              className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div className="font-semibold">
                            {item["PRCEDSCN"]}{" "}
                            <span className="text-xs">đ</span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div className="font-semibold">
                            {item["PRCEDSCN"] * item["quantity"]}{" "}
                            <span className="text-xs">đ</span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div
                            className="text-white bg-red-500 w-fit px-2 py-1 rounded-md text-xs cursor-pointer"
                            onClick={() =>
                              handleDeleteProduct(item["PRDCCODE"])
                            }
                          >
                            Xóa
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : "Bạn chưa có sản phẩm nào trong giỏ hàng"}
            </tbody>
          </table>
        </div>

        <div className="">
          <div
            className="bg-white shadow-md border-gray-100"
            style={{ marginBottom: "7px" }}
          >
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-dark font-semibold">
                Khuyến mãi:
              </div>
              <select
                name=""
                id=""
                className="outline-none border px-2 py-1 text-sm text-gray-dark"
              >
                <option value="" className="">
                  Khuyến mãi 100%
                </option>
                <option value="">Khuyến mãi 80%</option>
                <option value="">Khuyến mãi 70%</option>
              </select>
            </div>
          </div>

          <div className="bg-white shadow-md border-t border-gray-100">
            <div className="px-3 py-5">
              <h5 className="font-medium text-gray-dark mb-3">
                Thông tin đơn hàng
              </h5>
              <FormikProvider value={formik}>
                <Form
                  onSubmit={formik.handleSubmit}
                  onChange={() => {
                    changeForm;
                  }}
                >
                  <div className="grid grid-cols-3 gap-3 mb-5 px-5">
                    <div className="flex flex-col gap-y-3">
                      {/* TÊn người dùng  */}
                      <Input
                        name="MCUSTNME"
                        title={"Tên người dùng"}
                        value={formik.values.MCUSTNME}
                      ></Input>

                      {/* Địa chi  */}
                      <Input
                        name="CUSTADDR"
                        title={"Địa chỉ"}
                        value={formik.values.CUSTADDR}
                      ></Input>

                      {/* Số điện thoại  */}
                      <Input
                        name={"CUST_TEL"}
                        title={"Số điện thoại"}
                        value={formik.values.CUST_TEL}
                      ></Input>

                      {/* Ngày đặt hàng */}
                      <DatePicker
                        name="ODERDATE"
                        title="Ngày đặt hàng"
                        value={formik.values.ODERDATE}
                      ></DatePicker>

                      {/* Phân loại  */}
                      <Combobox
                        data={lstDcmnSbCd}
                        itemKey={"ITEMCODE"}
                        itemName="ITEMNAME"
                        name="DCMNSBCD"
                        title="Phân loại"
                        value={formik.values.DCMNSBCD}
                      ></Combobox>

                      {/* Tổng tiền  */}
                      <Input
                        name="SUM_CRAM"
                        title={"Tổng tiền"}
                        value={formik.values.SUM_CRAM}
                      ></Input>

                      {/* Tổng số lượng  */}
                      <Input
                        name="SMPRQTTY"
                        title={"Tổng số lượng"}
                        value={formik.values.SMPRQTTY}
                      ></Input>

                      {/* %Chiết khấu  */}
                      <Input
                        value={formik.values.RDTNRATE}
                        name="RDTNRATE"
                        title={"%Chiết khấu"}
                        type="number"
                      ></Input>

                      {/* Tiền chiết khấu */}
                      <Input
                        value={formik.values.RDTNCRAM}
                        name="RDTNCRAM"
                        title={"Tiền chiết khấu"}
                        // type={"number"}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      {/* Huê hồng khách hàng */}
                      <Input
                        value={formik.values.CSCMRATE}
                        name="CSCMRATE"
                        title={"Huê hồng khách hàng"}
                        // type={"number"}
                      ></Input>

                      {/* Mã số thuế */}
                      <Input
                        value={formik.values.TAX_CODE}
                        name="TAX_CODE"
                        title={"Mã số thuế"}
                        // type={"number"}
                      ></Input>

                      {/* Thuế xuất */}
                      <Input
                        value={formik.values.VAT_RATE}
                        name="VAT_RATE"
                        title={"Thuế xuất"}
                        // type={"number"}
                      ></Input>

                      {/* Tiền thuế */}
                      <Input
                        value={formik.values.VAT_CRAM}
                        name="VAT_CRAM"
                        title={"Tiền thuế"}
                        // type={"number"}
                      ></Input>

                      {/* Phương thức giao hàng  */}
                      <Combobox
                        data={lstDlvrMthd}
                        itemKey={"ITEMCODE"}
                        itemName="ITEMNAME"
                        name="DLVRMTHD"
                        title="Phương thức giao hàng"
                        value={formik.values.DLVRMTHD}
                      ></Combobox>

                      {/* Phương thức vận chuyển */}
                      <Combobox
                        data={lstDlvrType}
                        value={formik.values.DLVRTYPE}
                        name="DLVRTYPE"
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        title="Phương thức vận chuyển"
                      ></Combobox>

                      {/* Ngày giao hàng  */}
                      <DatePicker
                        value={formik.values.ODERDATE}
                        name="ODERDATE"
                        title="Ngày giao hàng"
                      ></DatePicker>

                      {/* Thời gian giao hàng */}
                      <Combobox
                        data={lstListHour}
                        value={formik.values.DLVRHOUR}
                        name="DLVRHOUR"
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        title="Giờ giao hàng"
                      ></Combobox>

                      {/* Nơi giao hàng */}
                      <Input
                        value={formik.values.DLVRPLCE}
                        name="DLVRPLCE"
                        title={"Nơi giao hàng"}
                        // type={"number"}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      {/* Địa chỉ giao hàng */}
                      <Input
                        value={formik.values.DLVRADDR}
                        name="DLVRADDR"
                        title={"Địa chỉ giao hàng"}
                        // type={"number"}
                      ></Input>

                      {/* Người nhận hàng */}
                      <Input
                        value={formik.values.RCVREMPL}
                        name="RCVREMPL"
                        title={"Người nhận hàng"}
                        // type={"number"}
                      ></Input>

                      {/* Số điện thoại người nhận*/}
                      <Input
                        value={formik.values.RCVR_TEL}
                        name="RCVR_TEL"
                        title={"Số điện thoại người nhận"}
                        // type={"number"}
                      ></Input>

                      {/* Phương thức thanh toán  */}
                      <Combobox
                        data={lstinpCustOdMtPayMthd2}
                        value={formik.values.PAY_MTHD}
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        name="PAY_MTHD"
                        title="Phương thức thanh toán"
                      ></Combobox>

                      {/*Chu kì thanh toán  */}
                      <Combobox
                        data={lstTimeType}
                        value={formik.values.PYMNPERD}
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        name="PYMNPERD"
                        title="Chu kì thanh toán"
                      ></Combobox>

                      {/* Thời hạn thanh toán*/}
                      <Input
                        value={formik.values.PYMNNUMB}
                        name="PYMNNUMB"
                        title={"Thời hạn thanh toán"}
                        // type={"number"}
                      ></Input>

                      {/* Diễn giải  */}
                      <TextArea
                        value={formik.values.NOTETEXT}
                        name="NOTETEXT"
                        title={"Diễn giải"}
                      ></TextArea>
                    </div>
                  </div>
                  {/* <div className="border-b gap-y-2 pb-3 mb-3">
                    <div className="flex items-start ml-auto flex-col w-48 gap-y-2">
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Tổng số sản phẩm:</span>{" "}
                        {
                          productCarts.filter((item) => item.choose == true)
                            .length
                        }
                      </div>
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">
                          Tổng số lượng sản phẩm:
                        </span>{" "}
                        {productCarts
                          .filter((item) => item.choose == true)
                          .reduce(
                            (value, currentValue) =>
                              value + currentValue["quantity"],
                            0
                          )}
                      </div>
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Tổng tiền:</span>{" "}
                        {productCarts
                          .filter((item) => item.choose == true)
                          .reduce(
                            (value, currentVaue) =>
                              value +
                              currentVaue["PRCEDSCN"] * currentVaue["quantity"],
                            0
                          )
                          .toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </div>
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Thuế(VAT):</span>{" "}
                        9.800.000đ
                      </div>

                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Khuyến mãi:</span>{" "}
                        9.800.000đ
                      </div>
                    </div>
                  </div> */}
                  <div className="flex items-center gap-x-2 justify-end">
                    <button
                      type="submit"
                      className="text-second bg-white px-3 py-2 border border-second hover:bg-second hover:text-white text-sm"
                    >
                      Đặt hàng
                    </button>
                    <button className="text-second bg-white px-3 py-2 border border-second hover:bg-second hover:text-white text-sm">
                      Thanh toán
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-semibold text-2xl text-first">
                Sản phẩm bán chạy
              </h4>
              <a href="#" className="text-gray-light">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>
            {/* <ProductSlider
              data={products?.slice(5, 30)}
              id="PRDCCODE"
              name={"PRDCNAME"}
              image={"PRDCIMGE"}
              price={"PRCEDSCN"}
              reviews={"rating"}
              stars={"rating"}
              saleOff={""}
              sold={""}
            ></ProductSlider> */}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default PayDetailComponent;
