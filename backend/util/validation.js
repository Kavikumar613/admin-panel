// Utility to validate email format
const validateEmail = (email) => {
  // Simple email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility to validate Mobile number
const validateMobile = (mobile) => {
  // Basic mobile number regex (10 digits)
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

// Utility to validate file upload

const validateFormData = (formData) => {
  const error = {};
  const mimeType = formData.f_Image.split(";")[0].split(":")[1];

  // email server-side validation
  if (!formData.f_Email) {
    error.f_Email = "Email is required";
  } else if (!validateEmail(formData.f_Email)) {
    error.f_Email = "Please enter valid email";
  }

  // Mobile server-side validation
  if (!formData.f_Mobile) {
    error.f_Mobile = "Mobile number is required";
  } else if (isNaN(formData.f_Mobile)) {
    error.f_Mobile = "Please enter valid phone number";
  } else if (!validateMobile(formData.f_Mobile)) {
    error.f_Mobile = "Please enter 10 digit number";
  }

  // file upload server-side validation
  if (!formData.f_Image) {
    error.f_Image = "Image is required";
  }
   else if (mimeType !== "image/png" && mimeType !== "image/jpeg") {
    error.f_Image = "Invalid image format. Only PNG and JPG are allowed.";
    console.log(mimeType);
  }

  // Other require validation
  if (!formData.f_Name) error.f_Name = "Employee is required";
  if (!formData.f_Designation) error.f_Designation = "designation is required";
  if (!formData.f_Gender) error.f_Gender = "Gender is required";
  if (formData.f_Course <= 0) error.f_Course = "Course is required";
  if (!formData.f_IsActive) error.f_IsActive = "IsActive is required";

  return error;
};



const generateLowercaseUniqueId = () => {
  const randomNum = Math.floor(Math.random() * 4294967295);
  const hexId = randomNum.toString(16).padStart(8, "0"); // No need for `.toUpperCase()`
  return hexId; // Returns the unique ID in lowercase
};



export { validateFormData , generateLowercaseUniqueId };
