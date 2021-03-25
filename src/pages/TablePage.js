import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Row,
  Alert,
} from "reactstrap";
import "../styles/components/trackingOrderProgressBar.scss"
import {
  productsData,
  ordersTracks,
} from '../demos/dashboardPage';
const wellDotColor = 'lightgreen';
const wellLineColor = '5px solid lightgreen';

const dangerDotColor = 'red';
const dangerLineColor = '5px solid red';

const wellStyle = {
  "--my-color-var": wellDotColor,
  "--myline-color-var": wellLineColor
}
const dangerStyle = {
  "--my-color-var": dangerDotColor,
  "--myline-color-var": dangerLineColor
}

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      index: 0,
      visible: false,
      dangerVisible: false,
    };

    this.toggle = this.toggle.bind(this);
  }


  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 2000)
    });
  }

  onShowDangerAlert = () => {
    this.setState({ dangerVisible: true }, () => {
      window.setTimeout(() => {
        this.setState({ dangerVisible: false })
      }, 2000)
    });
  }


  toggle(i) {
    this.setState({
      modal: !this.state.modal,
      index: i,
    });
  };
  renderModal(orderId) {
    return (
      <div className="container-fluide">
        <div className="wrapper">
          <ul className="sessions">
            <li className={`square ${productsData[orderId].status <= 5 ? 'active' : ''}`} style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">Gestion</div>
            </li>
            <li className={productsData[orderId].status > 5 && productsData[orderId].status <= 16 ? 'active' : ''} style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">{ordersTracks[orderId].Gestion.date1}</div>
              <p>{ordersTracks[orderId].Gestion.valideur1}</p>
            </li>
            <li className={productsData[orderId].status > 16 && productsData[orderId].status <= 33 ? 'active' : ''} style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">{ordersTracks[orderId].Gestion.date2}</div>
              <p>{ordersTracks[orderId].Gestion.valideur2}</p>
            </li>
            <li className={`square ${productsData[orderId].status <= 38 && productsData[orderId].status > 33 ? 'active' : ''}`} style={ordersTracks[orderId].state ? wellStyle : dangerStyle} >
              <div className="time">Budget</div>
            </li>
            <li className={productsData[orderId].status > 38 && productsData[orderId].status <= 52 ? 'active' : ''} style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">{ordersTracks[orderId].Budjet.date1}</div>
              <p>{ordersTracks[orderId].Budjet.valideur1}</p>
            </li>
            <li className={productsData[orderId].status > 52 && productsData[orderId].status <= 66 ? 'active' : ''} style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">{ordersTracks[orderId].Budjet.date2}</div>
              <p>{ordersTracks[orderId].Budjet.valideur2}</p>
            </li>
            <li className={`square ${productsData[orderId].status <= 99 && productsData[orderId].status > 66 ? 'active' : ''}`} style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">Achat</div>
            </li>
            <li style={ordersTracks[orderId].state ? wellStyle : dangerStyle}>
              <div className="time">{ordersTracks[orderId].Achat.date1}</div>
              <p>{ordersTracks[orderId].Achat.valideur1}</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Page
        title="Tables"
        className="TablePage"
      >
        <Alert color="success" style={{ zIndex: "1", position: 'fixed', top: '5px', width: '80%' }} isOpen={this.state.visible} >
          L'ajout d'un client est une fonctionnalité qui sera prochainement rajouté !
        </Alert>

        <Alert color="danger" style={{ zIndex: "1", position: 'fixed', top: '5px', width: '80%' }} isOpen={this.state.dangerVisible} >
          La suppression d'un client est une fonctionnalité qui sera prochainement rajouté !
        </Alert>


        <Card className="mb-3">
          <CardHeader>Size</CardHeader>
          <CardBody>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col">N°Commande</div>
                <div className="col">Fournisseur</div>
                <div className="col">Montant</div>
                <div className="col">Date</div>
                <div className="col">Status</div>
                <div className="col">Suivre</div>
              </li>
              {productsData.map(({ Fournisseur, Montant, date, status }, index) => (
                <li key={index} className="table-row">
                  <div className="col" data-label="N°commande">{index}</div>
                  <div className="col" data-label="Fournissuer">{Fournisseur}</div>
                  <div className="col" data-label="Montant">{`${Montant} €`}</div>
                  <div className="col" data-label="Date">{date}</div>
                  <div className="col d-flex align-items-center" data-label="Status">
                    <span className="mr-2">{`${status}%`}</span>
                    <div>
                      <Progress
                        max="100"
                        value={`${status}`}
                        barClassName={`bg-${!ordersTracks[index].state ? 'danger' : (status > 99 ? 'sucess' : 'warning')}`}
                      />
                    </div>
                  </div>
                  <div className="col" data-label="Suivre">
                    <Button
                      className=" btn-icon"
                      color="info"
                      size="sm"
                      type="button"
                      onClick={() => this.toggle(index)}
                    >
                      Suivre
                    </Button>
                  </div>
                </li>))}
            </ul>
            <Modal isOpen={this.state.modal} toggle={() => this.toggle(this.state.index)} className={this.props.className}>
              <ModalHeader>{`La commande N°${this.state.index}`}</ModalHeader>
              <ModalBody className="ProgressBar">
                {this.renderModal(this.state.index)}
              </ModalBody>
            </Modal>
            <Row className="d-flex justify-content-center">
              <Button outline color="info" onClick={() => { this.onShowAlert() }}>
                Ajouter
                </Button>
              <Button outline className="offset-md-1" color="danger" onClick={() => { this.onShowDangerAlert() }}>
                Supprimer
              </Button>

            </Row>
          </CardBody>
        </Card>


      </Page>
    );
  }
};

export default TablePage;
