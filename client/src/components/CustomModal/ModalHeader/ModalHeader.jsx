function ModalHeader({ title, label, className }) {
  return (
    <div className={`modal-header ${className}`}>
      <h1 className="modal-title fs-5" id={label || "modalLabel"}>
        {title}
      </h1>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default ModalHeader;
