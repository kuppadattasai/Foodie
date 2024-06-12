import React from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogout,
  logoutHandler,
}) => {
  const firmName = localStorage.getItem("firmName");
  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className="firmName">
        {firmName ? (
          <>
            <h4>Firmname : {firmName}</h4>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="userAuth">
        {!showLogout ? (
          <>
            <span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logoutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
