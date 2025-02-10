import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
        
    }, []);

    const getEmployees = () => {
        EmployeeService.getEmployees()
            .then((response) => {
                setEmployees(response.data);
                console.log("Employees loaded:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    };

    // const deleteEmployee = (employeeId) => {
    //     EmployeeService.deleteEmployee(employeeId)
    //     console.log(employeeId)
    //         .then(() => {
    //             setEmployees(employees.filter(emp => emp.id !== employeeId));
    //         })
    //         .catch(error => {
    //             console.error("Error deleting employee:", error);
    //         });
    // };
    
    
    const deleteEmployee = (employeeId) => {
        console.log("Deleting employee:", employeeId);
        
        EmployeeService.deleteEmployee(employeeId) // Ensure this returns a Promise
            .then(() => {
                console.log("Employee deleted successfully.");
                setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });
    };
    
    

    return (
        <div className='container'>
            <h2 className='text-center'>List Employees</h2>
            <Link to='/add-employee' className='btn btn-primary mb-2'>Add Employee</Link>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>
                                    <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)}
                                
                                        style={{ marginLeft: "10px" }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent;
