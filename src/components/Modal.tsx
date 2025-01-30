import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

interface ModalWithReturnProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: number, valueMap:string) => void;
}

export default function ModalWithReturn({ isOpen, onClose, onSelect }: ModalWithReturnProps) {
    const valueMap: { [key: number]: string } = {
        1: 'Id',
        2: 'Name',
    };
    const handleSelect = (value: number) => {
       
        onSelect(value, valueMap[value]);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Select an Option</ModalHeader>
            <ModalBody>
                <Button color="primary" onClick={() => handleSelect(1)}>
                    Yes
                </Button>
                <Button color="secondary" onClick={() => handleSelect(2)}>
                    No
                </Button>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
