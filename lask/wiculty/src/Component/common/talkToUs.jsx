import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

const TalkToUs = params => (
  <div className="talk-to-us mt-4 mt-lg-0">
    <div className="card">
      <div className="card-header text-white">
        <h3 className="mb-0">
          <FontAwesomeIcon icon={faPhoneAlt} className="mx-2" />
          {'Talk to Us'}
        </h3>
      </div>
      <div className="card-body">
        <ul>
          <li className="text-black-50">
            {'IN:'}
            <a className="callUsnum font-weight-bold ml-2" href="tel:+91 8951066177">+91-8951066177</a>
          </li>
          {/* <li className="text-black-50">
                US:
                <a className="callUsnum font-weight-bold mx-2" href="tel:+1 408 809 3690">
                  {'+1-408-809-3690'}
                </a>
                <span className="text-black-50">(Toll Free)</span>
              </li> */}
        </ul>
      </div>
    </div>
  </div>
);
export default TalkToUs;
