import "./Modal.scss";

function Modal({ children }) {
  return (
    <div className="custom-modal">
      <div className="modal-overlay"></div>
      <div className="container">{children}</div>
    </div>
  );
}

export default Modal;
