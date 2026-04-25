import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../home.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  const [FeatureName,setFeatureName] = useState("");
  const [VehicleName,setVehicleName] = useState("");
  const [CountryName,setCountryName] = useState("");
  const [data,setData] = useState([]);
  const [page,setPage] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  const [loading,setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const size = 5;



  const fetchData = async () => {
  setloading(true);

  try {
    const response = await API.post(
      `/mappings?page=${page}&size=${size}&sortBy=vehicle&direction=asc`,
      {
        vehicle_name: VehicleName,
        feature_name: FeatureName,
        country_name: CountryName,
      }
    );

    // console.log(response.data);

    const pageData = response.data.data;

    setData(pageData.content);
    setTotalPages(pageData.totalPages);

  } catch (error) {
    if (error.response?.status === 401) {
      alert("session expired, please login again..");
      localStorage.removeItem("accessToken");
      navigate("/login");
    }else if(error.response?.data?.message){
      setData([]);
      setErrorMessage(error.response.data.message);
    }else {
      alert("error fetching data");
    }
  } finally {
    setloading(false);
  }
};

  useEffect(() => {
  fetchData();
}, [page]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">🚗 Car Information Dashboard</h2>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Search Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={VehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Feature Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={FeatureName}
                  onChange={(e) => setFeatureName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Country Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={CountryName}
                  onChange={(e) => setCountryName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table / Error Messages */}
      <div className="card shadow-sm">
        <div className="card-body">
          {data.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Vehicle</th>
                    <th>Feature</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.vehicle_name}</td>
                      <td>{item.feature_name}</td>
                      <td>{item.country_name}</td>
                      <td>
                        <span className={`badge ${
                          item.status === "Applicable"
                            ? "bg-success"
                            : item.status === "Not Applicable"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : errorMessage ? (
            <div className="alert alert-warning">{errorMessage}</div>
          ) : (
            <div className="alert alert-info">No data found.</div>
          )}

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={page === 0}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>

            <span className="fw-semibold">
              Page {page + 1} of {totalPages}
            </span>

            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};


export default Home;
