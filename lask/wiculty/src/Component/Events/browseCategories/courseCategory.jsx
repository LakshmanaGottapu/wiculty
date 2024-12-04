import React, { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faBookOpen, faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';

import { buttonize } from '../../common/utilFunctions/utilFunction';
import { BOGOIcons } from '../../staticJSON/staticIconJson';
import { courseCSS } from '../../staticJson';

export default function BrowseCategory ({
  courseCategory, handleCategorySelection,
  isFiltered, selectedCategoryID = [],
  handleClearFilter
}) {
  const [categoryExpand, setCategoryExpand] = useState(true);

  const handleCategoryExpand = () => {
    setCategoryExpand(prevState => !prevState);
  }
  const [selectedCourseID = ''] = selectedCategoryID
  return (
    <div className="my-4">
      <div
        className="upcoming-annexure-tab bg-white mt-4 p-4"
        {...buttonize(handleCategoryExpand)}
      >
        <div
          className="container c-p"
        >
          <h2 className="flex-vertical-center justify-content-between w-100 m-0">
            <span className="d-block text-black">
            Browse by Categories
            </span>
            <span className="d-block  text-muted">
              <FontAwesomeIcon icon={categoryExpand ? faAngleDown : faAngleUp} alt="category" />
            </span>
          </h2>
        </div>
      </div>
      <Collapse isOpen={categoryExpand}>
        <Card>
          <CardBody>
            <div className="browse-category-container
             container d-flex
             justify-content-md-start
             justify-content-center
             "
            >
              {courseCategory.map(course => (
                !isFiltered ? (
                  <div
                    className="browse-category-item
                      flex-vertical-center
                      bg-white p-3
                      shadow rounded m-2 text-center c-p"
                    lg="3"
                    sm="12"
                    md="3"
                    {...buttonize(handleCategorySelection, course.id)}
                    title={course.unique_title}
                  >
                    <div>
                      <FontAwesomeIcon
                        className="fa-icon-size wic-color mr-2 mb-2"
                        icon={BOGOIcons[course.unique_title] || faBookOpen}
                        style={{
                          color: courseCSS[course.unique_title] &&
                           courseCSS[course.unique_title].color
                        }}
                      />

                      <p className="mb-0">
                        {course.course_title}
                      </p>
                    </div>
                  </div>
                )
                  : (
                    selectedCourseID === course.id && (
                      <div
                        className="bg-white py-2 px-3
                         border border-primary title-color
                          rounded c-p"
                        {...buttonize(handleClearFilter)}
                      >
                        <span>
                          {course.course_title}
                          <FontAwesomeIcon
                            className="wic-color ml-2"
                            icon={faTimes}
                          />
                        </span>
                      </div>
                    )
                  )

              ))}
            </div>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  )
}

BrowseCategory.propTypes = {
  courseCategory: PropTypes.shape({}).isRequired,
  handleCategorySelection: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  selectedCategoryID: PropTypes.shape({}).isRequired,
  handleClearFilter: PropTypes.func.isRequired
};
