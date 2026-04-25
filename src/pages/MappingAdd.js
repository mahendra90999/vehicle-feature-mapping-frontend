import React, { useState } from 'react';
import API from '../api';
  
  const MappingAdd = () =>  {
    
  const [formData, setFormData] = useState({
    feature_id: "",
    vehicle_id: "",
    country_id: "",
    status:""
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

      const response = await API.post("/mappings/add", formData);

      console.log("Mapping saved", response.data);

      setMessage("Mapping added successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 5000);

      // clear form after success
      setFormData({
        feature_name: "",
        description: "",
        category: ""
      });

    } catch (error) {

      console.error("error saving mapping", error);

      setMessage(error.response?.data?.message || "Error saving mapping");
      setMessageType("danger");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

	 return (
    <div className="container mt-5">

      {/* Page Title */}
      <h2 className="text-primary fw-bold mb-4">🚗 Add Mapping</h2>

      {/* Form Card */}
      <div className="card shadow-sm col-5">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              <div className="col-md-10">
                <label className="form-label">feature Id</label>
                <input
                  name="feature_id"
                  type="text"
                  className="form-control"
                  value={formData.feature_id}
                  onChange={handleChange}
                />
              </div>
            </div>  
              <div className="col-md-10">
                <label className="form-label">vehicle_id</label>
                <input
                  name="vehicle_id"
                  type="text"
                  className="form-control"
                  value={formData.vehicle_id}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-10">
                <label className="form-label">country_id</label>
                <input
                  name="country_id"
                  type="text"
                  className="form-control"
                  value={formData.country_id}
                  onChange={handleChange}
                />

                <div className="col-md-8">
                <label className="form-label">Status</label>
                <input
                  name="status"
                  type="text"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                />
                </div>
              </div>

            {/* </div> */}

            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Add status
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
  }
  
  export default MappingAdd;
  