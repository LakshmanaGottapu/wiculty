import {
  faAws, faDocker, faPython,
  faMixcloud, faWindows,
  faFacebookF,
  faInstagram,
  faYoutube,
  faQuora,
  faLinkedinIn,
  faTwitter,
  faWhatsapp,
  faTelegramPlane,
  faMeetup
} from '@fortawesome/free-brands-svg-icons';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { IMAGES } from '../locales/images'

const courseIcons =
  {
    'AWS Certification Training': faAws,
    'Docker and Kubernetes Certified Training': IMAGES.DOCKER_KUBER_LOGO,
    'DevOps Certification Training': IMAGES.DEVOPS_LOGO,
    'Python Certification Training': faPython,
    'Google Cloud Platform Certification Training': faMixcloud,
    'Microsoft Azure Certification Training': faWindows
  }
const BOGOIcons = {
  ...courseIcons,
  'Docker and Kubernetes Certified Training': faDocker,
  'DevOps Certification Training': faInfinity
}

const socialMediaJSON = [
  {
    link: process.env.REACT_APP_FACEBOOK,
    icon: faFacebookF,
    bg_color: '#3A5998',
    id: 'facebook'
  },
  {
    link: process.env.REACT_APP_TWITTER,
    icon: faTwitter,
    bg_color: '#13ACED',
    id: 'twitter'
  },
  {
    link: process.env.REACT_APP_TELEGRAM,
    icon: faTelegramPlane,
    bg_color: '#2AA0D9',
    id: 'telegram'
  },
  {
    link: process.env.REACT_APP_INSTAGRAM,
    icon: faInstagram,
    bg_color: '#D23D5A',
    id: 'instagram'
  },
  {
    link: process.env.REACT_APP_YOUTUBE,
    icon: faYoutube,
    bg_color: '#F5424C',
    id: 'youtube'
  },
  {
    link: process.env.REACT_APP_QUORA,
    icon: faQuora,
    bg_color: '#C5363B',
    id: 'quora'
  },
  {
    link: process.env.REACT_APP_LINKEDIN,
    icon: faLinkedinIn,
    bg_color: '#0B7FB1',
    id: 'linkedin'
  },
  {
    link: process.env.REACT_APP_WHATSAPP,
    icon: faWhatsapp,
    bg_color: '#49B744',
    id: 'whatsapp'
  },
  {
    link: process.env.REACT_APP_MEETUP,
    icon: faMeetup,
    bg_color: '#E73E47',
    id: 'meetup'
  },
  {
    link: process.env.REACT_APP_MEETUP,
    icon: faEnvelope,
    bg_color: '#7F7F7F',
    id: 'email'
  }
]

export { BOGOIcons, courseIcons, socialMediaJSON };
