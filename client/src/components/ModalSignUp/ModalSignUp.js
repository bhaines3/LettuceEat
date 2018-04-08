import React from "react";
import "./ModalSignUp.css";
const ModalSignUp = (props)=> {
    return (
      
      <div className="modal fade" id="modal-signup" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel111" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel111">Create an Account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                    <label htmlFor="new-name">Name:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_name" name="new-name" maxLength={30} />
                    <br />
                    <label htmlFor="new-email">Email:</label>
                    <input className="col-sm-12 mb-2" type="email" id="new_email" name="new-email" maxLength={500} />
                    <br />
                    <label htmlFor="new-password">Password:</label>
                    <input className="col-sm-12 mb-2" type="password" id="new_password" name="new-password" maxLength={15} />
                    <br />
                    <label htmlFor="new-phone-number">Phone:</label>
                    <input className="col-sm-12 mb-2" type="number" id="new_phone_number" name="new-new_phone_number" maxLength={13} />
                    <br />

                    <div id="alert-message" />
                     <button className="btn btn-outline-primary" type="submit" id="create-new-user">Create <i className="fas fa-plus-circle"></i></button> 
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

export default ModalSignUp;