import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AssetModal from '../../../common/modals/assetModal';

const CourseDemo = ({ course_demo_video }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-center mt-3 mb-4">
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-theme-bordered"
        type="button"
      >
        <span className="pl-2">
        View Course Demo Video
        </span>
      </button>
      <AssetModal
        type="video"
        src={course_demo_video}
        showModal={isOpen}
        onModalClose={() => setIsOpen(false)}
      />
    </div>
  )
}

CourseDemo.propTypes = {
  course_demo_video: PropTypes.string.isRequired
}
export default CourseDemo;
