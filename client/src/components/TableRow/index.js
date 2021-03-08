import React, { useState } from 'react';
import Modal from 'react-modal';

// These were the default styles that came with React-Modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};


const TableRow = props => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    Modal.setAppElement('tr')

    return (
        <>
            <tr>
                <th>{props.num}</th>
                <th>{props.username}</th>
                <th>{props.title}</th>
                <th>{props.userRating}</th>
                <th><button onClick={openModal}>View Review</button></th>
            </tr>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <h2>{props.username}'s Review of {props.title}</h2>
                <p>{props.review}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    )
}

export default TableRow;