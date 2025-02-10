import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) { // Check if id exists before fetching employee details
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          console.log(response.data);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmailId(response.data.emailId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]); // Dependency array should include `id`

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };

    if (id) {
      EmployeeService.updateEmployee(id, employee)
        .then(() => navigate('/employees'))
        .catch((error) => console.log(error));
    } else {
      EmployeeService.createEmployee(employee)
        .then(() => navigate('/employees'))
        .catch((error) => console.log(error));
    }
  };

  const title = () => {
    return id ? <h3 className='text-center'>Update Employee</h3> : <h3 className='text-center'>Add Employee</h3>;
  };

  return (
    <div>
      <br /><br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            {title()}
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>First Name</label>
                  <input
                    type='text'
                    placeholder='Enter First Name'
                    className='form-control'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Last Name</label>
                  <input
                    type='text'
                    placeholder='Enter Last Name'
                    className='form-control'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Email Id</label>
                  <input
                    type='text'
                    placeholder='Enter Email Id'
                    className='form-control'
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>
                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Save</button>
                <Link to="/employees" className='btn btn-danger'>Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeComponent;
