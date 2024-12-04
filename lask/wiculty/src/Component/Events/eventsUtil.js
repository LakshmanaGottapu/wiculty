const getCourseName = (courseCategory, courseID) => courseCategory
  .filter(courseItem => Number(courseItem.id) === Number(courseID))[0] || {}

const getInstructorInfo = instructor => instructor || {}

export { getCourseName, getInstructorInfo };
