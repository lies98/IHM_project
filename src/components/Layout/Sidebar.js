import React from 'react';
import {
  MdBorderAll,
  MdDashboard,
  MdHome,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';


const navItems = [
  { to: '/', name: 'home', exact: true, Icon: MdHome },
  { to: '/dashbord', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];



class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className='cr-sidebar'>
        <div className='cr-sidebar__content'>
          <Navbar>
            <span className="text-white">
              INVENTORY MANAGMENT 
            </span>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className="cr-sidebar__nav-item-icon" />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
