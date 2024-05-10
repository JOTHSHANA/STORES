import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "../Button/Button";

function TopBar(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="app-topbar"
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div onClick={props.sidebar} className="sidebar-menu">
          <MenuRoundedIcon sx={{ color: "#472d2d",cursor:"pointer" }} />
        </div>
        <div className="app-name">STORES</div>
      </div>
      <div className="topbar-right-content">
        
        <div onClick={handleOpenModal}>
          <MoreVertIcon sx={{ color: "#63228B", cursor:"pointer" }} />
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="model"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            width:"30%",
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            flexDirection: "column"
          }}
        >
          <h3 id="modal-modal-description">
            Are you sure you want to logout?
          </h3>
          <div className="logout-buttons">
              <Button onClick={handleCloseModal} label="CANCEL"/>
              <Button
                onClick={handleCloseModal}
                label="LOGOUT"
              />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TopBar;
