import React from "react";
import { Modal} from 'react-bootstrap';


type Props = {
    show: boolean
    handleClose: (bool: boolean) => void
    modalHeader: string

};

const CustomModal: React.FC<Props> = (props) => {
    const { show, children, modalHeader, handleClose } = props;

    return (
        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title> {modalHeader} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default CustomModal;
