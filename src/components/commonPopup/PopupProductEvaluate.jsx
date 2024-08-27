import React, { useEffect, useState } from "react";
import PopupCommon from "./PopupCommon";
import Asus from "../../assets/img/asus.jpg";
import ImageFetch from "../ImageFetch";
import ChooseStar from "../commonAnimtaion/ChooseStar";
import { useLazyFetchMaktStdrQuery } from "../../redux/query/commonQuery";
import { Form, Formik } from "formik";
import ButtonForm from "../commonForm/ButtonForm";
import { useSelector } from "react-redux";
import TextAreaForm from "../formikCustomForm/TextareaFormikForm";
import * as Yup from "yup";
import { usePostEvaluateMutation } from "../../redux/query/evaluateQuery";
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
  const [
    postEvaluate,
    {
      data: dataPostEvaluate,
      isLoading: isLoadingPostEvaluate,
      isError: isErrorPostEvaluate,
      isSuccess: isSuccessPostEvaluate,
    },
  ] = usePostEvaluateMutation();
  const validateSchema = Yup.object().shape({
    IDEANOTE: Yup.string()
      .required("Không để trống đánh giá")
      .min(10, "Nội dung đánh giá có ít nhất 10 kí tự!")
      .max(100, "Nội dung đánh giá không vượt quá 100 kí tự!"),
  });
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

  const handleSubmit = async (values) => {
    try {
      postEvaluate(values).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    if (open) {
      fetchMaktStdr();
    }
  }, [open]);
  useEffect(() => {
    const markCode = Math.round(Math.random() * 1000);
    if (isSuccessMaktStdr) {
      setInitialValue({
        COMPCODE: "PMC",
        OBJCCODE: currentUser?.CUSTCODE,
        USERLGIN: currentUser?.USERLGIN,
        USERNAME: currentUser?.USERNAME,
        USER_URL: currentUser?.USERIMGE,
        MARKCODE: markCode,
        MARKDATE: "2024-04-25",
        PRDCCODE: item?.PRDCCODE,
        IDEANOTE: "",
        MARKESTM: 5,
        APRVSTTE: "0",
        DETAIL: dataMaktStdr
          ? [
              ...dataMaktStdr.map((item) => ({
                COMPCODE: "PMC",
                MARKCODE: markCode,
                STDRCODE: item.ITEMCODE,
                MARKESTM: 5,
              })),
            ]
          : [],
      });
    }
  }, [isSuccessMaktStdr]);

  useEffect(() => {
    if (isSuccessPostEvaluate) {
      hanldeEvaluate(dataPostEvaluate);
    }
  }, [isSuccessPostEvaluate]);
  return (
    <PopupCommon
      open={open}
      title={"Đánh giá sản phẩm"}
      onClose={() => {
        if (!isLoadingPostEvaluate) {
          onClose();
        }
      }}
    >
      <div className="w-full overflow-hidden">
        <div
          className={`px-4 w-[200%] flex ${
            isSuccessPostEvaluate ? "-translate-x-[50%]" : "translate-x-[0%]"
          } transition-transform duration-300`}
        >
          <div className="w-full">
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
              validationSchema={validateSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({ values, setValues, setFieldValue }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-y-2">
                      {dataMaktStdr
                        ? dataMaktStdr.map((item) => {
                            return (
                              <div
                                key={item.ITEMCODE}
                                className="mb-3 flex flex-col gap-x-5"
                              >
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
                                    const newValues = values.DETAIL.map(
                                      (i) => ({
                                        ...i,
                                        MARKESTM:
                                          i.STDRCODE == item.ITEMCODE
                                            ? value
                                            : i?.MARKESTM,
                                      })
                                    );
                                    // console.log(newValues[0].MARKESTM);
                                    const mark = Math.ceil(
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
                    <div className="flex justify-end gap-x-2">
                      <ButtonForm
                        label={"Đóng"}
                        type="submit"
                        className="!w-48 bg-slate-400"
                        onClick={onClose}
                      ></ButtonForm>
                      <ButtonForm
                        label={"Xác nhận đánh giá"}
                        loading={isLoadingPostEvaluate}
                        type="submit"
                        className="!w-48 "
                      ></ButtonForm>
                    </div>
                  </Form>
                );
              }}
            </Formik>{" "}
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="font-semibold">Đánh giá sản phẩm đã ghi nhận</div>
            <img
              className="w-1/2 h-auto"
              src="https://png.pngtree.com/png-vector/20200319/ourmid/pngtree-customer-reviews-concept-with-people-giving-five-stars-rating-positive-feedback-png-image_2158028.jpg"
              alt=""
            />
            <div>Cám ơn bạn đã đánh giá sản phẩm của chúng tôi!</div>
            <ButtonForm
              label={"Đóng"}
              type="submit"
              className="!w-48 mt-5"
              onClick={onClose}
            ></ButtonForm>
          </div>
        </div>
      </div>
    </PopupCommon>
  );
};

export default PopupProductEvaluate;
