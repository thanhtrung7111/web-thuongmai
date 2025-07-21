import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Test from "./pages/Test";
import Promotion from "./pages/Promotion";
import ErrorServer from "./pages/error/ErrorServer";
import PaymentSuccess from "./pages/PaymentSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaySuccessVietQR } from "./pages/PaySuccessVietQR";
import AppLayout from "./routes/AppLayout";
import Footer from "./components/Footer";
import AppLogin from "./routes/AppLogin";
import { useFetchInitialTokenQuery } from "./redux/query/authQuery";
import SpinnerLoading from "./components/commonAnimtaion/SpinnerLoading";
import HomePage from "./pages/home/HomePage";
import ProductDetailPage from "./pages/product_detail/ProductDetailPage";
import ProductListPage from "./pages/product_list/ProductListPage";
import ShoppingCartPage from "./pages/shopping_cart/ShoppingCartPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProductSearchPage from "./pages/product_search/ProductSearchPage";
import PersonalInfomationPage from "./pages/personal_infomation/PersonalInfomationPage";
import PaymentPage from "./pages/payment/PaymentPage";
import LookupOrder from "./pages/lookup_orders/LookupOrder";

function App() {
  const [count, setCount] = useState(0);
  const {
    data: token,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useFetchInitialTokenQuery();
  const { currentUser } = useSelector((state) => state.user);
  const { popup } = useSelector((state) => state.popup);
  const { errorServer } = useSelector((state) => state.exception);
  useEffect(() => {
    if (popup) {
      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflowY = "scroll";
    }
  }, [popup]);

  useEffect(() => {
    if (token?.ERROCODE == 21 || token?.RETNCODE == false) {
      refetch();
    }
  }, [token]);
  console.log(token);
  return isFetching ? (
    <div>
      <div className="h-screen w-screen flex items-center justify-center gap-x-5">
        <SpinnerLoading
          width={10}
          height={10}
          color="fill-second"
        ></SpinnerLoading>
        <p className="text-2xl text-gray-700 font-semibold">
          Đang tải dữ liệu...
        </p>
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer></ToastContainer>
      {/* <BrowserRouter basename={import.meta.env.BASE_URL}> */}
      <HashRouter>
        {/* <DetailOrder></DetailOrder> */}
        {/* <AppNotifycation></AppNotifycation> */}
        <Routes>
          <Route
            element={
              errorServer.isError ? (
                <Navigate to={"/error"}></Navigate>
              ) : (
                <AppLayout></AppLayout>
              )
            }
          >
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/product/:id"
              element={<ProductDetailPage></ProductDetailPage>}
            ></Route>
            <Route
              path="/orders/lookup"
              element={<LookupOrder></LookupOrder>}
            ></Route>
            <Route
              path="/products/search"
              element={<ProductSearchPage></ProductSearchPage>}
            ></Route>
            <Route
              path="/products"
              element={<ProductListPage></ProductListPage>}
            ></Route>
            <Route
              path="/cart"
              element={
                currentUser ? (
                  <ShoppingCartPage></ShoppingCartPage>
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            ></Route>
            <Route
              path="/pay"
              element={
                currentUser ? (
                  <PaymentPage></PaymentPage>
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            ></Route>
            <Route
              path="/pay-success"
              element={
                currentUser ? (
                  <PaymentSuccess></PaymentSuccess>
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            ></Route>
            <Route
              path="/personal"
              element={
                currentUser ? (
                  <PersonalInfomationPage></PersonalInfomationPage>
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            ></Route>
            <Route path="/promotion" element={<Promotion></Promotion>}></Route>
            <Route
              path="/status_payvietQR"
              element={
                currentUser ? (
                  <PaySuccessVietQR></PaySuccessVietQR>
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            ></Route>

            {/* <Route path="/*" element={<Navigate to="/" />}></Route> */}
          </Route>
          <Route element={<AppLogin></AppLogin>}>
            <Route
              path="/login"
              element={
                // currentUser ? <Navigate to={"/"} /> :
                <LoginPage></LoginPage>
              }
            ></Route>
            <Route
              path="/register"
              element={
                // currentUser ? <Navigate to={"/"} /> :
                <RegisterPage></RegisterPage>
              }
            ></Route>
          </Route>

          <Route path="/test" element={<Test></Test>}></Route>
          <Route
            path="/error"
            element={
              errorServer?.isError ? (
                <ErrorServer></ErrorServer>
              ) : (
                <Navigate to={"/"}></Navigate>
              )
            }
          ></Route>
          <Route
            path="/pay-success"
            element={<PaymentSuccess></PaymentSuccess>}
          ></Route>
        </Routes>

        <Footer></Footer>
      </HashRouter>
    </div>
  );
}

export default App;
