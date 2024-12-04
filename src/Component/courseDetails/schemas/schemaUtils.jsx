import { useSelector, shallowEqual } from 'react-redux';
import sf from '../../common/safeTraverse';

const breadcrumSchema = (title, url) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [{
    '@type': 'ListItem',
    'position': 1,
    'name': 'Home',
    'item': 'https://www.wiculty.com/'
  }, {
    '@type': 'ListItem',
    'position': 2,
    'name': title,
    'item': url
  }]
});

const localBussSchema = (url) => {
  const { course, batch } = useSelector(state => ({
    course: state.courseDetails,
    batch: state.batchInfo,
    homeContent: state.homeContent
  }), shallowEqual);

  // course information
  const courseInfo = sf(course, ['data', 'data', 'course']) || [];
  const {
    display_title = '', course_banner = ''
  } = courseInfo;

  // Batch information
  const completeBatchPrice = sf(batch, ['course_price', 'price']) || [];
  const [batachData = []] = completeBatchPrice
  const batchDetails = sf(batachData, ['discount', 'batch']) || [];

  // priceRange taking from firstbatch
  const [firstBatch = {}] = batchDetails;
  const { discounted_batch_price } = firstBatch
  return ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'image': [
      course_banner
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Bangalore',
      'addressRegion': 'Karnataka',
      'postalCode': '560066'
    },
    'name': display_title,
    'priceRange': `INR ${discounted_batch_price}`,
    'telephone': '+91 8951066177',
    url
  })
}

const reviewSchema = () => {
  const { course, batch, homeContent } = useSelector(state => ({
    course: state.courseDetails,
    batch: state.batchInfo,
    homeContent: state.homeContent
  }), shallowEqual);

  // course information
  const courseInfo = sf(course, ['data', 'data', 'course']) || [];
  const { display_title = '', course_banner = '' } = courseInfo;

  // Batch information
  const completeBatchPrice = sf(batch, ['course_price', 'price']) || [];
  const [batachData = []] = completeBatchPrice
  const batchDetails = sf(batachData, ['discount', 'batch']) || [];

  // priceRange taking from firstbatch
  const [firstBatch = {}] = batchDetails;
  const { discounted_batch_price } = firstBatch

  // Reviews information
  const reviews = sf(homeContent, ['reviews']) || [];
  const [firstReview = {}] = reviews;
  const { author, message, rating } = firstReview;
  return ({
    '@context': 'https://schema.org/',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'LocalBusiness',
      'image': course_banner,
      'name': display_title,
      'priceRange': `INR ${discounted_batch_price}`,
      'telephone': '+91 8951066177',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Bangalore',
        'addressRegion': 'Karnataka',
        'postalCode': '560066'
      }
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': rating
    },
    'name': display_title,
    'author': {
      '@type': 'Person',
      'name': author
    },
    'reviewBody': message,
    'publisher': {
      '@type': 'Organization',
      'name': 'Wiculty'
    }
  })
}

const faqSchema = () => {
  const { course } = useSelector(state => ({
    course: state.courseDetails
  }), shallowEqual);

  // FAQ information
  const faqData = sf(course, ['data', 'data', 'course', 'sections', 'faqs', 'section_details']) || [];
  const faqEntity = () => faqData.map(({ title, description }) => (
    {
      '@type': 'Question',
      'name': title,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': description
      }
    }
  ))
  return ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqEntity()
  })
}

export {
  breadcrumSchema, localBussSchema,
  reviewSchema, faqSchema
};
