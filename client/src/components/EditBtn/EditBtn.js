import React, { Component } from 'react';
import API from "./../utils/API";
class EditBtn extends Component {
  render()
  {
    return (
      <a href="" className="btn btn-primary text-white float-right" data-toggle="modal" data-target="#modal-editpost">Edit</a>
    )
  }
};

export default EditBtn;