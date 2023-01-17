import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login";
import Navbar from "./pages/Shared/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Auth/SignUp";
import Requisition from "./pages/Dashboard/Requisition/Requisition";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import RequisitionAuthorize from "./pages/Dashboard/Requisition/RequisitionAuthorize";
import RequisitionApproval from "./pages/Dashboard/Requisition/RequisitionApproval";
import RequisitionIssue from "./pages/Dashboard/Requisition/RequisitionIssue";
import AddInventory from "./pages/Dashboard/AddInventory/AddInventory";
import CurrentStock from "./pages/Dashboard/CurrentStock/CurrentStock";
import StockAdjust from "./pages/Dashboard/StockAdjust/StockAdjust";
import Supplier from "./pages/Dashboard/Supplier/Supplier";
import Product from "./pages/Dashboard/Products/Product";
import Employee from "./pages/Dashboard/Employee/Employee";
import UserManagement from "./pages/Dashboard/UserManagement/UserManagement";
import AddNewUser from "./pages/Dashboard/UserManagement/AddNewUser";
import KeyType from "./pages/Dashboard/Settings/Library/KeyType";
import Department from "./pages/Dashboard/Settings/Department/Department";
import Designation from "./pages/Dashboard/Settings/Designation/Designation";
import ProductKey from "./pages/Dashboard/Settings/Productkey/ProductKey";
import ProductIssue from "./pages/Dashboard/Reports/ProductIssue";
import Inventory from "./pages/Dashboard/Reports/Inventory";
import EmployeeUser from "./pages/Dashboard/Reports/EmployeeUser";
import EditKeyType from "./pages/Dashboard/Settings/Library/EditKeyType";
import AddNewEmployee from "./pages/Dashboard/Employee/AddNewEmployee";
import DesignationAdd from "./pages/Dashboard/Settings/Designation/DesignationAdd";
import DesignationEdit from "./pages/Dashboard/Settings/Designation/DesignationEdit";
import ProductAddKey from "./pages/Dashboard/Settings/Productkey/ProductAddKey";
import ProductKeyEdit from "./pages/Dashboard/Settings/Productkey/ProductKeyEdit";
import Setting from "./pages/Dashboard/Settings/Setting";
import DepartmentEdit from "./pages/Dashboard/Settings/Department/DepartmentEdit";
import BudgetCode from "./pages/Dashboard/Settings/Library/BudgetCode/BudgetCode";
import BudgetCodeEdit from "./pages/Dashboard/Settings/Library/BudgetCode/BudgetCodeEdit";
import ProductAdd from "./pages/Dashboard/Products/ProductAdd";
import ProductEdit from "./pages/Dashboard/Products/ProductEdit";
import CreateSupplier from "./pages/Dashboard/Supplier/CreateSupplier";
import SupplierEdit from "./pages/Dashboard/Supplier/SupplierEdit";
import AddNewInventory from "./pages/Dashboard/AddInventory/AddNewInventory";

function App() {
  return ( 
  <>
    <Navbar> </Navbar>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/dashboard" element={<Dashboard />}>

      <Route index element={<DashboardHome/>}/>
        <Route path="requisition" element={<Requisition />}/>
        <Route path="requisitionAuthorize" element={<RequisitionAuthorize/>}/>
        <Route path="requisitionApproval" element={<RequisitionApproval/>}/>
        <Route path="requisitionIssue" element={<RequisitionIssue/>}/>
        <Route path="addInventory" element={<AddInventory/>}/>
        <Route path="addNewInventory" element={<AddNewInventory />}/>
        <Route path="currentStock" element={<CurrentStock/>}/>
        <Route path="stockAdjust" element={<StockAdjust/>}/>
        <Route path="supplier" element={<Supplier/>}/>
        <Route path="supplierEdit/:id" element={<SupplierEdit/>}/>
        <Route path="createSupplier" element={<CreateSupplier/>}/>
        <Route path="product" element={<Product/>}/>
        {/* <Route path="reports" element={<Reports/>}/> */}
        <Route path="reports/productIssue" element={<ProductIssue/>}/>
        <Route path="reports/inventory" element={ <Inventory />}/>
        <Route path="reports/employeeUser" element={ <EmployeeUser />} />
        <Route path="employee" element={<Employee/>}/>
        <Route path="addNewEmployee" element={< AddNewEmployee />}/>
        <Route path="userManagement" element={<UserManagement/>}/>
        <Route path="addNewUser" element={<AddNewUser/>}/>
        <Route path="keyType" element={<KeyType/>}/>
        <Route path="keyEdit/:id" element={<EditKeyType/>}/>
        <Route path="department" element={<Department/>}/>
        <Route path="designation" element={<Designation/>}/>
        <Route path="departmentEdit/:id" element={<DepartmentEdit/>}/>
        <Route path="designationAdd" element={<DesignationAdd/>}/>
        <Route path="designationEdit/:id" element={<DesignationEdit/>}/>
        <Route path="productKey" element={<ProductKey/>}/>
        <Route path="productKeyAdd" element={<ProductAddKey/>}/>
        <Route path="productKeyEdit/:id" element={<ProductKeyEdit/>}/>
        <Route path="budgetCode" element={<BudgetCode/>}/>
        <Route path="budgetCodeEdit/:id" element={<BudgetCodeEdit/>}/>
        <Route path="setting" element={<Setting/>}/>
        <Route path="productAdd" element={<ProductAdd/>}/>
        <Route path="productEdit/:id" element={<ProductEdit/>}/>
      </Route>
    </Routes>
    <ToastContainer />
  </>
  );
}

export default App;
