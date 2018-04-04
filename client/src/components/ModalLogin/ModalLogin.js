import React from "react";
import "./ModalLogin.css";

const ModalLogin = (props) => {
return (

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="username">Username:</label>
        <input className="col-sm-12 mb-2" type="text" id="username" name="username" maxLength={500} />
        <br />
        <label htmlFor="password">Password:</label>
        <input className="col-sm-12 mb-2" type="password" id="password" name="password" maxLength={15} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
    }