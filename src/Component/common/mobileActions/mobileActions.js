import './mobileActions.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadset, faPhone, faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

import { buttonize } from '../utilFunctions/utilFunction'

export default function mobileActions () {
  const [list, toggleList] = useState(true);

  return (
    <div id="action-button" className="d-block d-sm-none">
      <ul>
        <li>
          <div
            id="primary-action"
            className="button--circle z-inbox-action-button"
            {...buttonize(() => toggleList(!list))}
          >
            {list ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faHeadset} /> }
          </div>
          {list && (
            <ul>
              <li>
                <a id="item-phone" className="create-button button--circle z-inbox-action-button" href="tel:+918951066177">
                  <FontAwesomeIcon icon={faPhone} />
                </a>
                <p>Call</p>
              </li>
              <li>
                <a id="item-whatsapp" className="create-button button--circle z-inbox-action-button" href="https://api.whatsapp.com/send?phone=918951066177&text=Hello%20Wiculty%20Learning%20Solutions%20Please%20let%20me%20know%20more%20about%20trending%20courses%20and%20your%20offerings">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <p>Whatsapp</p>
              </li>
            </ul>
          )
          }
        </li>
      </ul>
    </div>
  )
}
