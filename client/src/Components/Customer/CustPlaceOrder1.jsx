import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, resetPassword, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";

function CustPlaceOrder1() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [data, setData] = useState({
    shopId: id,
    custId: localStorage.getItem("customer"),
    totalAmount: 0,
  });

  const [service, setService] = useState([]);
  const [singleservice, setSingleService] = useState({ amount: 0 });
  const [amount, setAmount] = useState(0);

  const [material, setMaterial] = useState([]);
  const [rows, setRows] = useState([{ material: "", count: 1, matamount: 0 }]);
  const [errors, setErrors] = useState({});
  const fetchServiceDatabyId = async (id) => {
    try {
      const result = await ViewById("viewServiceByName", id);

      if (result.success) {
        console.log(result.user);

        setSingleService(result?.user);
        setAmount(result?.user?.amount);
      } else {
      }
    } catch (error) {
      // toast.error("An unexpected error occurred during Data View");
    }
  };
  // const fetchMaterialDatabyId = async (id) => {
  //     try {
  //         const result = await ViewById("viewMaterialByName", id);
  //         console.log("iiid", id);

  //         if (result.success) {
  //             console.log(result.user);

  //             setSingleMat(result.user);
  //             setMatAmount(result.user.amount)

  //             setAmount((prevAmount) => prevAmount + result.user.amount);
  //         } else {

  //         }
  //     } catch (error) {
  //         toast.error("An unexpected error occurred during Data View");
  //     }
  // };

  const fetchMaterialDatabyId = async (id, index) => {
    try {
      const result = await ViewById("viewMaterialByName", id);
      if (result.success) {
        const updatedRows = [...rows];
        updatedRows[index].matamount = result.user.amount; // Update material amount for the row
        updatedRows[index].material = id; // Ensure material ID is updated
        setRows(updatedRows);
      } else {
        toast.error("Failed to fetch material data.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during Data View");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "service") {
      fetchServiceDatabyId(value);

      console.log(amount);
    }

    setData({
      ...data,
      [name]: value,
    });
  };
  const fetchData = async () => {
    try {
      const result = await ViewById("viewAllServiceByShopId", id);
      if (result.success) {
        setService(result.user || []);
      } else {
      }
    } catch (error) {
      console.error("[ERROR]: viewAllServiceByShopId", error)
      // toast.error("An unexpected error occurred during Data View");
    }
  };

  const fetchData2 = async () => {
    try {
      const result = await ViewById("viewAllMaterialByShopId", id);
      if (result.success) {
        console.log('user =>> ', result.user)
        setMaterial(result.user || []);
      } else {
      }
    } catch (error) {
      console.error("[ERROR]: viewAllMaterialByShopId", error)
      // toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
      fetchData2();
    }
  }, [id]);
  const fetchOrderData = async () => {
    try {
      const result = await ViewById(
        "viewOrderById",
        localStorage.getItem("order")
      );
      if (result.success) {
        setAmount(result.user.totalAmount);
      } else {
      }
    } catch (error) {
      // toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [localStorage.getItem("order")]);
  const validate = () => {
    const newErrors = {};

    if (!data.service) {
      newErrors.service = "Service is required";
    }
    rows.forEach((row, index) => {
      if (!row.material) {
        newErrors[`material_${index}`] = `Material is required for row ${
          index + 1
        }`;
      }
      if (!row.count || row.count <= 0) {
        newErrors[`count_${index}`] = `Count must be greater than 0 for row ${
          index + 1
        }`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRow = () => {
    setRows([...rows, { material: "", count: 0 }]);
  };

  const handleMaterialChange = (index, value) => {
    fetchMaterialDatabyId(value, index);
  };

  const addMore = async () => {
    console.log(data);
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }
    data.totalAmount = amount;

    console.log(localStorage.getItem("order"));

    try {
      if (localStorage.getItem("order")) {
        const result = await resetPassword(
          data,
          "editOrderById",
          localStorage.getItem("order")
        );

        if (result.success) {
          console.log("singleservice._id", rows);

          console.log(result);
          toast.success("Added successfully !");
          const result2 = await register(
            {
              materials: rows,
              custId: localStorage.getItem("customer"),
              shopId: id,
              serviceId: singleservice._id,
              orderId: localStorage.getItem("order"),
            },
            "addServiceOrder"
          );

          if (result2.success) {
            console.log(result2);
          }

          window.location.reload(true);
        } else {
          console.error("Error Occured:", result);
          toast.error(result.message);
        }
      } else {
        const result = await register(data, "addOrder");

        if (result.success) {
          console.log(result);
          toast.success("Added successfully !");
          localStorage.setItem("order", result.user._id);

          const result2 = await register(
            {
              materials: rows,
              custId: localStorage.getItem("customer"),
              shopId: id,
              serviceId: singleservice._id,
              orderId: localStorage.getItem("order"),
            },
            "addServiceOrder"
          );

          if (result2.success) {
            console.log(result2);
          }
          window.location.reload(true);
        } else {
          console.error("Error Occured:", result);
          toast.error(result.message);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }

    console.log(rows);
  };
  //     useEffect(() => {
  //         // Calculate the total amount whenever rows or matamount or singleservice.amount changes
  //         const totalAmount = rows.reduce(
  //             (sum, row) => sum + matamount * row.count,
  //             singleservice.amount
  //         );
  // console.log("singleservice.amount",singleservice.amount)
  // console.log("amount",amount);
  // ;

  //         setAmount(totalAmount);
  //     }, [rows, matamount, singleservice.amount]);
  const incrementCount = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].count += 1;
    setRows(updatedRows);
  };

  const decrementCount = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].count = Math.max(0, updatedRows[index].count - 1);
    setRows(updatedRows);
  };

  useEffect(() => {
    const totalAmount = rows.reduce(
      (sum, row) => sum + row.matamount * row.count,
      singleservice.amount // Add base service amount
    );
    setAmount(totalAmount);
  }, [rows, singleservice.amount]);

  const onCountChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; // Ensure numeric input
    const updatedRows = [...rows];
    updatedRows[index].count = parseInt(value, 10) || 0;
    setRows(updatedRows);
  };

  const next =async () => {
    await addMore()
    let orderId = localStorage.getItem("order");
    Navigate(`/order-address/${orderId}`);
    localStorage.removeItem("order");
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <div className="cust-view-shop-main">
            <p className="cust-choose-shop">Place Order</p>
          </div>

          {/* Circle Progress */}
          <div className="circle-container">
            <div className="colored-circle">
              <p className="circle-text">1</p>
            </div>
            <div className="circle-line"></div>
            <div className="uncolored-circle">
              <p className="circle-text">2</p>
            </div>
            <div className="circle-line"></div>
            <div className="uncolored-circle">
              <p className="circle-text">3</p>
            </div>
            <div className="circle-line"></div>
            <div className="uncolored-circle">
              <p className="circle-text">4</p>
            </div>
          </div>

          <div className="order-service-container mt-5">
            <p className="order-service-title">SERVICE DETAILS</p>
            <p className="cust-order-amount">Total Amount : {amount}</p>
            <hr className="cust-order-hr" />

            {/* Static Row */}
            <div className="row order-input-container">
              <div className="col-lg-3">
                <label className="cust-login-label mb-3">Services</label>
                <select
                  className="form-control order-align-text"
                  value={data.service}
                  name="service"
                  onChange={handleChange}
                >
                  <option value="">Choose a service</option>
                  {service.map((x) => (
                    <option value={x.id} key={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="text-danger">{errors.service}</span>
                )}
              </div>

              <div className="col-lg-3">
                <label className="cust-login-label mb-3">Material Type</label>
                <select
                  className="form-control p-2 order-align-text"
                  value={rows[0]?.material || ""}
                  name="material"
                  onChange={(e) => handleMaterialChange(0, e.target.value)}
                >
                  <option value="">Choose a Material</option>
                  {material.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                {errors.material && (
                  <span className="text-danger">{errors.material}</span>
                )}
              </div>

              <div className="col-lg-4">
                <div className="row mt-2">
                  <label className="cust-login-label mb-3">
                    Material Count
                  </label>
                  <div
                    className="col order-align-icon p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => decrementCount(0)}
                  >
                    <FaLessThan />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control order-align-text p-2"
                      value={rows[0]?.count || 0}
                      // readOnly
                      name="count"
                      onChange={(e) => onCountChange(e, 0)}
                    />
                  </div>
                  <div
                    className="col order-align-icon p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => incrementCount(0)}
                  >
                    <FaGreaterThan />
                  </div>
                </div>
              </div>

              <div className="col-md-1 mt-4">
                <button
                  className="order-align-text order-align-btn"
                  onClick={handleAddRow}
                >
                  <FaPlusCircle className="plus-icon" />
                </button>
              </div>
            </div>

            {/* Dynamic Rows */}
            {rows.slice(1).map((row, index) => (
              <div className="cust-order-dynamic-container">
                {" "}
                <div className="row order-input-container mt-3" key={index + 1}>
                  <div className="col-lg-3">
                    <label className="cust-login-label mb-3">
                      Material Type
                    </label>
                    <select
                      className="form-control p-2 order-align-text"
                      value={row.material}
                      onChange={(e) =>
                        handleMaterialChange(index + 1, e.target.value)
                      }
                    >
                      <option value="">Choose a Material</option>
                      {material.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-lg-4">
                    <div className="row mt-2">
                      <label className="cust-login-label mb-3">
                        Material Count
                      </label>
                      <div
                        className="col order-align-icon p-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => decrementCount(index + 1)}
                      >
                        <FaLessThan />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control order-align-text p-2"
                          value={row.count}
                          readOnly
                        />
                      </div>
                      <div
                        className="col order-align-icon p-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => incrementCount(index + 1)}
                      >
                        <FaGreaterThan />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <hr className="cust-order-hr mt-5" />
            <center>
              <button className="cust-orderbtn" onClick={addMore}>
                Add More
              </button>
            </center>
          </div>
          <center>
            <button className="shop-signup-button mt-3" onClick={next}>
              Next
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default CustPlaceOrder1;
