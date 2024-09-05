import React, { useEffect, useState } from "react";
import Asus from "../../assets/img/asus.jpg";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  checkProduct,
  checkProductPay,
  chooseProduct,
  unCheckAllProduct,
} from "../../redux/reducer/cartReducer";
import {
  useAddToCartMutation,
  useUpdateCartMutation,
} from "../../redux/query/cartQuery";
import InfoPage from "../../components/InfoPage";
import Wrapper from "../../components/Wrapper";
import ImageFetch from "../../components/ImageFetch";
import ProductDetailEvaluate from "./component/ProductDetailEvaluate";
import ProductDetailSkeleton from "./component/ProductDetailSkeleton";
import ImageMagnifier from "../../components/ImageMagnifier";
import { useFetchDetailProductMutation } from "../../redux/query/detailQuery";
import ButtonForm from "../../components/commonForm/ButtonForm";
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
const ProductDetailPage = () => {
  const [action, setAction] = useState("");
  const { id } = useParams();
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

  const [openManify, setOpenManify] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { productCarts } = useSelector((state) => state.cart);
  const [indexImage, setIndexImage] = useState({ ...images[0] });
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const handleChangeImage = (id) => {
    setIndexImage(images.find((item) => item.id == id));
    setMainImage(images.find((item) => item.id == id).image);
  };

  const addCart = async (value) => {
    const productFind = productCarts.find(
      (item) => item.PRDCCODE == productDetail.PRDCCODE
    );
    console.log(productFind);
    if (!productFind) {
      console.log(productDetail);
      try {
        await addToCart({
          COMPCODE: productDetail.COMPCODE,
          LCTNCODE: "001",
          USERLOGIN: currentUser?.USERLGIN,
          PRDCCODE: productDetail.PRDCCODE,
          QUOMQTTY: qty,
          QUOMCODE: 27,
          SALEPRCE: productDetail.PRCESALE,
          DSCNRATE: productDetail.DSCNRATE,
          PRDCNAME: productDetail.PRDCNAME,
          PRDCIMAGE: productDetail?.DETAIL_4[0]?.IMGE_URL,
        });
        setAction("add");
      } catch (error) {}
    } else {
      try {
        await updateCart({
          ...productFind,
          QUOMQTTY: qty,
          USERLOGIN: currentUser?.USERLGIN,
          PRDCIMAGE: productFind.PRDCIMAGE,
        });
        setAction("update");
      } catch (error) {}
    }
  };
  console.log(cartData);
  const handlePay = async () => {
    try {
      await addToCart({
        COMPCODE: productDetail.COMPCODE,
        LCTNCODE: "001",
        USERLOGIN: currentUser?.USERLGIN,
        PRDCCODE: productDetail.PRDCCODE,
        QUOMQTTY: qty,
        QUOMCODE: 27,
        SALEPRCE: productDetail.PRCESALE,
        DSCNRATE: productDetail.DSCNRATE,
        PRDCNAME: productDetail.PRDCNAME,
        PRDCIMAGE: productDetail?.DETAIL_4[0]?.IMGE_URL,
      });
      setAction("pay");
    } catch (error) {
      return;
    }
    dispatch(unCheckAllProduct());
    dispatch(checkProduct({ id: productDetail?.PRDCCODE, checked: true }));
    navigate("/pay");
  };

  useEffect(() => {
    if (productDetail?.DETAIL_4[0]?.IMGE_URL) {
      console.log(productDetail?.DETAIL_4[0]?.IMGE_URL);
      setMainImage(productDetail?.DETAIL_4[0]?.IMGE_URL);
    }
  }, [productDetail]);

  useEffect(() => {
    if (isSuccessCart || isSuccessUpdateCart) {
      if (action == "pay") {
        return;
      } else {
        const message =
          action == "add"
            ? "Thêm vào giỏ hàng thành công!"
            : "Đã cập nhật số lượng sản phẩm!";
        toast.success(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
      }
    }
  }, [isSuccessCart, isSuccessUpdateCart]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("run");
      await fetchDetailProduct({
        DCMNCODE: "appPrdcDetl",
        PARACODE: "001",
        KEY_CODE: id,
      });
    };
    if (id != null && id != "") {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (isSuccessDetailProduct) {
      setProductDetail(dataProductDetail?.RETNDATA[0]);
    }
  }, [isSuccessDetailProduct]);
  console.log(dataProductDetail);
  return isLoadingProduct ? (
    <ProductDetailSkeleton />
  ) : (
    // <ProductDetailSkeleton />
    <div className="product-detail">
      <InfoPage data={["Sản phẩm", productDetail?.PRDCNAME]} />
      <ImageMagnifier
        open={openManify}
        image={mainImage}
        onCloseManify={() => setOpenManify(false)}
      ></ImageMagnifier>
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="px-7 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] xl:grid-cols-[2fr_3fr] gap-x-16 gap-y-10">
              {/* HÌNH SẢN PhẢM  */}
              <div className="min-w-full h-fit flex flex-col gap-y-2">
                <div
                  className="h-96 w-full border border-gray-100 p-2 cursor-zoom-in"
                  onClick={() => setOpenManify(true)}
                >
                  {/* <ImageFetch url={product?.DETAIL_4[0]?.IMGE_URL}></ImageFetch> */}
                  <ImageFetch
                    className={"w-full h-full"}
                    url={mainImage}
                    id={productDetail?.PRDCCODE}
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
                    <ButtonForm
                      onClick={() => addCart(productDetail)}
                      className="!w-fit"
                      label={"Thêm vào giỏ hàng"}
                      disabled={isLoadingCart || isLoadingUpdateCart}
                    ></ButtonForm>
                    <ButtonForm
                      className="!w-fit !bg-red-500 "
                      label={"Mua ngay"}
                      disabled={isLoadingCart || isLoadingUpdateCart}
                      onClick={() => handlePay(productDetail)}
                    ></ButtonForm>
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
      <ProductDetailEvaluate item={productDetail}></ProductDetailEvaluate>

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

export default ProductDetailPage;
