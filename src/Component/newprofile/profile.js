import React, { Component } from 'react';
import './profile.css';
import EducationalInfo from './educationalInfo';
import CertificationInfo from './certificationInfo';
import PersonalInfo from './personalInfo';
import GrommingInfo from './grommingInfo';

class Profile extends Component {
  render () {
    return (
      <div>
        <EducationalInfo />
        <CertificationInfo />
        <PersonalInfo />
        <GrommingInfo />
      </div>
    )
  }
}
export default Profile;
