import React, { useState } from 'react';
import Modal from 'react-modal';
import './TableRow.css'

// These were the default styles that came with React-Modal


const TableRow = props => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          backgroundColor       : '#00ACEB',
          borderStyle           : 'solid',
          borderColor           : 'black'
        },
        overlay: {
            backgroundColor: '#00ACEB80',
        }
    };
    

    Modal.setAppElement('tr')

    return (
        <>
            <tr>
                <th>{props.num}</th>
                <th>{props.username}</th>
                <th>{props.title}</th>
                <th>{props.userRating}</th>
                <th><span onClick={openModal}>VIEW</span></th>
            </tr>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <h2>{props.username}'s Review of {props.title}</h2>
                <p>{props.review}</p>
                <button className='close-modal__button' onClick={closeModal}>CLOSE</button>
            </Modal>
        </>
    )
}

export default TableRow;