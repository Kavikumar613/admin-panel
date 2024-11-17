import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./model.css";
import { Bounce, toast } from "react-toastify";
const DeleteModal = ({ deleteData, setIsOPen, fetchEmployees }) => {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef();
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Add the classes to the body when the modal is active
    document.body.classList.add("dimmable", "dimmed");

    // Cleanup function to remove the classes when the modal is closed/unmounted
    return () => {
      document.body.classList.remove("dimmable", "dimmed");
    };
  }, []);

  const handleClose = () => {
    // Manually remove the classes when the modal is closed
    document.body.classList.remove("dimmable", "dimmed");
    setIsOPen(false);
    // onClose(); // Proceed with the original close logic (like navigating away)
  };

  // handle out side click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && buttonRef.current) {
        if (
          !menuRef.current.contains(e.target) &&
          !buttonRef.current.contains(e.target)
        ) {
          handleClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // delete single employee details
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/employee/${deleteData._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        console.log(message);
        handleClose();
        return;
      }
      const { message } = await response.json();
      console.log(message);
      toast.success(`🦄 ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  return (
    <div className="ui page modals dimmer ui-dimmer transition visible active">
      <div
        className="ui small single-modal  transition visible active"
        ref={menuRef}
      >
        <div className="header">Delete Customer </div>
        {!loading && (
          <>
            <div className="form-content">
              <div>
                Are you sure you want to delete the employee with ID{" "}
                <strong>{deleteData.f_Id} ?</strong> and Name{" "}
                <strong>{deleteData.f_Name} </strong> from the employee table?
              </div>
            </div>
            <div className="actions">
              <div className="ui grid">
                <div className="eight wide column">
                  <button
                    type="button"
                    className="ui blue circular actions fluid inverted button"
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                </div>
                <div className="eight wide column">
                  <button
                    ref={buttonRef}
                    type="button"
                    className="ui red circular actions fluid button"
                    onClick={handleClose}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="form-content mt-5">
            <div className="w-25 h-25 mt-5">Deleteing..</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
