import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Home from "@pages/Home";
import Footer from "@components/Footer";
import ProductDetail from "@pages/ProductDetail";
import ProductList from "@pages/ProductList";
import Login from "@pages/Login";
import PayDetail from "@pages/PayDetail";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "@routes/AppLayout";
import AppLogin from "@routes/AppLogin";
import Register from "@pages/Register";
import Test from "./pages/Test";
import PersonalInfomation from "./pages/PersonalInfomation";
import EvaluateProduct from "@components/evaluateProduct/EvaluateProduct";
import DetailOrder from "./components/personalInfomation/DetailOrder";
import Promotion from "./pages/Promotion";
import AppNotifycation from "./components/AppNotification/AppNotifycation";
import ErrorServer from "./pages/ErrorServer";
import PaymentSuccess from "./pages/PaymentSuccess";
import LoadingView from "./pages/LoadingView";
import { closeBlock } from "./redux/reducer/popupReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaySuccessVietQR } from "./pages/PaySuccessVietQR";
import ProductSearch from "./pages/ProductSearch";

function App() {
  const [count, setCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  return (
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
