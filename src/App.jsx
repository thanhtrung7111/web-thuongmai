import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Footer from "@components/Footer";
import ProductDetail from "@pages/ProductDetail";
import ProductList from "@pages/ProductList";
import Login from "@pages/Login";
import PayDetail from "@pages/PayDetail";
import { useSelector } from "react-redux";
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

function App() {
  const [count, setCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const { showManify, showEvaluateProduct, showDetailOrder, showAppNotify } =
    useSelector((state) => state.popup);
  useEffect(() => {
    if (
      showEvaluateProduct.open ||
      showManify ||
      showDetailOrder.open ||
      showAppNotify.open
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
  ]);
  return (
    <div className={`font-sans`}>
      <BrowserRouter>
        <DetailOrder></DetailOrder>
        <EvaluateProduct></EvaluateProduct>
        <AppNotifycation></AppNotifycation>
        <Routes>
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
          <Route element={<AppLayout></AppLayout>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/products/:id"
              element={<ProductDetail></ProductDetail>}
            ></Route>
            <Route
              path="/products"
              element={<ProductList></ProductList>}
            ></Route>
            <Route path="/pay" element={<PayDetail></PayDetail>}></Route>
            <Route
              path="/personal"
              element={<PersonalInfomation></PersonalInfomation>}
            ></Route>
            <Route path="/promotion" element={<Promotion></Promotion>}></Route>
            {/* <Route path="/*" element={<Navigate to="/" />}></Route> */}
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
