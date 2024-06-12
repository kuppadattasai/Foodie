import React from "react";

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  setshowFirmTitle,
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {setshowFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ""}

        <li onClick={showProductHandler}>Add Prduct</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
