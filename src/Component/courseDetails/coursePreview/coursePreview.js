import React, { useState } from 'react';
import ProptTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { buttonize } from '../../common/utilFunctions/utilFunction';
import AssetModal from '../../common/modals/assetModal';
import './coursePreview.scss';

const CoursePreview = ({ course_demo_video }) => {
  const [close, setClose] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function onModalClose () {
    setIsOpen(false);
  }

  return (
    <>
      <div className={close ? 'd-none' : ''}>
        <div className="course-preview d-none d-lg-block">
          <FontAwesomeIcon icon={faTimes} className="course-preview-close" {...buttonize(() => setClose(true))} />
          <div className="course-preview_data flex-vertical-center" {...buttonize(() => setIsOpen(true))}>
            <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
          Watch Course Demo
          </div>
        </div>
      </div>
      <AssetModal
        type="video"
        src={course_demo_video}
        showModal={isOpen}
        onModalClose={onModalClose}
      />
    </>
  )
};

CoursePreview.propTypes = {
  course_demo_video: ProptTypes.isRequired
}

export default CoursePreview;
