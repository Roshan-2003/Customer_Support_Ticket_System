const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    typeof email === "string" &&
    emailRegex.test(email.trim())
  );
};

const isRequired = (value) => {
  return (
    typeof value === "string" &&
    value.trim() !== ""
  );
};

const isValidPriority = (priority) => {
  return ["low", "medium", "high"].includes(priority);
};

const isValidStatus = (status) => {
  return ["open", "in_progress", "resolved"].includes(status);
};

const validateTicket = (data) => {
  const {
    customer_name,
    customer_email,
    subject,
    description,
    priority,
  } = data;

  const errors = {};

  if (!isRequired(customer_name)) {
    errors.customer_name = "Customer name is required";
  }

  if (!isRequired(customer_email)) {
    errors.customer_email = "Customer email is required";
  } else if (!isValidEmail(customer_email)) {
    errors.customer_email = "Invalid email address";
  }

  if (!isRequired(subject)) {
    errors.subject = "Subject is required";
  }

  if (!isRequired(description)) {
    errors.description = "Description is required";
  }

  if (!isValidPriority(priority)) {
    errors.priority = "Priority must be low, medium, or high";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateComment = (comment) => {
  if (!isRequired(comment)) {
    return {
      isValid: false,
      message: "Comment is required",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

module.exports = {
  isRequired,
  isValidEmail,
  isValidPriority,
  isValidStatus,
  validateTicket,
  validateComment,
};