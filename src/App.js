import { Route, Routes } from "react-router-dom";
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
import Reports from "./pages/Dashboard/Reports/Reports";
import Employee from "./pages/Dashboard/Employee/Employee";
import UserManagement from "./pages/Dashboard/UserManagement/UserManagement";
import KeyType from "./pages/Dashboard/Settings/Library/KeyType";
import Department from "./pages/Dashboard/Settings/Department";
import Designation from "./pages/Dashboard/Settings/Designation";
import ProductKey from "./pages/Dashboard/Settings/ProductKey";

function App() {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard />}>

          <Route path="dashboardhome" element={<DashboardHome/>}/>
          <Route path="requisition" element={<Requisition />}/>
          <Route path="requisitionAuthorize" element={<RequisitionAuthorize/>}/>
          <Route path="requisitionApproval" element={<RequisitionApproval/>}/>
          <Route path="requisitionIssue" element={<RequisitionIssue/>}/>
          <Route path="addInventory" element={<AddInventory/>}/>
          <Route path="currentStock" element={<CurrentStock/>}/>
          <Route path="stockAdjust" element={<StockAdjust/>}/>
          <Route path="supplier" element={<Supplier/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path="reports" element={<Reports/>}/>
          <Route path="employee" element={<Employee/>}/>
          <Route path="userManagement" element={<UserManagement/>}/>
          <Route path="keyType" element={<KeyType/>}/>
          <Route path="department" element={<Department/>}/>
          <Route path="designation" element={<Designation/>}/>
          <Route path="productKey" element={<ProductKey/>}/>

        </Route>
       
      
          
        
      </Routes>
    </Navbar>
  );
}

export default App;
