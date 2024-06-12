import React, { useState, useEffect } from "react";
import { API_PATH } from "../helpers/ApiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_PATH}product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
      console.log(newProductData);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    }
  };
  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById = async (prodcutId) => {
    try {
      const response = await fetch(`${API_PATH}product/${prodcutId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== prodcutId));
        confirm("Are you sure, you want to delete");
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete");
    }
  };

  return (
    <div>
      {!products ? (
        <p> No products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.image && (
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={`${API_PATH}uploads/${item.image}`}
                          alt={item.productName}
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => deleteProductById(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
