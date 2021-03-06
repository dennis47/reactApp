
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
  NavbarText
} from 'reactstrap';
import CartSummary from '../cart/CartSummary';
import {Link } from "react-router-dom"
const Navi = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
console.log("test git");
console.log("test git");
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand ><Link to ="/">Northwind Mağazası</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/saveProduct" >Ürün Ekle</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
            </NavItem>    
            <CartSummary />       
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navi;
