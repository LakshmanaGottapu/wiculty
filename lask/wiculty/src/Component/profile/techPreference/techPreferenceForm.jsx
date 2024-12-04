import React, { useState, useEffect } from 'react';
import {
  Modal, ModalHeader,
  ModalBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import updatePrefAction from '../Actions/updateProfessionalInfoAction';
import profileAction from '../profileAction';

import { filterInstrLedCourse } from '../../common/utilFunctions/utilFunction';
import sf from '../../common/safeTraverse';
import messageFn from '../../common/message'

import { MESSAGES } from '../../locales/locale';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR },
  TECH_PREFERENCE_UPDATED
} = MESSAGES;

const TechPreferenceForm = ({
  profileInfo = {}, updatePreference,
  courseList = [], getProfileDetails
}) => {
  const [isTechPref, setTechModal] = useState(false);
  const [selectedPrefs, setPrefs] = useState([]);

  const toggle = () => {
    setTechModal(false);
  }

  function handleModal () {
    const { user = {}, professional = {} } = profileInfo;
    const { is_free_user } = user;
    const { user_preference } = professional;
    if (is_free_user && (!user_preference)) {
      setTechModal(true)
    } else {
      setTechModal(false)
    }
  }

  useEffect(() => {
    if (profileInfo) {
      handleModal()
    }
  }, []);

  useEffect(() => {
    if (profileInfo) {
      handleModal()
    }
  }, [profileInfo]);

  function onValueChange (id) {
    if (!selectedPrefs.includes(id)) {
      setPrefs(prevState => ([...selectedPrefs, id]));
    } else {
      const index = selectedPrefs.indexOf(id);
      const newPrefsList = [...selectedPrefs.slice(0, index),
        ...selectedPrefs.slice(index + 1, selectedPrefs.length)]

      setPrefs(newPrefsList);
    }
  }

  const formSubmit = (event) => {
    event.preventDefault();
    if (selectedPrefs.length > 0) {
      updatePreference({ user_preference: selectedPrefs }, (resp) => {
        const { status } = resp || {};
        if (status === 200) {
          setTechModal(false);
          messageFn(TECH_PREFERENCE_UPDATED, SUCCESS);
          getProfileDetails({}, () => {});
        } else {
          messageFn(GENERIC_ERR, ERROR);
          setTechModal(true);
        }
      })
    } else {
      messageFn('Select atleast one preference', ERROR);
    }
  }

  return (
    <>
      <Modal
        isOpen={isTechPref}
        toggle="true"
        className="modal-dialog-centered modal-bg-white"
        data-backdrop="static"
      >
        <ModalHeader className="modal-hd-color text-left mb-0" toggle={toggle}>Select your topic preferences</ModalHeader>
        <ModalBody>
          <p>
           Select your preference to get related course notifications.
          </p>
          <form onSubmit={formSubmit}>
            {courseList && courseList.map(courseItem => (
              <div className="radio">
                <label htmlFor={courseItem.course_title}>
                  <input
                    type="checkbox"
                    className="mx-2"
                    id={courseItem.course_title}
                    value={courseItem.course_title}
                    checked={selectedPrefs.includes(courseItem.id)}
                    onChange={() => onValueChange(courseItem.id)}
                  />
                  {courseItem.course_title}
                </label>
              </div>
            ))}
            <button className="btn btn-primary float-right" type="submit">
                Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
const mapStateToProps = state => ({
  profileInfo: sf(state, ['profileDetails', 'data', 'data']),
  courseList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || [])
})
const mapDispatchToProps = dispatch => ({
  updatePreference: (payload, cb) => {
    dispatch(updatePrefAction(payload, cb))
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb));
  }
})

TechPreferenceForm.propTypes = {
  profileInfo: PropTypes.shape({}).isRequired,
  courseList: PropTypes.shape({}).isRequired,
  updatePreference: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TechPreferenceForm);
