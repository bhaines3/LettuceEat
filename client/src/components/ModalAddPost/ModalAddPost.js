import React from "react";
import "./ModalAddPost.css";
const ModalAddPost = (props)=> {
    return (
      
      <div className="modal fade" id="modal-addpost" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Food Post</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                    <label htmlFor="new-title">Title:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_title" name="new-title" maxLength={30} />
                    <br />
                    <label htmlFor="new-desc">Description:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_desc" name="new-desc" maxLength={500} />
                    <br />
                    <label htmlFor="new-pickupdate">Pick-Up Date:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_pickupdate" name="new-pickupdate" maxLength={15} />
                    <br />
                    <label htmlFor="new-enddate">End Pick-Up Date:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_enddate" name="new-enddate" maxLength={15} />
                    <br />
                    <label htmlFor="new-pickupwindow">Pick-Up Time Window:</label>
                    <input className="col-sm-12 mb-2" type="text" id="new_pickupwindow" name="new-pickupwindow" maxLength={15} />
                    <br />
                    <div id="alert-message" />
                    <button className="btn btn-outline-success" type="submit" id="create-new-user">Create<i className="far fa-check-circle" /></button>
                    <br />
                    <span id="cannot-create-error" />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ModalAddPost;