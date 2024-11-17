import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Back from "../../assets/icons/Back";
import InputField from "../UI/InputField";
import RadioGroup from "../UI/RadioGroup";
import SelectField from "../UI/SelectField";
import CheckboxField from "../UI/CheckboxField";
import { Bounce, toast } from "react-toastify";

const UpdateForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: [],
    f_IsActive: "false",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [existEmailError, setExistEmailError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle checkbox selection
  const CheckboxSelection = (e) => {
    const value = e.target.value; // Get the value of the checkbox
    const isChecked = e.target.checked; // Determine if it is checked

    setFormData((prevState) => ({
      ...prevState, // Preserve other state properties
      f_Course: isChecked
        ? [...prevState.f_Course, value] // Add the value if checked
        : prevState.f_Course.filter((item) => item !== value), // Remove if unchecked
    }));
  };

  // convert image into 64 bytes

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    reader.readAsDataURL(file);
    return data;
  };

  // handle upload images
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    const image = await imagebase64(file);
    // console.log(image);

    setFormData((prevState) => ({
      ...prevState, // Preserve other state properties
      f_Image: image, // Replace previous image with the new one
    }));
  };

  useEffect(() => {
    const getEmployeeDetalisById = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employee/${id}`);
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setFormData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmployeeDetalisById();
  }, []);

  console.log(formData);

  const handleUpadate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/employee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { message, error } = await response.json();
        console.log(error || message);
        setErrors(error || message);
        setExistEmailError(message);
        return;
      } else {
        const data = await response.json();
        console.log(data);
        toast.success(`🦄 ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/employees")
        console.log("sucess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-section">
      <div className="section-name">Update Employee</div>
      <div className="customer-form">
        <Link to="/employees" className="return-icon">
          <Back />
        </Link>
        <form className="form-container">
          <h1>Update Employee</h1>

          <div className="row">
            <InputField
              label="Name"
              name="f_Name"
              value={formData.f_Name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.f_Name}
            />
            <InputField
              label="Email"
              name="f_Email"
              value={formData.f_Email}
              onChange={handleChange}
              placeholder="Enter your Email"
              error={errors.f_Email || existEmailError}
            />
            <RadioGroup
              label="Gender"
              name="f_Gender"
              value={formData.f_Gender}
              onChange={handleChange}
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
              ]}
              error={errors.f_Gender}
            />
          </div>

          <div className="row">
            <InputField
              label="Mobile No"
              name="f_Mobile"
              value={formData.f_Mobile}
              onChange={handleChange}
              placeholder="Phone number"
              error={errors.f_Mobile}
            />

            <SelectField
              label="Designation"
              name="f_Designation"
              value={formData.f_Designation}
              onChange={handleChange}
              options={["HR", "Manger", "Sales"]}
              error={errors.f_Designation}
            />
            <CheckboxField
              label="Course"
              name="f_Course"
              value={formData.f_Course}
              onChange={CheckboxSelection}
              options={["BSC", "BCA", "MCA"]}
              error={errors.f_Course}
            />
          </div>

          <div className="row">
            <RadioGroup
              label="IsActive"
              name="f_IsActive"
              value={formData.f_IsActive.toString()}
              onChange={handleChange}
              options={[
                { name: "Active", value: "true" },
                { name: "Deactive", value: "false" },
              ]}
              error={errors.f_IsActive}
            />
            <InputField
              label="Img Upload"
              type="file"
              name="f_Image"
              value={formData.f_Image}
              onChange={handleUploadImage}
              placeholder="Enter Your image"
              error={errors.f_Image}
            />
            {formData.f_Image && (
              <div className="form-group col image-display">
                <img src={formData.f_Image} width="50px" height="50px" alt="" />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="submit-button"
              onClick={handleUpadate}
            >
              Create New Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
