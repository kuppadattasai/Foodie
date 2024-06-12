import React, { useState } from "react";
import { API_PATH } from "../../helpers/ApiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCateogryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.log("User not authenticated");
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);

      category.forEach((value) => {
        formData.append("category", value);
      });

      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`${API_PATH}firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm added Successfully");
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm exists . Only one firm is allowed");
      } else {
        alert("Failed to add firm");
      }
      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);
    } catch (error) {
      console.log(error);
      alert("Failed to add Firm");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h2>Add Firm</h2>
        <label>Firm Name</label>
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />
        <label>Firm Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        {/* <label>Category</label>
        <input type="text" /> */}
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                onChange={handleCateogryChange}
                value="veg"
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                onChange={handleCateogryChange}
                value="non-veg"
              />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>South-Indian</label>
              <input
                type="checkbox"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
                value="south-indian"
              />
            </div>
            <div className="checkboxContainer">
              <label>North-Indian</label>
              <input
                type="checkbox"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
                value="north-indian"
              />
            </div>
            <div className="checkboxContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
                value="chinese"
              />
            </div>
            <div className="checkboxContainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
                value="bakery"
              />
            </div>
          </div>
        </div>

        {/* <label>Region</label>
        <input type="text" /> */}

        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
