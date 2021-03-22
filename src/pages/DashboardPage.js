import Page from '../components/Page';
import NumberWidget from '../components/Widget/NumberWidget';
import {
  chartjs,
  productsData,
  recettePerYear,
  commandePending,
  commandeSucess,
  commandeCanceled,
} from '../demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';



class DashboardPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >


        <Row >
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Revenus"
              subtitle="2020"
              number= {`${recettePerYear(2020)} euros`}
              color="primary"
              progress={{
                value: 80,
                label: 'objectif : 1544125',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="commandes"
              subtitle="en cours"
              number={`${commandePending()}`}
              color="warning"
              progress={{
                value: parseInt(commandePending() * 100 / productsData.length),
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="commandes"
              subtitle="traitées"
              number={`${commandeSucess()}`}
              color="success"
              progress={{
                value: parseInt(commandeSucess() * 100 / productsData.length),
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="commandes"
              subtitle="annulées"
              number={`${commandeCanceled()}`}
              color="danger"
              progress={{
                value: parseInt(commandeCanceled() * 100 / productsData.length),
              }}
            />
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                revenus mensuels 2020
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
         <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Commandes par fournisseur</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </Page>
    );
  }
}
export default DashboardPage;
