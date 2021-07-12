import React from "react";
import { Image } from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron'

const Home = (props) => {

    return (
        <div>
            <Jumbotron >
            <br></br>
            <br></br>
            <center> <Image src="Orion_logo.png" alt="ORION" roundedCircle/></center>
            <br></br>
            <br></br>
            </Jumbotron>
        </div>
    );
}

export default Home;