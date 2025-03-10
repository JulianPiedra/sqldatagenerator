import { Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import '../css/ModalComponent.css';
import { valueMap } from '../constants/constants.ts';
import { IModalComponent } from '../constants/interfaces.ts';

export default function ModalComponent({ isOpen, onClose, onSelect }: IModalComponent) {

    // Function to handle the selection of the card
    const handleSelect = (value: number) => {
        onSelect(value, valueMap[value].name);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <ModalHeader toggle={onClose} className="modal-header">Select an Option</ModalHeader>
            <ModalBody className="modal-custom-bg">
                <Row>
                    {/* Loop through the valueMap object and create a card for each key */}
                    {Object.entries(valueMap).map(([key, value]) => (
                        <Col sm="6" md="6" lg="4" key={key} className="mb-3">
                            <Card
                                onClick={() => handleSelect(Number(key))}
                                className="card-custom"
                            >
                                <CardBody>
                                    <CardTitle tag="h5" className="text-primary">{value.name}</CardTitle>
                                    <CardText>{value.description}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ModalBody>

        </Modal>
    );
}
