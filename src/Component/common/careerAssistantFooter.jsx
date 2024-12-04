import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faAt } from '@fortawesome/free-solid-svg-icons';

const CareeAssFooter = params => (
  <div className="text-white career-ass-footer flex-vertical-center py-2 d-none d-md-flex">
    <span className="d-none d-md-inline"> For Career Assistance</span>
    <FontAwesomeIcon icon={faPhoneAlt} className="ml-4" />
    <span className="in_num ml-4">
      <strong>
        {'IND :'}
      </strong>
      <a className="text-white mx-2" href="tel:+91-8951066177">+91-8951066177</a>
    </span>
    {/* <span className="us_num mx-2">
      <strong>
        US :
      </strong>
      <a className="mx-2 text-white" href="tel:+1-408-809-3690 ">+1-408-809-3690 </a>
      (Toll Free)
    </span> */}
    <span className="sales_mail d-none d-xl-inline">
      <FontAwesomeIcon icon={faAt} className="ml-4 mr-2" />
      {'support@wiculty.com'}
    </span>
  </div>
)

export default CareeAssFooter;
