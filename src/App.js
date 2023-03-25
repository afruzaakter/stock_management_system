import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Navbar from "./pages/Shared/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/Auth/SignUp";
import Requisition from "./pages/Dashboard/Requisition/UserRequisition/Requisition";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import RequisitionAuthorize from "./pages/Dashboard/Requisition/Authorize/RequisitionAuthorize";
import RequisitionIssue from "./pages/Dashboard/Requisition/Issue/RequisitionIssue";
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
import ProductIssue from "./pages/Dashboard/Reports/ProductIssueReports/ProductIssue";
import Inventory from "./pages/Dashboard/Reports/InventoryReports/Inventory";
import UserReport from "./pages/Dashboard/Reports/EmployeeReports/UserReport";
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
import UserEdit from "./pages/Dashboard/UserManagement/UserEdit";
import Login from "./pages/Auth/Login";
import StockAdjustAdd from "./pages/Dashboard/StockAdjust/StockAdjustAdd";
import RequisitionCreate from "./pages/Dashboard/Requisition/UserRequisition/RequisitionCreate";
import DepartmentAdd from "./pages/Dashboard/Settings/Department/DepartmentAdd";
import RequireAuth from "./pages/Auth/RequireAuth";
import AllUsers from "./pages/Dashboard/AllUsers/AllUsers";
import NotFoundPage from "./pages/Shared/NotFoundPage";
import EmployeeReport from "./pages/Dashboard/Reports/EmployeeReports/EmployeeReport";
import DepartmentDesignationReport from "./pages/Dashboard/Reports/EmployeeReports/DepartmentDesignationReport";
import PreviewRequisition from "./pages/Dashboard/Requisition/UserRequisition/PreviewRequisition";
import PreviewAuthorize from "./pages/Dashboard/Requisition/Authorize/PreviewAuthorize";
import RequisitionApproval from "./pages/Dashboard/Requisition/Approval/RequisitionApproval";
import PreviewApproval from "./pages/Dashboard/Requisition/Approval/PreviewApproval";
import PreviewIssue from "./pages/Dashboard/Requisition/Issue/PreviewIssue";
import RequisitionEdit from "./pages/Dashboard/Requisition/UserRequisition/RequisitionEdit";


function App() {
  return (
    <>
      <Navbar> </Navbar>
      <Routes>
        <Route path="/" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/" element={<RequireAuth> <Dashboard /> </RequireAuth> } /> */}

        <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>}>
          <Route index element={<DashboardHome />} />
          <Route path="requisition" element={<Requisition />} />
          <Route path="requisitionCreate" element={<RequisitionCreate />} />
          <Route path="requisition/preview/:id" element={<PreviewRequisition />} />
          <Route path="requisition/preview/edit/:id" element={<RequisitionEdit />} />
          <Route path="requisitionAuthorize" element={<RequisitionAuthorize />} />
          <Route path="previewAuthorize/:id" element={<PreviewAuthorize/>} />
          <Route path="requisitionApproval" element={<RequisitionApproval />} />
          <Route path="previewApproval/:id" element={<PreviewApproval/>} />
          <Route path="requisitionIssue" element={<RequisitionIssue />} />
          <Route path="previewIssue/:id" element={<PreviewIssue/>} />

          <Route path="addInventory" element={<AddInventory />} />
          <Route path="addNewInventory" element={<AddNewInventory />} />

          <Route path="currentStock" element={<CurrentStock />} />
          <Route path="stockAdjust" element={<StockAdjust />} />
          <Route path="stockAdjustAdd" element={<StockAdjustAdd />} />

          <Route path="supplier" element={<Supplier />} />
          <Route path="supplierEdit/:id" element={<SupplierEdit />} />
          <Route path="createSupplier" element={<CreateSupplier />} />
          <Route path="product" element={<Product />} />

          <Route path="reports/productIssue" element={<ProductIssue />} />
          <Route path="reports/inventory" element={<Inventory />} />
          <Route path="reports/employeeReport" element={<EmployeeReport />} />
          <Route path="reports/userReport" element={<UserReport />} />
          <Route path="reports/departmentDesignationReport" element={<DepartmentDesignationReport />} />

          <Route path="employee" element={<Employee />} />
          <Route path="addNewEmployee" element={< AddNewEmployee />} />

          <Route path="userManagement" element={<UserManagement />} />
          <Route path="addNewUser" element={<AddNewUser />} />
          <Route path="userEdit/:id" element={<UserEdit />} />

          <Route path="allUsers" element={<AllUsers />} />

          <Route path="setting" element={<Setting />} />
          <Route path="keyType" element={<KeyType />} />
          <Route path="keyEdit/:id" element={<EditKeyType />} />
          <Route path="department" element={<Department />} />
          <Route path="departmentAdd" element={<DepartmentAdd />} />
          <Route path="departmentEdit/:id" element={<DepartmentEdit />} />

          <Route path="designation" element={<Designation />} />
          <Route path="designationAdd" element={<DesignationAdd />} />
          <Route path="designationEdit/:id" element={<DesignationEdit />} />

          <Route path="productKey" element={<ProductKey />} />
          <Route path="productKeyAdd" element={<ProductAddKey />} />
          <Route path="productKeyEdit/:id" element={<ProductKeyEdit />} />

          <Route path="budgetCode" element={<BudgetCode />} />
          <Route path="budgetCodeEdit/:id" element={<BudgetCodeEdit />} />

          <Route path="productAdd" element={<ProductAdd />} />
          <Route path="productEdit/:id" element={<ProductEdit />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
