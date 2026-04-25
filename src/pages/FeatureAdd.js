import React, { useState } from 'react';
import API from '../api';
  
  const FeatureAdd = () =>  {
    
  const [formData, setFormData] = useState({
    feature_name: "",
    description: "",
    category: ""
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

      const response = await API.post("/features/add", formData);

      console.log("feature saved", response.data);

      setMessage("feature added successfully");
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

      console.error("error saving feature", error);

      setMessage("Error saving feature");
      setMessageType("danger");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

	 return (
    <div className="container mt-5">

      {/* Page Title */}
      <h2 className="text-primary fw-bold mb-4">🚗 Add Feature</h2>

      {/* Form Card */}
      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">feature name</label>
                <input
                  name="feature_name"
                  type="text"
                  className="form-control"
                  value={formData.feature_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">description</label>
                <input
                  name="description"
                  type="text"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">category</label>
                <input
                  name="category"
                  type="text"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Add Feature
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
  
  export default FeatureAdd;
  