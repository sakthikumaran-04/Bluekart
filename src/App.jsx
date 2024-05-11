import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Allproducts from "./pages/Allproducts/Allproducts.jsx";
import Singleproduct from "./pages/Singleproduct/Singleproduct.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import SearchResults from "./pages/searchResults/SearchResults.jsx";
import Cart from "./pages/CartPage/Cart.jsx";
import Like from "./pages/LikePage/Like.jsx";
import AuthForm from "./pages/AuthForm/AuthForm.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore.js";
import { useCartStore } from "./store/CartStore.js";
import { useLikeStore } from "./store/LikeStore.js";
import Verify from "./pages/VerifyPage/Verify.jsx";
function App() {
  const auth=useAuthStore((state)=>state.auth);
  const cart = useCartStore((state)=>state.cart);
  const like = useLikeStore((state)=>state.like);
  const updateCart = useCartStore((state)=>state.updateCart);
  const updateLike = useLikeStore((state)=>state.updateLike);
  const authInit = useAuthStore((state)=>state.init);
  const cartInit = useCartStore((state)=>state.init);
  const likeInit = useLikeStore((state)=>state.init);
  useEffect(()=>{
    authInit();
  },[])
  useEffect(()=>{
    if(auth) {
      cartInit(auth.email);
      likeInit(auth.email);
    };
  },[auth])
  useEffect(()=>{
    if (auth){ 
      updateCart(auth.id);
    }
  },[cart])
  useEffect(()=>{
    if(auth){
      updateLike(auth.id);
    }
  },[like])
  return (
    <HashRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggablePercent={20}
        draggable
        pauseOnHover
      />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="allproducts/product/:id" element={<Singleproduct />} />
        <Route path="/search/:search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Like />} />
        <Route path="/auth/verify" element={<Verify />}/>
        <Route path="/signin" element={<AuthForm type={"sign in"} />} />
        <Route path="/signup" element={<AuthForm type={"sign up"}/>} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
