import { createPortal } from "react-dom";


export function Modal({ show, onClose, children }) {
  
  return createPortal(
    <div className={`test-modal ${show ? "open" : ""}`}>
      <div className="modal-content">{children}</div>
    </div>
  , document.getElementById('modal-root'));
}
