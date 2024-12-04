import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faBook,
  faQuestion,
  faVideo
} from '@fortawesome/free-solid-svg-icons';

import { buttonize } from '../common/utilFunctions/utilFunction';

const LMSContentsItem = ({ item, setSelectedChapter, selectedChapter }) => {
  const {
    id,
    title,
    chapters = [],
    quiz = []
  } = item;
  const [showModules, setShowModules] = useState(false);

  const handleModuleSelection = () => {
    setShowModules(!showModules);
  }

  const getChapterIcon = (chapter) => {
    const { type } = chapter;
    if (type === 'Video') {
      return <FontAwesomeIcon icon={faVideo} />
    }
    if (type === 'Quiz') {
      return <FontAwesomeIcon icon={faQuestion} />
    }
    return <FontAwesomeIcon icon={faBook} />
  }

  const handleChapterSelection = (chapter) => {
    setSelectedChapter(chapter);
  }

  const isChapterSelected = cid => selectedChapter && selectedChapter.id === cid;

  return (
    <Row
      key={id}
      className="border-bottom"
    >
      <Col
        xs={12}
        className="py-3"
        {...buttonize(handleModuleSelection)}
      >
        <div className="px-2 d-flex justify-content-between align-items-center">
          <div className="font-weight-bold">
            {title}
          </div>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="icon-transform"
            style={{ transform: showModules ? 'rotate(90deg)' : 'rotate(0deg)' }}
          />
        </div>
      </Col>
      <Col xs={12} className="px-0">
        <Row>
          { showModules && chapters.length > 0 && (
            chapters.map(chapter => (
              <Col
                xs={12}
                key={chapter.id}
                className={`py-2 px-4 module-chapter ${isChapterSelected(chapter.id) ? 'active' : ''}`}
                {...buttonize(handleChapterSelection, chapter)}
              >
                <span className="pr-2 small">
                  {getChapterIcon(chapter)}
                </span>
                {chapter.title}
              </Col>
            ))
          )}
          { showModules && quiz.length > 0 && (
            <Col
              xs={12}
              key={`quiz-${id}`}
              className="py-2 px-4 module-chapter"
              {...buttonize(handleChapterSelection, { type: 'Quiz', quiz, id: Math.round(Math.random() * 100000) })}
            >
              <span className="pr-2 small">
                {getChapterIcon({ type: 'Quiz' })}
              </span>
              Quiz
            </Col>
          )}
          { showModules && chapters.length === 0 && quiz.length === 0 && (
            <Col xs={12} className="py-2 px-4">
              No Chapters Available
            </Col>
          ) }
        </Row>
      </Col>
    </Row>
  )
};

LMSContentsItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  setSelectedChapter: PropTypes.func.isRequired,
  selectedChapter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({})
  ])
}

LMSContentsItem.defaultProps = {
  selectedChapter: false
}

export default LMSContentsItem;
