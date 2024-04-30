import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';


function SideBar(props) {
    return (
        <div
            className={props.open ? "app-sidebar sidebar-open" : "app-sidebar"}
            style={{
                backgroundColor: "white",
                borderRight:"0.1px solid rgba(128, 128, 128, 0.296)",
            }}
        >
            <ul className="list-div">
                    <li className="list-items"><Link className="link" to="/dashboard"><DashboardIcon sx={{marginRight:"10px"}}/>Dashboard</Link></li>
                    <li className="list-items"> <Link className="link" to="/"><DashboardIcon sx={{marginRight:"10px"}}/>Registration</Link></li>
            </ul>
        </div>
    );
}

export default SideBar;


