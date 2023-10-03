import Modal from 'react-modal';

export function CustomModal({ isOpen, onRequestClose }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="custommodal"
      >
        <h2>My Modal</h2>
        <p>This is a simple modal example.</p>
        <button onClick={onRequestClose}>Close Modal</button>
      </Modal>
    );
  }
  
  