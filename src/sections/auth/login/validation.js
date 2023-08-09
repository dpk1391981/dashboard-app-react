const validation = (values) => {
  const errors = {};

  const requiredFields = ["email", "fullName", "mobileNumber", "password", "confirmPassword", "agree"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address!";
  }
  if (!values.agree) {
    errors.agree = "Please check!";
  }

  if (values.password && values.confirmPassword) {
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password Not Matched!";
    }
  }

  // Add more validation rules as needed

  return errors;
};

export default validation;
