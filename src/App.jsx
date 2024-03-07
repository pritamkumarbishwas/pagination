import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      // console.error("Error fetching employees:", error);
      alert("failed to fetch data");
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h3>Employee Data Table</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp, i) => (
            <tr key={i}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length > 0 &&
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          {[...Array(Math.ceil(employees.length / employeesPerPage))].map((_, i) => (
            <span key={i} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'selectedPage' : ''}>
              {i + 1}
            </span>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}>Next</button>
        </div>
      }

    </div>
  );
}

export default App;
