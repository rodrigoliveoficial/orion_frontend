import React, { useState, useEffect } from 'react'
import { Modal, Form} from "react-bootstrap";
import api from '../../services/api';
import { Button } from 'react-bootstrap';

const CustomModal = (props) => {

    const [programas, setProgramas] = useState([]);

    const { idPrograma } = props;

    const obterDadosProgramas = () => {
        api.get(`programas/${idPrograma}`).then((response) => {
            setProgramas(response.data);
        }).catch((e) => {
            console.log('ocorreu algum erro!');
            console.error(e);
            setProgramas([]);
        });
    }

    const load = () => {

        Promise.all([
            obterDadosProgramas(),
        ])
            .then(([
                responseProgramas,
            ]) => {
                setProgramas(responseProgramas.data);
            })
            .catch((e) => {
                console.log('ocorreu algum erro!');
                console.error(e);
            });
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {programas.descricao}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Row>
                    <Form.Group md="2" controlId="helpTextArea">
                        <Form.Control as="textarea" rows={17} cols={150} name="help" value={programas.help} disabled={true} />
                    </Form.Group>
                </Form.Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Ajuda(props) {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <Button variant="info" onClick={() => setModalShow(true)}>
          Ajuda
        </Button>
  
        <CustomModal
          {...props}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

export default Ajuda;