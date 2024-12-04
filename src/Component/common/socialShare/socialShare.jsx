import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { socialMediaJSON } from '../../staticJSON/staticIconJson';

const SocialShare = ({ shareUrl, quote }) => {
  const socialShareSites = ['facebook', 'twitter', 'whatsapp', 'linkedin', 'email'];
  const filteredSocialSites = socialMediaJSON
    .filter(socialSite => socialShareSites.includes(socialSite.id));

  const getFormattedShareUrl = (siteName) => {
    let URL = ''
    switch (siteName) {
      case 'facebook':
        URL = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`;
        break;
      case 'twitter':
        URL = `https://twitter.com/share?hashtags=Wiculty,&url=${shareUrl}&text=${quote}`;
        break;
      case 'whatsapp':
        URL = `https://api.whatsapp.com/send?text=${quote} URL: ${shareUrl}`;
        break;
      case 'linkedin':
        URL = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&quote=${quote}&title=${quote}&summary=&source=`;
        break;
      case 'email':
        URL = `mailto:info@example.com?&cc=&bcc=info@wiculty.com&subject=${quote}&body=${shareUrl}`;
        break;
      default:
        URL = '';
    }
    return URL;
  }

  return (
    <div>
      {filteredSocialSites.map(socialItem => (
        <>
          <a
            href={getFormattedShareUrl(socialItem.id)}
            alt={socialItem.id}
            target="_blank"
            rel="noopener noreferrer"
            className={`avatar-bg mb-2 mt-2 mr-0 text-white social-share-${socialItem.id}`}
          >
            <FontAwesomeIcon
              icon={socialItem.icon}
              className="footerSocialIcons"
            />
          </a>
          <style jsx="true">
            {
              `.social-share-${socialItem.id} {
                    background: ${socialItem.bg_color};
                }`
            }
          </style>
        </>
      ))}
    </div>
  )
}

SocialShare.propTypes = {
  shareUrl: PropTypes.string,
  quote: PropTypes.string
};

SocialShare.defaultProps = {
  quote: undefined,
  shareUrl: undefined
}

export default SocialShare;
