const isShowField = (orderItem = {}) => {
  const { Name, Price } = orderItem;
  return (Name === 'Amount Paid' || Price)
}
const isFreeCourse = (orderItem = {}) => {
  const { Name, Price } = orderItem;
  return (Name === 'Amount Paid' && !Price)
}

export { isShowField, isFreeCourse }
