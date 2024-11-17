import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DownArrow from "../assets/icons/DownArrow";
import UpArrow from "../assets/icons/UpArrow";
import Show from "../assets/icons/Show";
import Trash from "../assets/icons/Trash";
import Seperate from "../assets/icons/Seperate";
import DeleteModal from "./modal/DeleteModal";
import { Bounce, toast } from "react-toastify";

const EmployeeTable = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit); // Total pages
  const navigate = useNavigate();
  const [isOpen, setIsOPen] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const headers = [
    { title: "Unique Id", sortable: true, value: "f_Id" },
    { title: "Image", sortable: false },
    { title: "Name", sortable: true, value: "f_Name" },
    { title: "Email", sortable: true, value: "f_Email" },
    { title: "Mobile No", sortable: false },
    { title: "Designation", sortable: false },
    { title: "Gender", sortable: false },
    { title: "Course", sortable: false },
    { title: "Create Date", sortable: true, value: "createData" },
    { title: "Status", sortable: false },
    { title: "Action", sortable: false },
  ];

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit,
        search,
        sortBy,
        order,
      }).toString();

      const response = await fetch(
        `http://localhost:8000/employee?${queryParams}`
      );

      if (response.ok) {
        const data = await response.json();
        setEmployees(data.data);
        setCount(data.count);
        setTotal(data.total);
        setLoading(false);
      } else {
        console.log("Failed to serch Employees");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // upadate single user status without need update form
  const toggleActive = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/employee/${id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        toast.success(`🦄 Status Upadated`, {
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
      } else {
        toast.error(`🦄 Something went wrong`, {
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
      }
    } catch (error) {
      toast.error(`🦄 Something went wrong`, {
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
    }

    fetchEmployees();
  };

  // fetch employee list
  useEffect(() => {
    fetchEmployees();
  }, [search, sortBy, order, page, limit]);

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page for new search
  };

  // handle sorting
  const handleSort = (field) => {
    setSortBy(field);
    setOrder((preOrder) => (preOrder === "asc" ? "desc" : "asc"));
  };

  const handleDelete = (data) => {
    setDeleteData(data);
    setIsOPen(true);
    console.log(deleteData);
  };

  // Handle page navigation
  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="customer-table-container">
        <div className="customer-table-header">
          <div className="section-heading">Employee Table</div>
          <div className="employee-create">
            <span className="employee-count">Total Count : {count}</span>
            <Link className="add-link" to="/employee/add">
              + Add Employee
            </Link>
          </div>
          <div className="filter-row">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              onChange={handleSearch}
            />
          </div>
        </div>
        {!loading ? (
          <table className="customer-table ">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th className="header-wrap" key={index}>
                    <div
                      className="table-header"
                      onClick={() =>
                        header.sortable && handleSort(header.value)
                      }
                    >
                      <span>{header.title}</span>
                      {header.sortable && (
                        <span className="icons">
                          {sortBy === header.value && order === "asc" ? (
                            <UpArrow />
                          ) : (
                            <DownArrow />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.f_Id}</td>
                  <td>
                    <img
                      src={customer.f_Image}
                      alt={customer.f_Name}
                      width="50px"
                      height="30px"
                    />
                  </td>
                  <td>{customer.f_Name}</td>
                  <td>{customer.f_Email}</td>
                  <td>{customer.f_Mobile}</td>
                  <td>
                    {customer.f_Designation.charAt(0).toUpperCase() +
                      customer.f_Designation.slice(1).toLowerCase()}
                  </td>
                  <td>
                    {customer.f_Gender.charAt(0).toUpperCase() +
                      customer.f_Gender.slice(1).toLowerCase()}
                  </td>
                  <td>{customer.f_Course[0].toUpperCase()}</td>

                  <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td onClick={() => toggleActive(customer._id)}>
                    {customer.f_IsActive ? (
                      <span className="employee-active">Active</span>
                    ) : (
                      <span className="employee-deactive">Deactive</span>
                    )}
                  </td>
                  <td>
                    <div className="action-cell">
                      <Link to={`/employee/edit/${customer._id}`}>
                        <Show />
                      </Link>
                      <span>
                        <Seperate />
                      </span>
                      <span onClick={() => handleDelete(customer)}>
                        <Trash />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="spinner-container">
            <div class="spinner">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {/* Pagination Controls */}
        <div className="pagination">
          {/* Back Button */}
          <button
            disabled={page === 1}
            onClick={() => handlePageClick(page - 1)}
          >
            Back
          </button>

          {/* First Page and Ellipsis */}
          {page > 3 && (
            <>
              <button onClick={() => handlePageClick(1)}>1</button>
              {page > 4 && <span className="ellipsis">...</span>}
            </>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageIndex = index + 1;
            if (pageIndex >= page - 2 && pageIndex <= page + 2) {
              return (
                <button
                  key={pageIndex}
                  className={pageIndex === page ? "active" : ""}
                  onClick={() => handlePageClick(pageIndex)}
                >
                  {pageIndex}
                </button>
              );
            }
            return null;
          })}

          {/* Last Page and Ellipsis */}
          {page < totalPages - 2 && (
            <>
              {page < totalPages - 3 && <span className="ellipsis">...</span>}
              <button onClick={() => handlePageClick(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => handlePageClick(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {isOpen && (
        <DeleteModal
          deleteData={deleteData}
          setIsOPen={setIsOPen}
          fetchEmployees={fetchEmployees}
        />
      )}
    </>
  );
};

export default EmployeeTable;
