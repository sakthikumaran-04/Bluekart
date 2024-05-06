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

function App() {
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
        <Route path="/signin" element={<AuthForm type={"sign in"} />} />
        <Route path="/signup" element={<AuthForm type={"sign up"}/>} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
