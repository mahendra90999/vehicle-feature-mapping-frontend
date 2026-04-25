import React, { useState } from 'react';
import API from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehicleAdd = () => {

  const [formData, setFormData] = useState({
    company_name: "",
    vehicle_name: "",
    variant: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post("/vehicles/add", formData);

      console.log("vehicle saved", response.data);

      setMessage("Vehicle added successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 5000);

      // clear form after success
      setFormData({
        company_name: "",
        vehicle_name: "",
        variant: ""
      });

    } catch (error) {

      console.error("error saving vehicles", error);

      setMessage("Error saving vehicle");
      setMessageType("danger");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="container mt-5">

      {/* Page Title */}
      <h2 className="text-primary fw-bold mb-4">🚗 Add Vehicle</h2>

      {/* Form Card */}
      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">Company Name</label>
                <input
                  name="company_name"
                  type="text"
                  className="form-control"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Vehicle Name</label>
                <input
                  name="vehicle_name"
                  type="text"
                  className="form-control"
                  value={formData.vehicle_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Variant Name</label>
                <input
                  name="variant"
                  type="text"
                  className="form-control"
                  value={formData.variant}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Add Vehicle
              </button>
            </div>

          </form>

          {/* Message Alert */}
          {message && (
            <div className={`alert alert-${messageType} mt-3`} role="alert">
              {message}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default VehicleAdd;