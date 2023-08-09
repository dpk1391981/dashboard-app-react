const validation = (values) => {
  const errors = {};

  const requiredFields = ["title"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (values["custom_color"]) {
    if (!values["color_code"]) {
      errors["color_code"] = "Required";
    }
  }

  return errors;
};

export default validation;
