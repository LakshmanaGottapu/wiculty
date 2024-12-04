import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import countryDdAction from './countryDdAction';
import { IMAGES } from '../locales/images';
import './country_DD.scss'

class NewCountryDropDown extends Component {
  constructor (props) {
    super(props);
    this.selected = this.selected.bind(this);
    this.searched = this.searched.bind(this);
    this.state = {
      orgCountryList: [],
      filteredCountry: [],
      dropDownheader: {
        phone_code: '91',
        country_flag: `${IMAGES.INDIAFLAG}`,
        country_name: 'India'
      },
      dropdownOpen: false,
      searchFlag: false
    };
  }

  static getDerivedStateFromProps (props = {}, state) {
    const { countryList = {}, selectedCountryObj } = props;
    if (countryList.countries && state.searchFlag === false) {
      return {
        filteredCountry: countryList.countries,
        orgCountryList: countryList.countries,
        dropDownheader: selectedCountryObj
      }
    }
    return null
  }

  componentDidMount () {
    const { fetchCountryList, countryList = {} } = this.props;
    if (!countryList.countries.length) {
      fetchCountryList('country', () => {})
    }
  }

  toggle = () => { this.setState(state => ({ dropdownOpen: !state.dropdownOpen })) }

  selected (prodid) {
    this.setState({ dropDownheader: prodid });
    const { onSelectCountry, fieldName } = this.props;
    onSelectCountry(prodid, fieldName);
  }

  searched (event = {}) {
    const { orgCountryList = [] } = this.state;
    const { target = {} } = event
    const { value = '' } = target
    const filtered = orgCountryList.filter(
      item => item.country_name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ filteredCountry: filtered, searchFlag: true });
  }

  render () {
    const { dropDownheader = {}, filteredCountry, dropdownOpen } = this.state;
    const { country_name } = dropDownheader;
    const { classFlag, DD_Size } = this.props;
    return (
      <div className="country-DD">
        <Dropdown size={DD_Size} isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle className={classFlag} caret>
            <span className="country-view" title={country_name}>
              {country_name}
                    &nbsp;
                    &nbsp;
            </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              <Input
                type="text"
                name="country"
                className="contry-DD-search w-100"
                placeholder="Search for Country"
                autoComplete="off"
                onChange={this.searched}
              />
            </DropdownItem>
            <DropdownItem divider />
            <div className="listOfcountry">
              {filteredCountry.map(DDItem => (
                <DropdownItem
                  onClick={() => this.selected(DDItem)}
                >
                  &#43;
                  {DDItem.phone_code}
                  &nbsp;
                  &nbsp;
                  {DDItem.country_name}
                </DropdownItem>
              ))}
            </div>

          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCountryList: (payload, cb) => {
    dispatch(countryDdAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  countryList: state.countryList
});

NewCountryDropDown.defaultProps = {
  classFlag: 'DD-white-theme',
  DD_Size: 'md'
}

NewCountryDropDown.propTypes = {
  fetchCountryList: PropTypes.func.isRequired,
  onSelectCountry: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  countryList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classFlag: PropTypes.string,
  DD_Size: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCountryDropDown);
