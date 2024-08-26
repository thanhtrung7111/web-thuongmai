import React, { useEffect, useState } from "react";
import PopupCommon from "./PopupCommon";
import Asus from "../../assets/img/asus.jpg";
import ImageFetch from "../ImageFetch";
import ChooseStar from "../commonAnimtaion/ChooseStar";
import { useLazyFetchMaktStdrQuery } from "../../redux/query/commonQuery";
import { Form, Formik } from "formik";
import ButtonForm from "../commonForm/ButtonForm";
import { useSelector } from "react-redux";
import TextAreaForm from "../commonForm/TextAreaForm";
const PopupProductEvaluate = ({
  open,
  onClose,
  item = null,
  hanldeEvaluate,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [
    fetchMaktStdr,
    {
      data: dataMaktStdr,
      isLoading: isLoadingMaktStdr,
      isError: isErrorMaktStdr,
      isSuccess: isSuccessMaktStdr,
    },
  ] = useLazyFetchMaktStdrQuery();
  const [initialValue, setInitialValue] = useState({
    COMPCODE: "PMC",
    OBJCCODE: "000005",
    USERLGIN: currentUser?.USERLGIN,
    MARKCODE: 2,
    MARKDATE: "2024-04-25",
    PRDCCODE: item?.PRDCCODE,
    IDEANOTE: "",
    MARKESTM: 0,
    APRVSTTE: "0",
    DETAIL: dataMaktStdr
      ? [
          ...dataMaktStdr.map((item) => {
            return {
              COMPCODE: "PMC",
              MARKCODE: 2,
              STDRCODE: item.ITEMCODE,
              MARKESTM: 3,
            };
          }),
        ]
      : [],
  });

  const [star, setStar] = useState(5);

  useEffect(() => {
    if (open) {
      fetchMaktStdr();
    }
  }, [open]);
  useEffect(() => {
    if (isSuccessMaktStdr) {
      setInitialValue({
        COMPCODE: "PMC",
        OBJCCODE: currentUser?.USERLGIN,
        USERLGIN: currentUser?.USERLGIN,
        MARKCODE: 4,
        MARKDATE: "2024-04-25",
        PRDCCODE: item?.PRDCCODE,
        IDEANOTE: "",
        MARKESTM: 0,
        APRVSTTE: "0",
        DETAIL: dataMaktStdr
          ? [
              ...dataMaktStdr.map((item) => ({
                COMPCODE: "PMC",
                MARKCODE: 4,
                STDRCODE: item.ITEMCODE,
                MARKESTM: 5,
              })),
            ]
          : [],
      });
    }
  }, [isSuccessMaktStdr]);

  return (
    <PopupCommon open={open} title={"Đánh giá sản phẩm"} onClose={onClose}>
      <div className="px-4">
        <div className="flex gap-x-3 p-3 bg-slate-100 mb-3">
          <ImageFetch
            className={"w-12 h-12 border"}
            url={!item ? "" : item?.DETAIL_4[0]?.IMGE_URL}
          ></ImageFetch>
          <p className="text-gray-dark flex-auto text-sm font-semibold">
            {item && item.PRDCNAME}
          </p>
        </div>
        <Formik
          initialValues={initialValue}
          enableReinitialize={true}
          onSubmit={(values) => {
            hanldeEvaluate(values);
          }}
        >
          {({ values, setValues, setFieldValue }) => {
            return (
              <Form>
                <div className="flex flex-col gap-y-2">
                  {dataMaktStdr
                    ? dataMaktStdr.map((item) => {
                        return (
                          <div className="mb-3 flex flex-col gap-x-5">
                            <h5 className="text-gray-dark text-base mb-1">
                              {item?.ITEMNAME}
                            </h5>

                            <ChooseStar
                              star={
                                values.DETAIL.find(
                                  (i) => i.STDRCODE == item.ITEMCODE
                                )?.MARKESTM
                              }
                              onChangeStar={(value) => {
                                console.log(values.DETAIL);
                                const newValues = values.DETAIL.map((i) => ({
                                  ...i,
                                  MARKESTM:
                                    i.STDRCODE == item.ITEMCODE
                                      ? value
                                      : i?.MARKESTM,
                                }));
                                // console.log(newValues[0].MARKESTM);
                                const mark = Math.floor(
                                  newValues.reduce(
                                    (total, e) => total + e.MARKESTM,
                                    0
                                  ) / newValues.length
                                );

                                setValues({
                                  ...values,
                                  DETAIL: newValues,
                                  MARKESTM: mark,
                                });

                                // setFieldValue(
                                //   "MARKCODE",
                                //   Math.round(
                                //     (newValues.reduce(
                                //       (total, item) => (total += item.MARKCODE)
                                //     ),
                                //     0) / newValues.length
                                //   )
                                // );
                              }}
                            ></ChooseStar>
                          </div>
                        );
                      })
                    : ""}
                </div>

                <div className="mb-3">
                  <TextAreaForm
                    name="IDEANOTE"
                    placeholder="Nhập nội dung..."
                    important={true}
                    row={5}
                    label={"Ý kiến của bạn"}
                  ></TextAreaForm>
                </div>
                <ButtonForm
                  label={"Xác nhận đánh giá"}
                  type="submit"
                  className="!w-fit ml-auto"
                ></ButtonForm>
              </Form>
            );
          }}
        </Formik>
      </div>
    </PopupCommon>
  );
};

export default PopupProductEvaluate;
