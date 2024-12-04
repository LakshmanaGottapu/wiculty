import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
// import Sticky from 'react-stickynode';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { getDisplayName, handleScroll } from '../../common/utilFunctions/utilFunction';

const MenuItem = ({ text, selected }) => <div className={`menu-item ${selected ? 'active' : ''}`}>{text}</div>;

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired
};

export const Menu = lists => lists.map(menuItem => (
  <MenuItem
    text={getDisplayName(menuItem)}
    key={menuItem}
  />
));

const Arrow = ({ text, className }) => <div className={className}>{text}</div>;
Arrow.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
export const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
// const getPositionTop = (isOfferBaner) => {
//   if (isOfferBaner) {
//     return (isDesktop() ? 95 : 130)
//   }
//   return (isDesktop() ? 65 : 80)
// }
class CourseMenu extends Component {
  constructor (props) {
    super(props);
    this.menu = null;
    const { menuList = [] } = props;
    this.state = {
      clickWhenDrag: false,
      dragging: true,
      hideArrows: true,
      hideSingleArrow: true,
      selected: 'why-to-enroll?',
      translate: -20,
      transition: 0.4,
      wheel: true,
      menuItems: Menu(menuList.slice(0, menuList.length), 'why-to-enroll?')
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { menuList = [] } = props;
    const { menuItems } = state;
    if ((menuList.length && !menuItems.length) || menuList.length !== menuItems.length) {
      return {
        menuItems: Menu(menuList.slice(0, menuList.length), 'why-to-enroll?')
      }
    }
    return null
  }

  onUpdate = ({ translate }) => {
    this.setState({ translate });
  };

  onSelect = (key) => {
    this.setState({ selected: key });
    handleScroll(key)
  };

  setSelected = (ev) => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  render () {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      selected,
      translate,
      transition,
      wheel,
      menuItems
    } = this.state;
    // const { offerInfo } = this.props || {}
    // const { offer_banner = {} } = offerInfo
    // const isOfferBaner = Object.keys(offer_banner).length;
    return (
      <div>
        {/* <Sticky enabled top={getPositionTop(isOfferBaner) || 0} bottomBoundary={12000}> */}
        <ScrollMenu
        // ref={el => (this.menu = el)}
          data={menuItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          transition={+transition}
          onUpdate={this.onUpdate}
          onSelect={this.onSelect}
          selected={selected}
          translate={translate}
          alignCenter={alignCenter}
          dragging={dragging}
          clickWhenDrag={clickWhenDrag}
          wheel={wheel}
        />
        {/* </Sticky> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  offerInfo: state.offerReducer
})

CourseMenu.propTypes = {
  menuList: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, null)(CourseMenu);
