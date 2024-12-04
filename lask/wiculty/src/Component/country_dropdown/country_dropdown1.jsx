import React, { Component } from 'react';
import {
  Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IMAGES } from '../locales/images';
import setUPAction from '../userPrefInfo/Set_UP_Action';
import setUPLocal from '../userPrefInfo/Set_UP_Local'
import authService from '../../services/authService';
import referalDetails from '../registration/referalAction';

import './country_DD.scss'

class CountryDD extends Component {
  constructor (props) {
    super(props);
    this.selected = this.selected.bind(this);
    this.Visible = this.Visible.bind(this);
    this.searched = this.searched.bind(this);
    this.state = {
      orgCountryList: [],
      filteredCountry: [],
      dropDownheader: { phone_code: '', country_flag: `${IMAGES.INDIAFLAG}`, country_name: '' },
      dropdownOpen: false
    };
  }

  static getDerivedStateFromProps (props = {}, state) {
    const { countryList = {}, UserPrefInfo = {} } = props;
    const { country_name, phone_code } = UserPrefInfo;
    const { dropDownheader } = state;

    if (country_name !== dropDownheader.country_name || phone_code !== dropDownheader.phone_code) {
      return {
        filteredCountry: countryList.countries,
        orgCountryList: countryList.countries,
        dropDownheader: { ...UserPrefInfo }
      }
    }
    return null
  }

  toggle = () => { this.setState(state => ({ dropdownOpen: !state.dropdownOpen })) }

  storeURInfo =(countryObj) => {
    const {
      setUserPrefInDB,
      setUserPrefInLocal
    } = this.props;
    const { currency } = countryObj;
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      setUserPrefInDB({ ...countryObj }, () => {})
      setUserPrefInLocal(countryObj)
      const { getRefferalDetails } = this.props;
      getRefferalDetails({ currencyID: currency }, (resp) => { })
    } else {
      setUserPrefInLocal(countryObj)
    }
  }

  selected (countryObj) {
    this.setState({ dropDownheader: { ...countryObj, 'phone_code': `+${countryObj.phone_code}` } });
    const { onSelectCountry } = this.props;
    onSelectCountry(countryObj);
    this.storeURInfo({ ...countryObj, 'phone_code': `+${countryObj.phone_code}` })
  }

  searched (event = {}) {
    const { orgCountryList = [] } = this.state;
    const { target: { value } } = event
    const filtered = orgCountryList.filter(
      item => item.country_name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ filteredCountry: filtered });
  }

  Visible () {
    this.setState(state => ({ dropdownOpen: !state.dropdownOpen }));
  }

  render () {
    const { dropDownheader = {} } = this.state;
    const { phone_code, country_name } = dropDownheader;
    const { dropdownOpen } = this.state;
    const { filteredCountry = [] } = this.state;
    const { isPhoneCode, classFlag, DD_Size } = this.props;
    return (
      <div className="country-DD">
        <Dropdown size={DD_Size} isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle className={classFlag} caret>
            {isPhoneCode ? (
              <span>
                {phone_code}
                    &nbsp;
                    &nbsp;
              </span>
            ) : (
              <span className="country-view" title={!isPhoneCode && country_name}>
                {country_name}
                    &nbsp;
                    &nbsp;
              </span>
            )}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              <Input
                type="text"
                name="country"
                className="contry-DD-search"
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
                  <span className="country-code">
                    &#43;
                    {DDItem.phone_code}
                  </span>
                  <span className="country-name">
                    {DDItem.country_name}
                  </span>
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
  setUserPrefInDB: (payload, cb) => {
    dispatch(setUPAction(payload, cb));
  },
  setUserPrefInLocal: (payload) => {
    dispatch(setUPLocal(payload));
  },
  getRefferalDetails: (payload, cb) => {
    dispatch(referalDetails(payload, cb));
  }
});
const mapStateToProps = state => ({
  countryList: state.countryList,
  UserPrefInfo: state.UserPrefInfo
});

CountryDD.defaultProps = {
  isPhoneCode: true,
  classFlag: 'DD-white-theme',
  DD_Size: 'md'
}
CountryDD.propTypes = {
  onSelectCountry: PropTypes.func.isRequired,
  setUserPrefInDB: PropTypes.func.isRequired,
  setUserPrefInLocal: PropTypes.func.isRequired,
  getRefferalDetails: PropTypes.func.isRequired,
  isPhoneCode: PropTypes.bool,
  classFlag: PropTypes.string,
  DD_Size: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDD);
