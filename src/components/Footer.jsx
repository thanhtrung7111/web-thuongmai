import React from "react";
import JCBcard from "../assets/img/jcbcard.png";
import MasterCard from "../assets/img/mastercard.png";
import RupayCard from "../assets/img/rupaycard.png";
import Facebook from "../assets/img/facebook.png";
import Gmail from "../assets/img/gmailicon.png";
import WhatApp from "../assets/img/whatapp.png";
import QrCode from "../assets/img/qr-code.png";
import Android from "../assets/img/android.png";
import Apple from "../assets/img/appple.png";
const Footer = () => {
  return (
    <div>
      <div className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl py-10">
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-5 md:grid-cols-4">
            <div>
              {/* CHĂM SÓC KHÁCH HÀNG  */}
              <h4 className="font-semibold text-base text-slate-600 mb-1">
                Chăm sóc khách hàng
              </h4>
              <ul className="flex flex-col gap-y-0">
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Thanh toán
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Trả hàng và hoàn tiền
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Chăm sóc khách hàng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Chính sách bảo hành
                  </a>
                </li>
              </ul>
            </div>
            <div>
              {/* CHĂM SÓC KHÁCH HÀNG  */}
              <h4 className="font-semibold text-base text-slate-600 mb-1">
                Về FirstEMS
              </h4>
              <ul className="flex flex-col gap-y-0">
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Giới thiệu về FirstEMS
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Điều khoản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Chương trình khuyến mãi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-light text-xs hover:text-second transition-all duration-200"
                  >
                    Liên hệ với truyền thông
                  </a>
                </li>
              </ul>
            </div>
            <div>
              {/* CHĂM SÓC KHÁCH HÀNG  */}
              <h4 className="font-semibold text-base text-slate-600 mb-1">
                Thanh toán
              </h4>
              <div className="flex gap-x-3 flex-wrap">
                <a href="#">
                  <img src={JCBcard} alt="" className="w-16" />
                </a>
                <a href="#">
                  <img src={MasterCard} alt="" className="w-16" />
                </a>
                <a href="#">
                  <img src={RupayCard} alt="" className="w-16" />
                </a>
              </div>
            </div>
            <div>
              {/* CHĂM SÓC KHÁCH HÀNG  */}
              <h4 className="font-semibold text-base text-slate-600 mb-1">
                Liên hệ
              </h4>
              <div className="flex gap-x-3 flex-wrap flex-col gap-y-3">
                <a
                  href="#"
                  className="text-xs text-gray-light flex items-center gap-x-2"
                >
                  <img src={Facebook} alt="" className="w-5" />{" "}
                  <span>Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-xs text-gray-light flex items-center gap-x-2"
                >
                  <img src={Gmail} alt="" className="w-5" />
                  Gmail
                </a>
                <a
                  href="#"
                  className="text-xs text-gray-light flex items-center gap-x-2"
                >
                  <img src={WhatApp} alt="" className="w-5" />
                  09091887555
                </a>
              </div>
            </div>
            <div>
              {/* CHĂM SÓC KHÁCH HÀNG  */}
              <h4 className="font-semibold text-base text-slate-600 mb-1">
                Tải ứng dụng
              </h4>
              <div className="flex items-center justify-center">
                <img src={QrCode} alt="" className="w-28" />
                <div className="w-full flex flex-col gap-y-2">
                  <button className="flex text-gray-light border  px-3 py-2 rounded-md w-full items-center justify-center text-sm">
                    <img src={Android} alt="" className="w-5" />
                    Android
                  </button>
                  <button className="flex text-gray-light border  px-3 py-2 rounded-md w-full items-center justify-center text-sm">
                    <img src={Apple} alt="" className="w-5" />
                    Apple
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5 className="block text-center py-3 text-sm bg-gray-200 text-gray-400">
          Sản phẩm được phát triển bởi FirstEMS - 2024
          <i class="ri-copyright-line"></i>
        </h5>
      </div>
    </div>
  );
};

export default Footer;
