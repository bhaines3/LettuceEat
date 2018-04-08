import React from "react";
import "./ModalLogin.css";

const ModalLogin = (props) => {
return (

       <div className="modal fade" id="modal-login" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel222" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel222">Log in to account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                    <label htmlFor="name-login">Name:</label>
                    <input className="col-sm-12 mb-2" type="text" id="name-login" name="name-login" maxLength={30} />
                    <br />
                    <label htmlFor="email-login">Email:</label>
                    <input className="col-sm-12 mb-2" type="text" id="email-login" name="email-login" maxLength={500} />
                    <br />
                    <label htmlFor="new-password">Password:</label>
                    <input className="col-sm-12 mb-2" type="password" id="new_password" name="new-password" maxLength={15} />
                    <br />
                    <label htmlFor="new-phone-number">Phone:</label>
                    <input className="col-sm-12 mb-2" type="number" id="new_phone_number" name="new_phone_number" maxLength={13} />
                    <br />

                    <div id="alert-message" />
                     <button className="btn btn-primary" type="submit" id="login-user">Login <i className="fa fa-check-circle" /></button> 
                    <br />
                    <span id="cannot-create-error" />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    );
};
export default ModalLogin;