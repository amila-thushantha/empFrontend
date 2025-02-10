import axios from "axios";

const EMPLOYEE_BASE_REAT_API_URL="http://localhost:8080/api/v1/employees";

class EmployeeService{

    getEmployees(){
        return axios.get(EMPLOYEE_BASE_REAT_API_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REAT_API_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_BASE_REAT_API_URL + '/' + employeeId);
    }

    updateEmployee(employeeId, employee){
        return axios.put(EMPLOYEE_BASE_REAT_API_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        console.log(`Attempting to delete employee with ID: ${employeeId}`); // Debug log
        return axios.delete(`${EMPLOYEE_BASE_REAT_API_URL}/${employeeId}`);
    }
 }

 export default new EmployeeService();
