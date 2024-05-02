import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Cookies from "js-cookie"; // Import Cookies library
import requestApi from "../utils/axios";


function SideBar(props) {
  const [activeItem, setActiveItem] = useState("");
  const [sidebarItems, setSidebarItems] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchSidebarItems = async () => {
      try {
        const role = Cookies.get('role');
        const response = await requestApi("GET", `/auth/resources?role=${role}`);
        if (response.success) {
          setSidebarItems(response.data);
        } else {
          console.error("Error fetching sidebar items:", response.error);
        }
      } catch (error) {
        console.error("Error fetching sidebar items:", error);
      }
    };

    fetchSidebarItems();
  }, []);

  useEffect(() => {
    // Extract the pathname from the location object
    const pathname = location.pathname;

    // Set the active item based on the current pathname
    const activeItem = sidebarItems.find(item => item.path === pathname);
    if (activeItem) {
      setActiveItem(activeItem.name);
    }
  }, [location, sidebarItems]);

  return (
    <div
      className={props.open ? "app-sidebar sidebar-open" : "app-sidebar"}
      style={{
        backgroundColor: "#d7d7da",
        borderRight: "0.1px solid rgba(128, 128, 128, 0.296)"
      }}
    >
      <ul className="list-div">
        {sidebarItems.map(item => (
          <li
            key={item.path}
            className={`list-items ${activeItem === item.name ? "active" : ""}`}
            onClick={() => setActiveItem(item.name)}
          >
            <Link className="link" to={item.path}>
              <DashboardIcon sx={{ marginRight: "10px" }} />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
