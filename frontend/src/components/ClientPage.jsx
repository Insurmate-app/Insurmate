import React from "react";
import NavBar from "./NavBar";

const ClientPage = () => {
  return (
    <>
      <NavBar />

      <div className="d-flex align-items-center p-5 pb-0">
        <h2>Clients</h2>
        <button className="btn btn-success ms-3">
          <i className="bi bi-plus-lg p-1" />
        </button>
      </div>
      <div className="d-flex align-items-center justify-content-between p-5 pt-3">
        <div className="d-flex align-items-center">
          Show
          <select className="form-select form-select-sm mx-2 w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
            <option>75</option>
            <option>100</option>
          </select>
          entries
        </div>
        <div className="d-flex align-items-center">
          Search
          <input type="text" className="form-control mx-2" />
        </div>
      </div>
    </>
  );
};

export default ClientPage;
