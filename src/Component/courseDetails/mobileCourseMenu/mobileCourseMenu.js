import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getDisplayName, handleScroll } from '../../common/utilFunctions/utilFunction';
import './mobileCourseMenu.scss';

const MobileCourseMenu = ({ menuItems }) => {
  const [showMenu, setMenuFlag] = useState(false);

  function toggleMenu () {
    setMenuFlag(!showMenu)
  }

  function goToSection (menuItem) {
    setMenuFlag(false);
    handleScroll(menuItem)
  }

  return (
    <div className="mobile-course-menu d-block d-md-none mb-4">
      <Dropdown isOpen={showMenu} toggle={toggleMenu} direction="down">
        <DropdownToggle caret>
          Browse Categories
        </DropdownToggle>
        <DropdownMenu>
          {menuItems.map(menuItem => (
            <DropdownItem onClick={() => goToSection(menuItem)}>
              {getDisplayName(menuItem).toUpperCase()}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
MobileCourseMenu.propTypes = {
  menuItems: PropTypes.isRequired
};
export default MobileCourseMenu;
