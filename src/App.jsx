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
import PersonalInfomation from "./pages/PersonalInfomation";
import DetailOrder from "./components/personalInfomation/DetailOrder";
import Promotion from "./pages/Promotion";
import AppNotifycation from "./components/AppNotification/AppNotifycation";
import ErrorServer from "./pages/ErrorServer";
import PaymentSuccess from "./pages/PaymentSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaySuccessVietQR } from "./pages/PaySuccessVietQR";
import ProductSearch from "./pages/ProductSearch";
import EvaluateProduct from "./components/evaluateProduct/EvaluateProduct";
import AppLayout from "./routes/AppLayout";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import PayDetail from "./pages/PayDetail";
import AppLogin from "./routes/AppLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { api } from "./api/api";

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState({
    data: sessionStorage.getItem("tokenInitial")
      ? sessionStorage.getItem("tokenInitial")
      : null,
    isLoading: sessionStorage.getItem("tokenInitial") ? false : true,
  });
  const { currentUser } = useSelector((state) => state.user);
  const {
    showManify,
    showEvaluateProduct,
    showDetailOrder,
    showAppNotify,
    block,
  } = useSelector((state) => state.popup);
  useEffect(() => {
    if (
      showEvaluateProduct.open ||
      showManify ||
      showDetailOrder.open ||
      showAppNotify.open ||
      block
    ) {
      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflowY = "scroll";
    }
  }, [
    showEvaluateProduct.open,
    showManify,
    showDetailOrder.open,
    showAppNotify.open,
    block,
  ]);

  useEffect(() => {
    const fetchToken = async () => {
      await api
        .post(
          "https://Api-Dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS001",
          {
            COMPCODE: "PMC",
            APP_CODE: "AER",
            SYSTCODE: 4,
          }
        )
        .then((res) => {
          // console.log("hello");
          if (res.data?.RETNCODE == false) {
            return;
          }
          setToken({ data: res?.data?.RETNDATA?.TOKEN, isLoading: false });
          sessionStorage.setItem("tokenInitial", res?.data?.RETNDATA?.TOKEN);
        })
        .catch((e) => console.log(e));
    };
    if (token.data == null) {
      fetchToken();
    }
  }, [token.data]);

  return token.isLoading ? (
    <div className="h-screen w-screen flex items-center justify-center gap-x-5">
      <div role="status">
        <svg
          aria-hidden="true"
          class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
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
      </div>{" "}
      <p className="text-2xl text-gray-700 font-semibold">
        Đang tải dữ liệu...
      </p>
    </div>
  ) : (
    <div>
      <ToastContainer></ToastContainer>
      {/* <BrowserRouter basename={import.meta.env.BASE_URL}> */}
      <BrowserRouter>
        <DetailOrder></DetailOrder>
        <EvaluateProduct></EvaluateProduct>
        <AppNotifycation></AppNotifycation>
        <Routes>
          <Route element={<AppLayout></AppLayout>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/products/:id"
              element={<ProductDetail></ProductDetail>}
            ></Route>
            <Route
              path="/products/search"
              element={<ProductSearch></ProductSearch>}
            ></Route>
            <Route
              path="/products"
              element={<ProductList></ProductList>}
            ></Route>
            <Route
              path="/pay"
              element={
                currentUser ? (
                  <PayDetail></PayDetail>
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
                  <PersonalInfomation></PersonalInfomation>
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
                <Login></Login>
              }
            ></Route>
            <Route
              path="/register"
              element={
                // currentUser ? <Navigate to={"/"} /> :
                <Register></Register>
              }
            ></Route>
          </Route>

          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="/error" element={<ErrorServer></ErrorServer>}></Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
