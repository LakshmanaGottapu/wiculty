import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { JSONLD, Generic } from 'react-structured-data';
// import parse from 'html-react-parser';
import sf from '../../common/safeTraverse';

const EventsSchema = () => {
  const { course, batch } = useSelector(state => ({
    course: state.courseDetails,
    batch: state.batchInfo
  }), shallowEqual);

  const { href = 'https://www.wiculty.com/' } = window.location;

  // course information
  const courseInfo = sf(course, ['data', 'data', 'course']) || [];
  const { display_title = '', course_banner = '', short_description = '' } = courseInfo;

  // Batch information
  const completeBatchPrice = sf(batch, ['course_price', 'price']) || [];
  const [batachData = []] = completeBatchPrice
  const batchDetails = sf(batachData, ['discount', 'batch']) || [];

  const getFormattedDate = date => new Date(date).toISOString().slice(0, 10);

  const getBatchVisibility = (start_date) => {
    const startDate = new Date(start_date);
    const batchVisibleDate = startDate.setDate(startDate.getDate() - 7);
    return new Date(batchVisibleDate).toISOString().slice(0, 10);
  }

  return (
    <div>
      {batchDetails.map(({ start_date, end_date, discounted_batch_price }) => (
        <JSONLD>
          <Generic
            type="Event"
            jsonldtype="Event"
            schema={
              {
                name: display_title,
                startDate: getFormattedDate(start_date),
                endDate: getFormattedDate(end_date),
                eventStatus: 'https://schema.org/EventScheduled',
                eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
                image: [
                  course_banner
                ],
                description: short_description
              }
            }
          >
            <Generic
              type="location"
              jsonldtype="VirtualLocation"
              schema={
                {
                  url: href
                }
              }
            />
            <Generic
              type="offers"
              jsonldtype="Offer"
              schema={
                {
                  url: href,
                  price: discounted_batch_price,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                  validFrom: getBatchVisibility(start_date)
                }
              }
            />
            <Generic
              type="organizer"
              jsonldtype="Organization"
              schema={
                {
                  name: 'Wiculty',
                  url: href
                }
              }
            />
            <Generic
              type="performer"
              jsonldtype="PerformingGroup"
              schema={
                {
                  name: 'Wiculty',
                  url: href
                }
              }
            />
          </Generic>
        </JSONLD>
      ))}
    </div>
  )
}

export default EventsSchema;
