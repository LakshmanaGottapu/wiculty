const getYears = () => {
  const years = [];
    for (let yearStart = 1980; yearStart <= new Date().getFullYear(); yearStart++) { //eslint-disable-line
    years.push(yearStart)
  }
  return years;
}
export default getYears;
