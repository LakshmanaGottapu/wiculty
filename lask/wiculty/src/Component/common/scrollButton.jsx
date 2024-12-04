import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';

const ScrollButton = () => {
  const [scrollTopFlag, setScrollFlag] = useState(false);
  useEffect(() => {
    scroll();
  }, []);

  function handleScroll () {
    const scrollFlag = window.scrollY > (window.screen.height - 100);
    setScrollFlag(scrollFlag)
  }

  function scroll () {
    window.addEventListener('scroll', handleScroll, true);
  }

  function scrollUp () {
    window.scroll(0, 0)
  }
  return (
    <>
      {scrollTopFlag &&
        (
          <div className="scrollup-button up" role="button" tabIndex={0} onKeyPress={() => {}} onClick={() => scrollUp()}>
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
        )}
    </>
  )
}

export default ScrollButton;
