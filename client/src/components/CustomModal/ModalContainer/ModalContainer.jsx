function ModalContainer({
  id,
  label,
  children,
  isStatic = true,
  modalXl = false,
  isFade = true,
  showModal,
}) {
  return (
    <div
      className={`modal ${isFade ? " fade " : ""} `}
      // style={{ display: showModal ? "block" : "none" }}
      id={id}
      data-bs-backdrop={`${isStatic ? "static" : " "}`}
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={label || "modalLabel"}
    >
      <div
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${
          modalXl ? "modal-xl" : ""
        } `}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default ModalContainer;
