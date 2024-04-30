import React from "react";
import "./styles.css";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function TopBar(props) {
    return (
        <div className="app-topbar"
            style={{
                backgroundColor: "white",
                display: "flex",
                padding: "10px 10px",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                borderBottom: "0.1px solid rgba(128, 128, 128, 0.296)"
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                justifyContent: "center",
            }}>
                <div onClick={props.sidebar} className="sidebar-menu">
                    <MenuRoundedIcon />
                </div>
                <div className="app-name">STORES</div>
            </div>
            <div className="topbar-right-content">
                <div className="search-input">
                    <div style={{ display: "flex", gap: 10 }}>
                        <SearchRoundedIcon fontSize="sm" color="grey" />
                        <input placeholder="Search" />
                    </div>
                </div>
                <div>
                    <MoreVertIcon />
                </div>
            </div>
        </div>
    );
}

export default TopBar;
