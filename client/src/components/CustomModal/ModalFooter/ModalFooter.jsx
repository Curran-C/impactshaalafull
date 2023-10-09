import "./ModalFooter.scss";

function ModalFooter({ cancel, cancelClass, children }) {
  return (
    <div class="modal-footer">
      {cancel && (
        <button type="button" className={cancelClass} data-bs-dismiss="modal">
          Cancel
        </button>
      )}
      {/* <button type="button" class="btn btn-primary">
        Submit Report
      </button> */}
      {children}
    </div>
  );
}

export default ModalFooter;
