import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import ButtonForm from "../commonForm/ButtonForm";
import Panigation from "../panigation/Panigation";
import CommentCard from "../CommentCard";
import TagList from "../TagList";
import { useFetchEvaluateMutation } from "../../redux/query/evaluateQuery";
import PopupProductEvaluate from "../commonPopup/PopupProductEvaluate";
import ProductSummaryReview from "./ProductSummaryReview";
import { useSelector } from "react-redux";
import ProductDetailEvaluateSkeleton from "./ProductDetailEvaluateSkeleton";
let pageSize = 10;
const tagsReview = [
  {
    id: 0,
    value: 0,
    name: "Tất cả",
  },
  {
    id: 1,
    value: 1,
    name: "Đánh giá 1 sao",
  },
  {
    id: 2,
    value: 2,
    name: "Đánh giá 2 sao",
  },
  {
    id: 3,
    value: 3,
    name: "Đánh giá 3 sao",
  },
  {
    id: 4,
    value: 4,
    name: "Đánh giá 4 sao",
  },
  {
    id: 5,
    value: 5,
    name: "Đánh giá 5 sao",
  },
];
const ProductDetailEvaluate = ({ item }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [openPopup, setOpenPopup] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [evaluate, setEvaluate] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    itemFilter: {
      id: 0,
      value: 0,
      name: "Tất cả",
    },
    listFilter: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeTagRam = (item) => {
    if (item.value == 0) {
      setDataFilter({
        itemFilter: item,
        listFilter: evaluate,
      });
    } else {
      setDataFilter({
        itemFilter: item,
        listFilter: evaluate.filter((i) => i.MARKESTM == item.value),
      });
    }
  };
  const [
    fetchEvaluate,
    {
      data: dataEvaluate,
      isLoading: isLoadingEvaluate,
      isError: isErrorEvaluate,
      isSuccess: isSuccessEvalute,
    },
  ] = useFetchEvaluateMutation();

  const hanldeEvaluate = (values) => {
    console.log(evaluate);
    setEvaluate([...evaluate, values.RETNDATA[0]]);
    setDisabled(true);
  };
  useEffect(() => {
    setDataFilter({
      itemFilter: { id: 0, value: 0, name: "Tất cả" },
      listFilter: [...evaluate],
    });
  }, [evaluate.length]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEvaluate(item.PRDCCODE);
    };
    if (item != null) {
      fetchData();
    }
  }, [item]);

  useEffect(() => {
    if (isSuccessEvalute) {
      setEvaluate(dataEvaluate.RETNDATA);
      setDataFilter({ ...dataFilter, listFilter: [...dataEvaluate.RETNDATA] });
      const findEvaluate = dataEvaluate.RETNDATA.find(
        (item) => item.USERLGIN == currentUser.USERLGIN
      );
      if (findEvaluate) {
        setDisabled(true);
      }
    }
  }, [isSuccessEvalute, dataEvaluate]);
  console.log(evaluate);
  return isLoadingEvaluate ? (
    <ProductDetailEvaluateSkeleton></ProductDetailEvaluateSkeleton>
  ) : (
    <div id="evaluate" className="mx-5 xl:container xl:mx-auto mb-5">
      <PopupProductEvaluate
        open={openPopup}
        item={item}
        onClose={() => setOpenPopup(close)}
        hanldeEvaluate={hanldeEvaluate}
      ></PopupProductEvaluate>
      <Wrapper>
        <div className="p-5">
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl text-gray-dark font-semibold">
                Đánh giá sản phẩm
              </h4>

              <ButtonForm
                label={disabled ? "Bạn đã đánh giá sản phẩm này" : "Đánh giá"}
                disabled={disabled}
                className="!w-fit"
                onClick={() => setOpenPopup(true)}
              ></ButtonForm>
            </div>

            <ProductSummaryReview
              reviews={evaluate}
              itemKey="MARKESTM"
            ></ProductSummaryReview>
          </div>
          {isLoadingEvaluate ? (
            "Đang tải dữ liệu"
          ) : evaluate.length == 0 ? (
            <div className="italic text-gray-700">Chưa có đánh giá nào!</div>
          ) : (
            <>
              <div>
                <div className="flex gap-x-2 ml-5 mb-5 flex-wrap gap-y-1">
                  <h4 className="text-base text-gray-darked font-semibold">
                    Xem đánh giá:
                  </h4>
                  <div>
                    <div className="flex items-center gap-x-3 flex-wrap gap-y-3">
                      <TagList
                        data={tagsReview}
                        tagName={"name"}
                        tagID={"id"}
                        onChange={onChangeTagRam}
                      ></TagList>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4 mb-16 min-h-[550px]">
                  {dataFilter.listFilter.length >= 1 ? (
                    dataFilter.listFilter
                      .slice(
                        (currentPage - 1) * pageSize,
                        pageSize * (currentPage - 1) + pageSize
                      )
                      .map((item) => {
                        return (
                          <CommentCard
                            name={item.USERNAME}
                            amountStar={item.MARKESTM}
                            timeStamp={item.MARKDATE}
                            content={item.IDEANOTE}
                            image={item.USER_URL}
                          ></CommentCard>
                        );
                      })
                  ) : (
                    <div className="italic px-5 text-gray-600">
                      Không có đánh giá {dataFilter.itemFilter.value} sao
                    </div>
                  )}
                </div>
                {dataFilter.length > pageSize && (
                  <Panigation
                    currentPage={currentPage}
                    totalCount={dataFilter.length}
                    pageSize={pageSize}
                    scrollTo="evaluate"
                    onPageChange={(page) => {
                      setCurrentPage(page);
                    }}
                  ></Panigation>
                )}
              </div>
            </>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetailEvaluate;
