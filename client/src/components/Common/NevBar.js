import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LOGO from "../../assets/img/logo.png"
import { TfiLayoutListThumb, TfiPencilAlt } from "react-icons/tfi";



const NevBar = () => {
    return (

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand ><img className="w-75" src={LOGO}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav >
                            <Nav.Link className="btn btn-secondary  text-white" href="/"><TfiLayoutListThumb/> List</Nav.Link>
                            <Nav.Link className="btn btn-secondary mx-1 text-white" href="create"><TfiPencilAlt/> Create</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    );
};

export default NevBar;