import React, { useEffect, useState } from "react";
import Asus from "../../assets/img/asus.jpg";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { tagsReview } from "../../data";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import ImageFetch from "../ImageFetch";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { chooseProduct } from "../../redux/reducer/cartReducer";
import ImageMagnifier from "../ImageMagnifier";
import InfoPage from "../InfoPage";
import Wrapper from "../Wrapper";
import TagList from "../TagList";
import Panigation from "../panigation/Panigation";
import CommentCard from "../CommentCard";
import ProductSlider from "../ProductSlider";
import {
  useAddToCartMutation,
  useUpdateCartMutation,
} from "../../redux/query/cartQuery";
import { useFetchDetailProductMutation } from "../../redux/query/detailQuery";
import PopupProductEvaluate from "../commonPopup/PopupProductEvaluate";
import { useLazyFetchEvaluateQuery } from "../../redux/query/evaluateQuery";
import ButtonForm from "../commonForm/ButtonForm";
let pageSize = 4;
const images = [
  {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 3,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    id: 4,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    id: 5,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
];
const ProductDetailComponent = ({ id }) => {
  const [
    addToCart,
    {
      data: cartData,
      isLoading: isLoadingCart,
      isError: isErrorCart,
      isSuccess: isSuccessCart,
    },
  ] = useAddToCartMutation();

  const [
    updateCart,
    {
      data: cartUpdateDate,
      isLoading: isLoadingUpdateCart,
      isError: isErrorUpdateCart,
      isSuccess: isSuccessUpdateCart,
    },
  ] = useUpdateCartMutation();
  const [
    fetchDetailProduct,
    {
      data: dataProductDetail,
      isLoading: isLoadingProduct,
      isError: isErrorDetailProduct,
      isSuccess: isSuccessDetailProduct,
    },
  ] = useFetchDetailProductMutation();
  const [
    fetchEvaluate,
    {
      data: dataEvaluate,
      isLoading: isLoadingEvaluate,
      isError: isErrorEvaluate,
      isSuccess: isSuccessEvalute,
    },
  ] = useLazyFetchEvaluateQuery();

  const [evaluate, setEvaluate] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { productCarts } = useSelector((state) => state.cart);
  const [indexImage, setIndexImage] = useState({ ...images[0] });
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const onChangeTagRam = (value) => {
    console.log(value);
  };

  const handleChangeImage = (id) => {
    setIndexImage(images.find((item) => item.id == id));
    setMainImage(images.find((item) => item.id == id).image);
  };
  console.log(productCarts);

  const addCart = async (value) => {
    const productFind = productCarts.find(
      (item) => item.PRDCCODE == productDetail.PRDCCODE
    );
    console.log(productFind);
    if (!productFind) {
      console.log(productDetail);
      await addToCart({
        COMPCODE: productDetail.COMPCODE,
        LCTNCODE: "001",
        USERLOGIN: currentUser?.USERLGIN,
        PRDCCODE: productDetail.COMPCODE,
        QUOMQTTY: qty,
        QUOMCODE: 27,
        SALEPRCE: productDetail.PRCESALE,
        DSCNRATE: productDetail.DSCNRATE,
        PRDCNAME: productDetail.PRDCNAME,
        PRDCIMAGE: productDetail?.DETAIL_4[0]?.IMGE_URL,
      });
    } else {
      await updateCart({
        ...productFind,
        QUOMQTTY: qty,
        USERLOGIN: currentUser?.USERLGIN,
        PRDCIMAGE: productFind.PRDCIMAGE,
      });
    }
  };

  const handlePay = async (value) => {
    await addCart(value);
    dispatch(chooseProduct({ id: productDetail.PRDCCODE, checked: true }));
    navigate("/pay");
  };

  useEffect(() => {
    if (productDetail?.DETAIL_4[0]?.IMGE_URL) {
      console.log(productDetail?.DETAIL_4[0]?.IMGE_URL);
      setMainImage(productDetail?.DETAIL_4[0]?.IMGE_URL);
    }
  }, [productDetail]);
  console.log(productDetail);
  const showManify = () => {
    dispatch(openManify());
  };

  useEffect(() => {
    if (isSuccessCart || isSuccessUpdateCart) {
      toast.success("Thêm sản phẩm vào giỏ thành công!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  }, [isSuccessCart, isSuccessUpdateCart]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDetailProduct({
        DCMNCODE: "appPrdcDetl",
        PARACODE: "001",
        KEY_CODE: id,
      });
      await fetchEvaluate(id);
    };
    if (id != null && id != "") {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (isSuccessDetailProduct) {
      setProductDetail(dataProductDetail.RETNDATA[0]);
    }
  }, [isSuccessDetailProduct]);

  useEffect(() => {
    if (isSuccessEvalute) {
      setEvaluate(dataEvaluate.RETNDATA);
    }
  }, [isSuccessEvalute]);
  console.log(dataEvaluate);
  return isLoadingProduct ? (
    <ProductDetailSkeleton />
  ) : (
    // <ProductDetailSkeleton />
    <div className="product-detail">
      <PopupProductEvaluate
        open={openPopup}
        item={productDetail}
        onClose={() => setOpenPopup(close)}
      ></PopupProductEvaluate>
      <InfoPage data={["Sản phẩm", productDetail?.PRDCNAME]} />
      {/* <ImageMagnifier image={mainImage}></ImageMagnifier> */}
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="px-7 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] xl:grid-cols-[2fr_3fr] gap-x-16 gap-y-10">
              {/* HÌNH SẢN PhẢM  */}
              <div className="min-w-full h-fit flex flex-col gap-y-2">
                <div
                  className="h-96 w-full border border-gray-100 p-2 cursor-zoom-in"
                  onClick={showManify}
                >
                  {/* <ImageFetch url={product?.DETAIL_4[0]?.IMGE_URL}></ImageFetch> */}
                  <ImageFetch
                    className={"w-full h-full"}
                    url={mainImage}
                  ></ImageFetch>
                </div>
                <div className="min-w-full">
                  <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={4}
                    autoplay="true"
                    navigation={{
                      prevEl: navigationPrevRef.current,
                      nextEl: navigationNextRef.current,
                    }}
                    // pagination={{ clickable: true }}
                    //   scrollbar={{ draggable: true }}
                    loop="true"
                    className="h-full w-full"
                    onInit={(swiper) => {
                      swiper.params.navigation.prevEl =
                        navigationPrevRef.current;
                      swiper.params.navigation.nextEl =
                        navigationNextRef.current;
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }}
                  >
                    {images.map((item) => {
                      return (
                        <SwiperSlide
                          className={`flex items-center justify-center rounded-md overflow-hidden p-3
                        `}
                          onClick={() => handleChangeImage(item.id)}
                        >
                          <div
                            className={`transition-all cursor-pointer absolute top-0 right-0 w-full h-full ${
                              indexImage.id == item.id
                                ? "shadow-md border"
                                : "bg-black bg-opacity-15"
                            }`}
                          ></div>
                          <img
                            src={item.image}
                            className="h-32 w-full object-contain object-top"
                            alt=""
                          />
                        </SwiperSlide>
                      );
                    })}

                    <div
                      ref={navigationPrevRef}
                      className="absolute top-[50%] -translate-y-[50%] left-0 cursor-pointer z-50 py-4 px-3 bg-black bg-opacity-20 text-white"
                    >
                      <i class="ri-arrow-left-s-line"></i>
                    </div>
                    <div
                      ref={navigationNextRef}
                      className="absolute top-[50%] -translate-y-[50%] right-0 cursor-pointer z-50 py-4 px-3 bg-black bg-opacity-20 text-white"
                    >
                      <i class="ri-arrow-right-s-line"></i>
                    </div>
                  </Swiper>
                </div>

                <ul>
                  <li className="text-gray-dark text-xs flex items-center">
                    <i className="ri-check-fill text-first font-extrabold text-xl"></i>
                    <span className="font-bold">Mô tả:</span>{" "}
                    {productDetail?.DESCFULL}
                  </li>

                  <li className="text-xs flex items-center mt-3">
                    <span className="font-thin cursor-pointer text-second">
                      Xem thông tin chi tiết...
                    </span>
                  </li>
                </ul>
              </div>

              {/* THÔNG TIN SẢN PHẨM  */}
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                  <h2 className="text-2xl text-gray-dark font-bold">
                    {productDetail?.PRDCNAME}
                  </h2>

                  {/* PRICE  */}
                  <div className="flex gap-x-2">
                    <div className="text-second text-3xl font-bold flex justify-start">
                      {productDetail?.PRCEDSCN?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div className="text-gray-light line-through flex justify-start text-lg">
                      {productDetail?.PRCESALE?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div className="text-white bg-second w-fit h-fit px-1 text-sm py-1">
                      Giảm {productDetail?.DSCNRATE}%
                    </div>
                  </div>

                  {/* STAR  */}
                  <div className="flex items-center gap-x-2">
                    <div className="flex items-center gap-x-1">
                      {
                        productDetail?.DETAIL_3?.length > 0
                        // &&
                        // [
                        //   ...Array(
                        //     Math.floor(
                        //       product?.DETAIL_3?.reduce(
                        //         (accumulator, currentValue) =>
                        //           accumulator + currentValue.PRDCMARK,
                        //         0
                        //       ) / product?.DETAIL_3.length
                        //     )
                        //   ),
                        // ].map((star) => {
                        //   return (
                        //     <i className="ri-star-fill text-yellow-400 text-xl"></i>
                        //   );
                        // })
                      }
                    </div>
                    <span className="text-sm text-gray-dark">
                      ({productDetail?.DETAIL_3?.length} đánh giá)
                    </span>
                  </div>

                  <div className="font-medium text-gray-dark text-sm">
                    Đã bán: <span className="font-normal">150 sản phẩm </span>
                  </div>
                </div>

                {/* OPTION  */}
                {/* <div className="border-y py-4 flex flex-col gap-y-5 ">
          
                  <div className="flex items-center gap-x-2">
                    <span className="font-semibold text-gray-dark text-lg">
                      RAM:
                    </span>
                    <TagList
                      data={tagsRam}
                      tagName={"tagName"}
                      tagID={"tagId"}
                      onChange={onChangeTagRam}
                    ></TagList>
                  </div>

         
                  <div className="flex items-center gap-x-2">
                    <span className="font-semibold text-gray-dark text-lg">
                      MÀU SẮC:
                    </span>
                    <TagList
                      data={tagsColor}
                      tagName={"tagName"}
                      tagID={"tagId"}
                      onChange={onChangeTagRam}
                    ></TagList>
                  </div>
                </div> */}

                {/* ACTION  */}
                <div className="flex flex-col gap-y-5">
                  <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-gray-dark text-sm">
                      Số lượng:
                    </span>
                    <div className="flex items-center justify-start gap-x-1">
                      <button
                        onClick={() => {
                          if (qty == 1) {
                            return;
                          }
                          setQty(qty - 1);
                        }}
                        className="text-gray-darked w-8 h-8 text-lg border flex items-center justify-center"
                      >
                        -
                      </button>
                      {/* <div className="text-gray-light w-10 h-8 text-base border flex items-center justify-center"> */}
                      <input
                        type="number"
                        placeholder={1}
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-24 text-center outline-none border h-8"
                      />
                      {/* </div> */}

                      <button
                        onClick={() => setQty(qty + 1)}
                        className="text-gray-darked w-8 h-8 text-lg border flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-gray-dark">
                      (265 sản phẩm có sẵn)
                    </span>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <button
                      disabled={isLoadingCart || isErrorUpdateCart}
                      className="bg-second  disabled:opacity-85 text-white rounded-md px-3 h-12 w-40"
                      onClick={() => addCart(productDetail)}
                    >
                      {isLoadingCart || isLoadingUpdateCart ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-first"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span class="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Thêm vào giỏ"
                      )}
                    </button>
                    <button
                      disabled={isLoadingCart || isErrorUpdateCart}
                      onClick={() => handlePay(productDetail)}
                      className="bg-[#f24c4c] text-white rounded-md px-3 h-12 w-40"
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" grid-cols-3 px-10 py-3 items-center justify-between lg:grid hidden border-t border-gray-100">
            <div className="flex items-center gap-x-3 justify-center">
              <i className="ri-refresh-line text-second text-4xl"></i>
              <div>
                <h6 className="font-semibold text-base">
                  7 ngày miễn phí trả hàng
                </h6>
                <span className="text-xs text-gray-light tracking-wider">
                  Trả hàng miễn phí trong 7 ngày
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-3 justify-center">
              <i className="ri-shield-cross-fill text-second text-4xl"></i>
              <div>
                <h6 className="font-semibold  text-base">
                  Hàng chính hãng 100%
                </h6>
                <span className="text-xs text-gray-light tracking-wider">
                  Trả hàng miễn phí trong 7 ngày
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-3 justify-center">
              <i className="ri-caravan-fill text-second text-4xl"></i>
              <div>
                <h6 className="font-semibold  text-base">
                  Miễn phí vận chuyển
                </h6>
                <span className="text-xs text-gray-light tracking-wider">
                  Trả hàng miễn phí trong 7 ngày
                </span>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="hidden">
        <div className="mx-5 xl:container xl:mx-auto mb-5">
          <Wrapper>
            <div className="p-5 px-5">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="text-gray-dark font-semibold text-2xl mb-2">
                      Mô tả sản phẩm
                    </h4>
                    <p className=" text-gray-dark leading-7">
                      Màn hình LCD MSI 21.45" PRO MP223 sở hữu tấm màn VA có độ
                      tương phản cao, mang lại góc nhìn rộng và có hiệu suất tốt
                      hơn. Ngoài ra, màn hình cũng có khả năng hiển thị 16.7
                      triệu màu giúp màn hình tái tạo màu sắc với độ chính xác
                      cao, làm cho hình ảnh và video trở nên rõ ràng và trung
                      thực hơn.
                    </p>
                  </div>

                  <div>
                    <img src={Asus} alt="" className="w-full h-auto" />
                    <span className="text-gray-light  ml-5">
                      Màn hình LCD MSI 21.45" PRO MP223
                    </span>
                  </div>

                  <div>
                    <h4 className="text-gray-dark font-semibold text-lg mb-2">
                      Thiết kế sang trọng, cứng cáp cùng màn hình góc nhìn 178
                      (H) / 178 (V){" "}
                    </h4>
                    <p className=" text-gray-dark leading-7">
                      Màn hình LCD MSI 21.45" PRO MP223 sở hữu tấm màn VA có độ
                      tương phản cao, mang lại góc nhìn rộng và có hiệu suất tốt
                      hơn. Ngoài ra, màn hình cũng có khả năng hiển thị 16.7
                      triệu màu giúp màn hình tái tạo màu sắc với độ chính xác
                      cao, làm cho hình ảnh và video trở nên rõ ràng và trung
                      thực hơn.
                    </p>
                    <p className=" text-gray-dark leading-7">
                      Màn hình LCD MSI 21.45" PRO MP223 sở hữu tấm màn VA có độ
                      tương phản cao, mang lại góc nhìn rộng và có hiệu suất tốt
                      hơn. Ngoài ra, màn hình cũng có khả năng hiển thị 16.7
                      triệu màu giúp màn hình tái tạo màu sắc với độ chính xác
                      cao, làm cho hình ảnh và video trở nên rõ ràng và trung
                      thực hơn.
                    </p>
                  </div>

                  <div>
                    <img src={Asus} alt="" className="w-full h-auto" />
                    <span className="text-gray-light  ml-5">
                      Màn hình 21.45 inch độ phân giải 1920 x 1080 cùng tấm màn
                      VA hiện đại
                    </span>
                  </div>
                  <div>
                    <p className=" text-gray-dark leading-7">
                      Màn hình sở hữu kích thước 21.45 inch cùng độ phân giải
                      1920 x 1080 pixels sẽ mang tới chất lượng hình ảnh được
                      hiển thị với độ chính xác và sống động cao. Đồng thời độ
                      phân giải này đủ để mang tới trải nghiệm chơi game và giải
                      trí hoặc các công việc văn phòng.
                    </p>
                    <p className=" text-gray-dark leading-7">
                      LCD MSI được trang bị tấm nền VA có khả năng tạo ra hình
                      ảnh sắc nét với chiều sâu màu sắc và độ rõ nét. Đồng thời
                      cũng cung cấp hình ảnh rộng hơn, duy trì chất lượng hình
                      ảnh khi nhìn từ các góc độ khác nhau. Nhờ vậy mà màn hình
                      phù hợp với nhu cầu trong văn phòng, công sở.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-gray-dark font-semibold text-lg mb-2">
                      Một số công dụng khi sử dụng màn hình (Phong Vũ đã tổng
                      hợp nhiều ý kiến của khách hàng) quý khách có thể tham
                      khảo dưới đây:
                    </h4>

                    <ul className="list-disc pl-7 leading-7">
                      <li className="text-gray-dark">
                        Tối ưu hóa năng suất: Màn hình mở rộng cho phép mở rộng
                        không gian hiển thị, tạo điều kiện thuận lợi để quan sát
                        đồng thời nhiều khía cạnh công việc. Điều này giúp tăng
                        cường khả năng thực hiện đa nhiệm và hoàn thành công
                        việc hiệu quả hơn.
                      </li>
                      <li className="text-gray-dark">
                        Tạo cảm giác sâu sắc, truyền cảm hứng khi làm việc: Khả
                        năng đắm chìm tốt hơn được tạo ra bởi màn hình mở rộng,
                        cung cấp trải nghiệm sống động khi tham gia vào các trò
                        chơi hoặc thưởng thức phim ảnh. Góc nhìn rộng hơn và
                        hình ảnh trung thực hơn tạo ra sự hấp dẫn và thỏa mãn
                        tốt hơn.
                      </li>
                      <li className="text-gray-dark">
                        Đa nhiệm hiệu quả hơn: Màn hình mở rộng cho phép bạn mở
                        đồng thời nhiều cửa sổ, tạo thuận lợi cho việc tham khảo
                        nhiều tài liệu hoặc ứng dụng khác nhau trong một thời
                        điểm. Điều này nâng cao khả năng thực hiện nhiều công
                        việc đồng thời một cách hiệu quả.
                      </li>
                      <li className="text-gray-dark">
                        Tăng cường trải nghiệm hình ảnh: Màn hình mở rộng thường
                        có độ phân giải cao hơn và gam màu rộng hơn so với màn
                        hình truyền thống. Điều này giúp hình ảnh và video trở
                        nên sống động và chân thực hơn, tạo ra trải nghiệm hấp
                        dẫn thị giác.
                      </li>
                      <li className="text-gray-dark">
                        Giảm căng thẳng và tạo sự thoải mái: Màn hình mở rộng
                        giúp giảm căng thẳng cho mắt bằng cách mở ra không gian
                        hiển thị lớn hơn. Điều này giúp bạn tiết kiệm thời gian
                        và công sức khi làm việc trước máy tính, tạo sự thoải
                        mái và hiệu suất làm việc cao hơn.
                      </li>
                    </ul>
                  </div>
                  <p className="text-gray-dark leading-7">
                    Phong Vũ mong rằng bài viết đã cung cấp cho bạn những thông
                    tin bổ ích. Nếu bạn còn câu hỏi hay thắc mắc phần nào hãy
                    liên hệ ngay để Phong Vũ giải đáp cho bạn nhé. Truy cập tại
                    đây!
                  </p>
                </div>

                {/* THÔNG TIN CHI TIÊT  */}
                <div>
                  <h4 className="text-gray-dark font-semibold text-2xl mb-5">
                    Thông tin chi tiết
                  </h4>
                  <table class="w-full text-sm text-left rtl:text-right text-gray-dark table-auto">
                    <tbody>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Thương hiệu</td>
                        <td class="px-6 py-3 text-end">MSI</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Bảo hành</td>
                        <td class="px-6 py-3 text-end">24 tháng</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Nhu cầu</td>
                        <td class="px-6 py-3 text-end">MP223</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">
                          Số cổng âm thanh
                        </td>
                        <td class="px-6 py-3 text-end">MP223</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Kích thước</td>
                        <td class="px-6 py-3 text-end">21.45”</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Độ phân giải</td>
                        <td class="px-6 py-3 text-end">1920x100</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Tấm nền</td>
                        <td class="px-6 py-3 text-end">VA</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Tần số quét</td>
                        <td class="px-6 py-3 text-end">100Hz</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Tấm nền</td>
                        <td class="px-6 py-3 text-end">
                          1ms(MPRT) / 4ms (GTG)
                        </td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">
                          Thời gian phản hồi
                        </td>
                        <td class="px-6 py-3 text-end">VA</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Kiểu màn hình</td>
                        <td class="px-6 py-3 text-end">Màn hình phẳng</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">
                          Công nghệ đồng bộ
                        </td>
                        <td class="px-6 py-3 text-end">Adaptive Sync</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">Độ sáng</td>
                        <td class="px-6 py-3 text-end">250cd/m2</td>
                      </tr>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700">
                        <td class="px-6 py-3 font-semibold">
                          Công nghệ đồng bộ
                        </td>
                        <td class="px-6 py-3 text-end">Adaptive Sync</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center mt-3">
                    <i className="ri-arrow-down-s-line text-second text-xl hover:translate-y-2 transition-transform duration-200 cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
      </div>
      {/* ĐÁNH GIÁ SẢN PHẨM  */}
      <div id="evaluate" className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="mb-5">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl text-gray-dark font-semibold">
                  Đánh giá sản phẩm
                </h4>
                <ButtonForm
                  label={"Đánh giá"}
                  className="!w-fit"
                  onClick={() => setOpenPopup(true)}
                ></ButtonForm>
              </div>
              <div className="flex flex-col md:flex-row  items-center md:items-start gap-10 px-5 py-5">
                <div className="flex flex-col items-center justify-center w-fit md:pr-10 md:border-r">
                  <span className="text-9xl font-normal text-gray-dark">
                    {/* {(
                      product?.DETAIL_3.reduce(
                        (value, currentValue) => value + currentValue.PRDCMARK,
                        0
                      ) / product?.DETAIL_3.length
                    ).toFixed(1)} */}
                  </span>
                  <div>
                    <div className="flex items-center gap-x-1">
                      {/* {product?.DETAIL_3 &&
                        [
                          ...Array(
                            Math.ceil(
                              product?.DETAIL_3.reduce(
                                (value, currentValue) =>
                                  value + currentValue.PRDCMARK,
                                0
                              ) / product?.DETAIL_3.length
                            )
                          ),
                        ].map((item) => {
                          return (
                            <i className="ri-star-fill text-yellow-400 text-xl"></i>
                          );
                        })} */}
                    </div>
                  </div>
                  <span className="text-gray-light">
                    ( {evaluate.length} Đánh giá )
                  </span>
                </div>

                <div className="flex flex-col gap-y-1">
                  <div className="flex gap-x-2 items-center">
                    <span className=" text-yellow-400 font-medium w-6">
                      5<i className="ri-star-fill text-base"></i>
                    </span>

                    <div className="relative w-[200px] bg-slate-300 h-2 rounded-md overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 w-1/4 h-full ${
                          (evaluate.filter((item) => item.MARKESTM == 5)
                            .length /
                            evaluate.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (evaluate.filter((item) => item.MARKESTM == 5)
                              .length /
                              evaluate.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <span className=" text-yellow-400 font-medium w-6">
                      4<i className="ri-star-fill text-base"></i>
                    </span>

                    <div className="relative w-[200px] bg-slate-300 h-2 rounded-md overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 w-1/4 h-full ${
                          (productDetail?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 4
                          ).length /
                            productDetail?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (productDetail?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 4
                            ).length /
                              productDetail?.DETAIL_3?.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <span className=" text-yellow-400 font-medium w-6">
                      3<i className="ri-star-fill text-base"></i>
                    </span>

                    <div className="relative w-[200px] bg-slate-300 h-2 rounded-md overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 w-1/4 h-full ${
                          (productDetail?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 3
                          ).length /
                            productDetail?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (productDetail?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 3
                            ).length /
                              productDetail?.DETAIL_3?.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <span className=" text-yellow-400 font-medium w-6">
                      2<i className="ri-star-fill text-base"></i>
                    </span>

                    <div className="relative w-[200px] bg-slate-300 h-2 rounded-md overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 w-1/4 h-full ${
                          (productDetail?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 2
                          ).length /
                            productDetail?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (productDetail?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 2
                            ).length /
                              productDetail?.DETAIL_3?.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <span className=" text-yellow-400 font-medium w-6">
                      1<i className="ri-star-fill text-base"></i>
                    </span>

                    <div className="relative w-[200px] bg-slate-300 h-2 rounded-md overflow-hidden">
                      <div
                        className={`absolute left-0 top-0  w-1/4 h-full ${
                          (productDetail?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 1
                          ).length /
                            productDetail?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (productDetail?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 1
                            ).length /
                              productDetail?.DETAIL_3?.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-x-2 ml-5 mb-5 flex-wrap gap-y-1">
                <h4 className="text-base text-gray-darked font-semibold">
                  Xem đánh giá:
                </h4>
                <div>
                  <div className="flex items-center gap-x-3 flex-wrap gap-y-3">
                    <TagList
                      data={tagsReview}
                      tagName={"tagName"}
                      tagID={"tagId"}
                      onChange={onChangeTagRam}
                    ></TagList>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-4 mb-16 min-h-[550px]">
                {evaluate &&
                  evaluate
                    .slice(
                      (currentPage - 1) * pageSize,
                      pageSize * (currentPage - 1) + pageSize
                    )
                    .map((item) => {
                      return (
                        <CommentCard
                          name={item.CUSTNAME}
                          amountStar={item.MARKESTM}
                          timeStamp={item.MARKDATE}
                          content={item.IDEANOTE}
                        ></CommentCard>
                      );
                    })}
              </div>
              {productDetail?.DETAIL_3?.length > 0 && (
                <Panigation
                  currentPage={currentPage}
                  totalCount={productDetail?.DETAIL_3?.length}
                  pageSize={pageSize}
                  scrollTo="evaluate"
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                ></Panigation>
              )}
            </div>
          </div>
        </Wrapper>
      </div>

      {/* <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-semibold text-2xl text-first">
                Sản phẩm liên quan
              </h4>
              <a href="#" className="text-gray-light">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>
            <ProductSlider
              data={productDetail?.DETAIL_2}
              id={"PRDCCODE"}
              name={"PRDCNAME"}
              image={"PRDCIMGE"}
              price={"DSCNPRCE"}
              discount={"DSCNRATE"}
              // reviews={"amountReview"}
              // stars={"rating"}
              saleOff={"SALEPRCE"}
              // sold={"100"}
            ></ProductSlider>
          </div>
        </Wrapper>
      </div> */}
    </div>
  );
};

export default ProductDetailComponent;
