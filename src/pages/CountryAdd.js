import React, { useState } from 'react';
import API from '../api';
  
  const CountryAdd = () =>  {
	
  const [formData, setFormData] = useState({
    countryName: "",
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

      const response = await API.post("/countries/add", formData);

      console.log("country saved", response.data);

      setMessage("country added successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 5000);

      // clear form after success
      setFormData({
        countryName: "",
        description: "",
        category: ""
      });

    } catch (error) {

      console.error("error saving country", error);

      setMessage("Error saving country");
      setMessageType("danger");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

	 return (
    <div className="container mt-5">

      {/* Page Title */}
      <h2 className="text-primary fw-bold mb-4">🚗 Add country</h2>

      {/* Form Card */}
      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">country name</label>
                <input
                  name="countryName"
                  type="text"
                  className="form-control"
                  value={formData.countryName}
                  onChange={handleChange}
                />
              </div>


            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Add country
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
  
  export default CountryAdd;
  