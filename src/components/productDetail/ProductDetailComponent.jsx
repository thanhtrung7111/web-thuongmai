import React, { useEffect, useState } from "react";
import Wrapper from "@components/Wrapper";
import Asus from "@assets/img/asus.jpg";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Avatar from "@assets/img/avatar.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { products, tagsColor, tagsRam, tagsReview } from "../../data";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductSlider from "@components/ProductSlider";
import TagList from "@components/TagList";
import CommentCard from "@components/CommentCard";
import InfoPage from "@components/InfoPage";
import ReactImageMagnify from "react-image-magnify";
import ImageMagnifier from "@components/ImageMagnifier";
import { useDispatch, useSelector } from "react-redux";
import Panigation from "@components/panigation/Panigation";
import {
  openEvaluateProduct,
  openManify,
} from "../../redux/reducer/popupReducer";
import LoadingView from "../../pages/LoadingView";
import ImageFetch from "../ImageFetch";
import { fetchImage } from "../../helper/ImageHelper";
import { addToCart, updateAmountProduct } from "../../redux/actions/cartAction";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
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
const productDetailDemo = {
  ACCERGHT: 79,
  COMPCODE: "JYJ",
  PRDCNAME: "BASE 2020 (1.06 m x 15.6 m) - 3804-6",
  DDDD: "appPrdcDetl",
  DESCBRIF: "",
  DESCFULL: "quy cách 1.06 m x 15.6 m",
  DETAIL_1: [
    {
      COMPCODE: "JYJ",
      PRDCCODE: "000000037",
      PYMNMEAN: "Tiền mặt hoặc chuyển khoản",
      DLVRMEAN: "Tùy chọn",
      KKKK0001: "JYJ0000000371",
    },
  ],
  DETAIL_2: [
    {
      COMPCODE: "JYJ",
      PRDCCODE: "000008224",
      PRDCRLTN: "",
      PRDCNAME: "V-CONCEPT 2020 (1.06 m x 15.6 m) - 7915-11",
      PRDCDESC: "quy cách 1.06 m x 15.6 m",
      PRDCBRIF: "7915-11",
      PRDCIMGE:
        "Https://Api-Dev.firstems.com/Api/data/runApi_File?run_Code=DTA001&CompCode=JYJ&DcmnCode=Product_New&Key_Code=JYJ000000115001&Key_Load=00062916102320",
      SALEPRCE: 50000000,
      DSCNRATE: "5",
      DSCNAMNT: 50000,
      DSCNPRCE: 500000,
    },
    {
      COMPCODE: "JYJ",
      PRDCCODE: "000008225",
      PRDCRLTN: "",
      PRDCNAME: "V-CONCEPT 2020 (1.06 m x 15.6 m) - 7915-11",
      PRDCDESC: "quy cách 1.06 m x 15.6 m",
      PRDCBRIF: "7915-11",
      PRDCIMGE:
        "Https://Api-Dev.firstems.com/Api/data/runApi_File?run_Code=DTA001&CompCode=JYJ&DcmnCode=Product_New&Key_Code=JYJ000000115001&Key_Load=00062916102320",
      SALEPRCE: 50000000,
      DSCNRATE: "5",
      DSCNAMNT: 50000,
      DSCNPRCE: 500000,
    },
    {
      COMPCODE: "JYJ",
      PRDCCODE: "000008226",
      PRDCRLTN: "",
      PRDCNAME: "V-CONCEPT 2020 (1.06 m x 15.6 m) - 7915-11",
      PRDCDESC: "quy cách 1.06 m x 15.6 m",
      PRDCBRIF: "7915-11",
      PRDCIMGE:
        "Https://Api-Dev.firstems.com/Api/data/runApi_File?run_Code=DTA001&CompCode=JYJ&DcmnCode=Product_New&Key_Code=JYJ000000115001&Key_Load=00062916102320",
      SALEPRCE: 50000000,
      DSCNRATE: 50,
      DSCNAMNT: 50000,
      DSCNPRCE: 500000,
    },
  ],
  DETAIL_3: [
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Thành Trung",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-01-12 9:00",
      PRDCMARK: 5,
      CUSTIDEA: "Sản phẩm tốt",
    },
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Nguyễn Văn a",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-01-12 8:00",
      PRDCMARK: 5,
      CUSTIDEA: "Sản phẩm tệ",
    },
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Nguyễn Văn b",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-01-12 5:00",
      PRDCMARK: 5,
      CUSTIDEA: "Sản phẩm bình thường",
    },
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Nguyễn Văn F",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-01-12 14:00",
      PRDCMARK: 5,
      CUSTIDEA: "Sản phẩm kém chất lượng",
    },
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Nguyễn Văn T",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-01-12 14:00",
      PRDCMARK: 5,
      CUSTIDEA: "Sản phẩm kém",
    },
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Nguyễn Văn D",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-02-12",
      PRDCMARK: 4,
      CUSTIDEA: "Sản phẩm tốt, giao hàng nhanh",
    },
    {
      COMPCODE: "JYJ",
      CUSTNAME: "Nguyễn Văn C",
      CUSTLGIN: "aaaaaa",
      MARKDATE: "2024-01-12",
      PRDCMARK: 4,
      CUSTIDEA: "Sản phẩm tuyệt vời, đúng với mô tả",
    },
  ],
  DETAIL_4: [
    {
      IMGE_URL:
        "Https://Api-Dev.firstems.com/Api/data/runApi_File?run_Code=DTA001&CompCode=JYJ&DcmnCode=Product_New&Key_Code=JYJ000000037002&Key_Load=00062216083120",
      KKKK0004: "JYJ000000037JYJ000000037002",
    },
  ],
  DSCNAMNT: 0,
  DSCNRATE: 5,
  KKKK0000: "JYJ000000037",
  PRCEDSCN: 375250,
  PRCESALE: 395000,
  PRDCCODE: "000000037",
  STTENAME: "",
  STTESIGN: 0,
};
const ProductDetailComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { productDetail, isLoadingProduct } = useSelector(
    (state) => state.product
  );
  const { currentUser } = useSelector((state) => state.user);
  const { productCarts } = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [indexImage, setIndexImage] = useState({ ...images[0] });
  const [mainImage, setMainImage] = useState("");
  const [amountProduct, setAmountProduct] = useState(1);
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

  const addCart = async (prdc) => {
    const productFind = productCarts.find(
      (item) => item.PRDCCODE == product.PRDCCODE
    );
    if (productFind) {
      dispatch(
        updateAmountProduct({
          DCMNCODE: "APPCARTPRDC",
          HEADER: [
            {
              ...productFind,
              QUOMQTTY: amountProduct + productFind.QUOMQTTY,
            },
          ],
        })
      );
    } else {
      console.log(prdc.PRCEDSCN);
      dispatch(
        addToCart({
          COMPCODE: prdc.COMPCODE,
          LCTNCODE: "001",
          USERLOGIN: currentUser?.USERLGIN,
          PRDCCODE: prdc.PRDCCODE,
          QUOMQTTY: amountProduct,
          // QUOMCODE: item["QUOMCODE"],
          SALEPRCE: prdc.PRCESALE,
          DSCNRATE: prdc.DSCNRATE,
          PRDCNAME: prdc.PRDCNAME,
          PRDCIMAGE: prdc.DETAIL_4[0]?.IMGE_URL,
        })
      );
    }
  };

  useEffect(() => {
    setProduct(productDetail);
    console.log(productDetail);
  }, [productDetail]);

  useEffect(() => {
    async function fetchDataImage() {
      const img = await fetchImage(
        product?.DETAIL_4[0]?.IMGE_URL,
        sessionStorage.getItem("tokenUser")
      );
      setMainImage(img);
    }
    fetchDataImage();
    // }
  }, [product]);
  console.log(productDetail);
  const showManify = () => {
    dispatch(openManify());
  };

  useEffect(() => {
    console.log(mainImage);
  }, [mainImage]);

  const showEvaludate = () => {
    dispatch(openEvaluateProduct({ productID: "0000" }));
  };

  return (
    // <ProductDetailSkeleton />
    <div className="product-detail">
      <InfoPage data={["Sản phẩm", product?.PRDCNAME]} />
      <ImageMagnifier image={mainImage}></ImageMagnifier>
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
                  <img
                    src={mainImage}
                    alt=""
                    className="w-full h-full object-contain object-top"
                  />
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
                    <span className="font-bold">Mô tả:</span>:{" "}
                    {product?.DESCFULL}
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
                    {product?.PRDCNAME}
                  </h2>

                  {/* PRICE  */}
                  <div className="flex gap-x-2">
                    <div className="text-second text-3xl font-bold flex justify-start">
                      {product?.PRCEDSCN?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div className="text-gray-light line-through flex justify-start text-lg">
                      {product?.PRCESALE?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div className="text-white bg-second w-fit h-fit px-1 text-sm py-1">
                      Giảm {product?.DSCNRATE}%
                    </div>
                  </div>

                  {/* STAR  */}
                  <div className="flex items-center gap-x-2">
                    <div className="flex items-center gap-x-1">
                      {
                        product?.DETAIL_3?.length > 0
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
                      ({product?.DETAIL_3?.length} đánh giá)
                    </span>
                  </div>

                  <div className="font-medium text-gray-dark text-sm">
                    Đã bán: <span className="font-normal">150 sản phẩm </span>
                  </div>
                </div>

                {/* OPTION  */}
                <div className="border-y py-4 flex flex-col gap-y-5 ">
                  {/* RAM  */}
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

                  {/* MÀU SẮC  */}
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
                </div>

                {/* ACTION  */}
                <div className="flex flex-col gap-y-5">
                  <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-gray-dark text-sm">
                      Số lượng:
                    </span>
                    <div className="flex items-center justify-start gap-x-1">
                      <button
                        onClick={() => {
                          if (amountProduct == 1) {
                            return;
                          }
                          setAmountProduct(amountProduct - 1);
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
                        value={amountProduct}
                        onChange={(e) =>
                          setAmountProduct(Number(e.target.value))
                        }
                        className="w-24 text-center outline-none border h-8"
                      />
                      {/* </div> */}

                      <button
                        onClick={() => setAmountProduct(amountProduct + 1)}
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
                      className="bg-second text-white rounded-md px-3 py-2"
                      onClick={() => addCart(product)}
                    >
                      Thêm vào giỏ
                    </button>
                    <button className="bg-[#f24c4c] text-white rounded-md px-3 py-2">
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
                    <h4 className="text-gray-dark text-xl font-semibold text-lg mb-2">
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
                <button
                  className="text-white bg-first px-3 py-1 text-sm rounded-sm hover:opacity-90"
                  onClick={showEvaludate}
                >
                  Đánh giá
                </button>
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
                    ( {product?.DETAIL_3?.length} Đánh giá )
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
                          (product?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 5
                          ).length /
                            product?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (product?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 5
                            ).length /
                              product?.DETAIL_3?.length) *
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
                          (product?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 4
                          ).length /
                            product?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (product?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 4
                            ).length /
                              product?.DETAIL_3?.length) *
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
                          (product?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 3
                          ).length /
                            product?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (product?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 3
                            ).length /
                              product?.DETAIL_3?.length) *
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
                          (product?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 2
                          ).length /
                            product?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (product?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 2
                            ).length /
                              product?.DETAIL_3?.length) *
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
                          (product?.DETAIL_3?.filter(
                            (item) => item.PRDCMARK == 1
                          ).length /
                            product?.DETAIL_3?.length) *
                            100 >
                          40
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                        style={{
                          width: `${
                            (product?.DETAIL_3?.filter(
                              (item) => item.PRDCMARK == 1
                            ).length /
                              product?.DETAIL_3?.length) *
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
                {product?.DETAIL_3?.length > 0 &&
                  product?.DETAIL_3?.slice(
                    (currentPage - 1) * pageSize,
                    pageSize * (currentPage - 1) + pageSize
                  ).map((item) => {
                    return (
                      <CommentCard
                        name={item.CUSTNAME}
                        amountStar={item.PRDCMARK}
                        timeStamp={item.MARKDATE}
                        content={item.CUSTIDEA}
                      ></CommentCard>
                    );
                  })}
              </div>
              {product?.DETAIL_3?.length > 0 && (
                <Panigation
                  currentPage={currentPage}
                  totalCount={product?.DETAIL_3?.length}
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

      <div className="mx-5 xl:container xl:mx-auto mb-5">
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
              data={product?.DETAIL_2}
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
      </div>
    </div>
  );
};

export default ProductDetailComponent;
