import React, { useState, useEffect } from 'react';
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
import './country_DD.scss';

const CountryDD = (props) => {
  const { countryList = {}, UserPrefInfo = {}, disable } = props;
  const { isPhoneCode, classFlag, DD_Size } = props;
  const [dropdownOpen, setDDToggle] = useState(false);
  const [dropDownHeader, setDDHeader] = useState(
    {
      phone_code: '',
      country_flag: `${IMAGES.INDIAFLAG}`,
      country_name: ''
    }
  );

  const [countryListArr, setCountryList] = useState([]);

  useEffect(() => {
    setCountryList(countryList.countries || []);
  }, [countryList]);

  useEffect(() => {
    setDDHeader({ ...UserPrefInfo });
  }, [UserPrefInfo]);

  const toggle = () => {
    setDDToggle(preState => !preState);
  };

  const storeURInfo = (countryObj) => {
    const {
      setUserPrefInDB,
      setUserPrefInLocal
    } = props;
    const { currency } = countryObj;
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      setUserPrefInDB({ ...countryObj }, () => {})
      setUserPrefInLocal(countryObj)
      const { getRefferalDetails } = props;
      getRefferalDetails({ currencyID: currency }, (resp) => { })
    } else {
      setUserPrefInLocal(countryObj)
    }
  }

  /* on Country select call */
  const selected = (countryObj) => {
    setDDHeader({ ...countryObj, 'phone_code': `+${countryObj.phone_code}` });
    const { onSelectCountry } = props;
    onSelectCountry(countryObj);
    storeURInfo({ ...countryObj, 'phone_code': `+${countryObj.phone_code}` })
  }

  /* on Country search call */
  const searched = (event = {}) => {
    const { target: { value } } = event
    const filtered = countryList.countries && countryList.countries.filter(
      item => item.country_name.toLowerCase().includes(value.toLowerCase())
    );
    setCountryList(filtered);
  }

  const { phone_code, country_name } = dropDownHeader;
  return (
    <div className="country-DD">
      <Dropdown size={DD_Size} isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className={classFlag} caret disabled={disable}>
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
              onChange={searched}
            />
          </DropdownItem>
          <DropdownItem divider />
          <div className="listOfcountry">
            {countryListArr.map(DDItem => (
              <DropdownItem
                onClick={() => selected(DDItem)}
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
  )
};

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
  DD_Size: 'md',
  countryList: {},
  UserPrefInfo: {},
  disable: false
}
CountryDD.propTypes = {
  onSelectCountry: PropTypes.func.isRequired,
  setUserPrefInDB: PropTypes.func.isRequired,
  setUserPrefInLocal: PropTypes.func.isRequired,
  getRefferalDetails: PropTypes.func.isRequired,
  isPhoneCode: PropTypes.bool,
  classFlag: PropTypes.string,
  DD_Size: PropTypes.string,
  countryList: PropTypes.shape({}),
  UserPrefInfo: PropTypes.shape({}),
  disable: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDD);
