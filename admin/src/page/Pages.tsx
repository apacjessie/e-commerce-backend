import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Inventory from "./dashboard/Inventory";
import Customers from "./dashboard/Customers";
import Modify from "./dashboard/inventory/Modify";
import Add from "./dashboard/inventory/Add";
import Stock from "./dashboard/inventory/Stock";
import Orders from "./dashboard/customer/Orders";
import Activity from "./dashboard/activity/Activity";
import Home from "./Home";
import Delete from "./dashboard/inventory/Delete";
import TrackOrder from "./dashboard/customer/TrackOrder";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="inventory">
          <Route index element={<Inventory />} />
          <Route path="add" element={<Add />} />
          <Route path="modify" element={<Modify />} />
          <Route path="delete" element={<Delete />} />
          <Route path="stock" element={<Stock />} />
        </Route>
        <Route path="customers">
          <Route index element={<Customers />} />
          <Route path="order" element={<Orders />} />
          <Route path="track-order" element={<TrackOrder />} />
        </Route>
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
};

export default Pages;
