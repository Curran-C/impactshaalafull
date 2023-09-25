


import React, { useState } from 'react';
import './addProjectAccomplishmentsPopUp.scss'; 

function AddProjectAccomplishmentsPopUp() {

  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={toggleModal}>
        Open Popup
      </button>

      {isOpen && (
        <div className="modal fade show " tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Popup Form</h4>
                <button type="button" className="btn-close " onClick={toggleModal}>X</button>
              </div>
              <div className="modal-body">
                <form>
                    <input></input>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProjectAccomplishmentsPopUp
