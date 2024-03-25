import React from "react";

import HomeNavbar from "../components/homeNavbar";

function Homepage() {
  return (
    <> 
    <HomeNavbar/>
    <div className="main">
      <header className="container my-1 text-white rounded-3">
        <h1 className="display-5 fw-bold">Welcome to MediTrack</h1>
        <p className="col-md-8 lead">MediTrack is a patient management system that allows you to create, view, and search for patients.</p>
        <button className="btn btn-primary btn-lg" type="button">Learn more</button>
      </header>
      <div className="container my-1 text-white rounded-3">
        <h1 className="display-5 fw-bold">Features</h1>
        <p className="col-md-8 lead">MediTrack has the following features:</p>

        <div className="row shadow p-3 mb-5 bg-body rounded">

          <div className="col card p-3 mb-3">
            <div className="card-header">Feature1</div>
            <div className="card-body">
              <h5 className="card-title">Primary card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>

          <div className="col card p-3 mb-3">
            <div className="card-header">Feature2</div>
              <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
          </div>
        
          <div className="col card p-3 mb-3">
            <div className="card-header">Feature3</div>
              <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
          </div>

      </div>

      </div>
    </div>
    </>
  );
}
export default Homepage;