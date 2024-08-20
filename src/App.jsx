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
    <div>Dang khoi tao trang web</div>
  ) : (
    <div>
      <ToastContainer></ToastContainer>
      {/* <BrowserRouter basename={import.meta.env.BASE_URL}> */}
      <HashRouter>
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
      </HashRouter>
    </div>
  );
}

export default App;
