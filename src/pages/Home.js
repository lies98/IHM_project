import Page from '../components/Page';
import React from 'react';
import {
    Button,
  } from "reactstrap";
import 'react-router-dom';
import "../styles/components/home.css"



class HomePage extends React.Component {

    handleClick = () => {
        this.props.history.push("/dashbord");
    };

    render() {
        return (
            <Page
                className="HomePage"
            >
                <div className=" HomePage container">
                    <Button color="info" onClick={this.handleClick}>
                        Démarrer 
                   </Button>
                </div>
            </Page>
        );
    }
};

export default HomePage;
