import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

const EmptyEventsMsg = params => (
  <div className="p-4 border text-center bg-light empty-event-card">
    <FontAwesomeIcon className="fa-icon-size wic-color mb-4" icon={faCalendarAlt} alt="events" />
    <h3 className="my-2 text-muted ltr-space">
        MORE EVENTS
    </h3>
    <h2 className="my-2  wrd-space">
        COMING SOON!
    </h2>
  </div>
)

export default EmptyEventsMsg;
