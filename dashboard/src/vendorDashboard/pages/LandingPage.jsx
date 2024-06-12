import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import Login from "../Components/forms/Login";
import Register from "../Components/forms/Register";
import AddFirm from "../Components/forms/AddFirm";
import AddProduct from "../Components/forms/AddProduct";
import Welcome from "../Components/Welcome";
import AllProducts from "../Components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setshowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [setshowFirmTitle, setSetshowFirmTitle] = useState(true);

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setSetshowFirmTitle(false);
    }
  }, []);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogout(true);
    }
  }, []);

  const logoutHandler = () => {
    confirm("Are you sure to Logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogout(false);
    setSetshowFirmTitle(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setshowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setshowAllProducts(true);
    } else {
      alert("Please login");
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  const showWelcomeHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setshowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setshowAllProducts(false);
  };

  const showFirmHandler = () => {
    if (showLogout) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setshowAllProducts(false);
    } else {
      alert("Please login");
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  const showProductHandler = () => {
    if (showLogout) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      setShowWelcome(false);
      setshowAllProducts(false);
    } else {
      alert("Please login");
      setShowLogin(true);
      setShowRegister(false);
    }
  };
  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            setshowFirmTitle={setshowFirmTitle}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogout && <AddFirm />}
          {showProduct && showLogout && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout && <AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
