const validations = {
  'email': {
    required: { value: true, errorMessage: 'Enter valid email' },
    email: true
  },
  'paypal_email': {
    required: { value: true, errorMessage: 'Enter valid paypal email' },
    email: true
  },
  'password': {
    required: { value: true, errorMessage: 'Enter password' },
    minLength: { value: 8, errorMessage: 'Enter between 8 and 16 characters' },
    maxLength: { value: 16, errorMessage: 'Enter between 8 and 16 characters' }
  },
  'reset_password': {
    required: { value: true, errorMessage: 'Enter password' },
    minLength: { value: 8, errorMessage: 'Enter between 8 and 16 characters' },
    maxLength: { value: 16, errorMessage: 'Enter between 8 and 16 characters' },
    match: { value: 'new_password', errorMessage: 'Confirm password should match' }
  },
  'company': {
    required: { value: false, errorMessage: 'Enter Name' },
    pattern: { value: '^[a-zA-Z ]*$', errorMessage: 'Only letters allowed' },
    minLength: { value: 3, errorMessage: 'Enter between 3 and 30 letters' },
    maxLength: { value: 30, errorMessage: 'Enter between 3 and 30 letters' }
  },
  'name': {
    required: { value: false, errorMessage: 'Enter Name' },
    pattern: { value: '^[a-zA-Z ]*$', errorMessage: 'Only letters allowed' },
    minLength: { value: 3, errorMessage: 'Enter between 4 and 30 letters' },
    maxLength: { value: 30, errorMessage: 'Enter between 4 and 30 letters' }
  },
  'mobile_number': {
    required: { value: true, errorMessage: 'Enter mobile number' },
    pattern: { value: '^[0-9]+$', errorMessage: 'Only numbers allowed' },
    minLength: { value: 6, errorMessage: 'Enter between 6 and 10 numbers' },
    maxLength: { value: 10, errorMessage: 'Enter between 6 and 10 numbers' }
  },
  'OTP': {
    required: { value: true, errorMessage: 'Enter OTP' }
  },
  'promoCode': {
    required: { value: true, errorMessage: 'Enter coupon code' },
    pattern: { value: '^[a-zA-Z0-9]+$', errorMessage: 'Special charecter not allowed' }
  },
  'user_comments': {
    minLength: { value: 10, errorMessage: 'Enter between 10 and 400 characters' },
    maxLength: { value: 400, errorMessage: 'Enter between 10 and 400 characters' }
  },
  'course_name': {
    required: { value: true, errorMessage: 'Enter course name' },
    pattern: { value: '^[a-zA-Z ]*$', errorMessage: 'Only letters allowed' }
  },
  'characters': {
    pattern: { value: '^[a-zA-Z]+$', errorMessage: 'Only letters allowed' }
  },
  'number': {
    required: { value: true, errorMessage: '' },
    pattern: { value: '^[0-9]+$', errorMessage: 'Only numbers allowed' }
  },
  'no_special': {
    pattern: { value: '^[a-zA-Z0-9]+$', errorMessage: 'Special charecter not allowed' }
  }
}
const inlineErrorMsgs = {
  'Email': 'Enter valid email',
  'Name': 'Enter name',
  'Mobile_number': 'Enter mobile number',
  'City': 'Enter city name ',
  'CourseName': 'Enter city name ',
  'OTP': 'Enter OTP',
  'PromoCode': 'Enter coupon code',
  'Password': 'Enter password',
  'Linkdin_profile': 'Enter linkedin profile',
  'Area_of_interest': 'Enter your area of expertise',
  'Company_name': 'Enter company name',
  'Redeem_amount': 'Enter redeem amount',
  'Bank_name': 'Enter bank name',
  'Account_holder_name': 'Enter Account holder name',
  'Bank_location': 'Enter Bank location',
  'IFSC_code': 'Enter IFSC code',
  'Acc_number': 'Enter account number',
  'PAN_card_num': 'Enter PAN number',
  'Paypal_email': 'Enter valid paypal email',
  'batch_request': 'Select requested batch date',
  'Course_select': 'Select valid course'
}
export { validations, inlineErrorMsgs };
