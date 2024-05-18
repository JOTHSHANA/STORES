import React, { useState, useEffect } from "react";
import RoleCheck from "../auth/RoleResource/resources";
import AppLayout from "../../components/applayout/AppLayout";
import "../AllTasks/AllTasks.css";
import requestApi from "../../components/utils/axios";
import Button from "../../components/Button/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import nopending from "../../assets/nopending.png";
// import TaskForm from "../TaskForm/TaskForm"

function Approvals() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false); // State for TaskForm dialog
    const [receivedQty, setReceivedQty] = useState(0); // State to store received_qty
    const id = Cookies.get("id");
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [advance, setAdvance] = useState();
    const [purchaseOrderNum, setPurchaceOrderNum] = useState();
    const [loading, setLoading] = useState(true); // State for loading
    const [ref_no, setRef_no] = useState("");



    useEffect(() => {
        fetchTaskData();
    }, [id]);

    const fetchTaskData = async () => {
        try {
            const role_id = Cookies.get("role");
            let apiEndpoint = "";

            // Determine API endpoint based on role_id
            switch (role_id) {
                case "1":
                    apiEndpoint = `/status/req-person?req_person=${id}`;
                    break;
                case "4":
                    apiEndpoint = "/status/stores";
                    break;
                case "5":
                    apiEndpoint = "/status/pteam";
                    break;

                case "6":
                    apiEndpoint = "/status/accounts";
                    break;
                default:
                    throw new Error("Invalid role ID");
            }

            const response = await requestApi("GET", apiEndpoint);
            if (!response.data || !response.success) {
                throw new Error("Failed to fetch task data");

            }
            const data = response.data;
            setTaskData(data);
        } catch (error) {
            console.error("Error fetching task data:", error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    const handleClickOpen = (task) => {
        setSelectedTask(task);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTaskFormOpen = () => {
        setOpenTaskForm(true);
    };

    const handleTaskFormClose = () => {
        setOpenTaskForm(false);
    };

    const handleIntimateFaculty = async () => {
        console.log(selectedTask.task_id);
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            // Update the values id and received_qty via /status/pteam-person
            const response = await requestApi(
                "PUT",
                `/status/person-advance?id=${selectedTask.task_id}`,
                {
                    received_qty: receivedQty, // Use the state receivedQty
                }
            );
            console.log(response);
            // Close the dialog after successful update
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error updating values:", error);
        }
    };

    const handleUpdateAdvanceNo = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/pteam?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleAdvanceYes = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/pteam-advance?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleReceived = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/person-stores?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleUpdateAcc = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/req-accounts?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleBillStatus = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/pteam-close?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleQuotationPass = async () => {
        console.log(selectedTask.task_id);
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/stores-1?id=${selectedTask.task_id}`,
                {
                    purchase_order: purchaseOrderNum,
                }
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handlePurchaseOrder = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/stores-2?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handletemp = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/stores-3?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handlefullyreceived = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/stores-products?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handlebillreceived = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/stores-bill?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleBillSent = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/stores-sent?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleAdvancePaid = async () => {
        console.log(ref_no);
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/accounts-advance?id=${selectedTask.task_id}`,
                {
                    ref_no: ref_no,
                }
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleFinalPayment = async () => {
        try {
            if (!selectedTask) {
                throw new Error("No task selected");
            }
            const response = await requestApi(
                "PUT",
                `/status/accounts-pay?id=${selectedTask.task_id}`
            );
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error("Error sending id to backend:", error);
        }
    };

    const handleReceivedQtyChange = (event) => {
        setReceivedQty(event.target.value);
    };

    const handleApproveClick = () => {
        console.log("afuvbubfuavaeffe");
        setShowAdditionalButtons(true); // Toggle the visibility of additional buttons
    };
    const handleShowInput = () => {
        setShowInput(true);
    };

    const handleAdvanceNeededYesClick = async () => {
        // Handle logic when "Advance needed: Yes" button is clicked
    };

    const handleAdvanceNeededNoClick = async () => {
        // Handle logic when "Advance needed: No" button is clicked
    };

    const steps = [
        "Initiated",
        "Approved",
        "Products",
        "Bill pass",
        "Payment",
    ];

    return (
        <div>
            <div className="workspace-div">
                {loading ? (
                    <div className="loader-page">
                        <div className="loader"></div>
                    </div>
                ) : taskData.length === 0 ? (
                    <div className="no-approvals">
                        <img src={nopending} alt="img" className="nopending-img" />
                        No pending approvals...
                    </div>
                ) : (
                    taskData.map((task, index) => (
                        <div
                            className="card"
                            key={index}
                            onClick={() => handleClickOpen(task)}
                        >
                            <div>
                                <p className="card-heading">
                                    <strong>TASK ID:</strong> {task.task_id}
                                </p>
                                <hr />
                                <div className="details-div">
                                    <div className="each-detail">
                                        <div>
                                            <strong>Requested Person :</strong>
                                        </div>
                                        <p className="info">{task.name}</p>
                                    </div>
                                    <div className="each-detail">
                                        <strong>Product Details :</strong>
                                        <p className="info">{task.product_details}</p>
                                    </div>
                                </div>
                            </div>
                            <Box sx={{ width: "100%" }}>
                                <Stepper activeStep={3} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step
                                            key={label}
                                            sx={{
                                                '& .MuiStepLabel-root .Mui-completed': {
                                                    color: '#493d88aa', // circle color (COMPLETED)
                                                },
                                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                                                    color: '#493d88', // Just text label (COMPLETED)
                                                    fontWeight: "700"
                                                },
                                                '& .MuiStepLabel-root .Mui-active': {
                                                    color: '#493d88', // circle color (ACTIVE)
                                                    fontWeight: "700",
                                                },
                                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                                                    color: '#493d88', // Just text label (ACTIVE)
                                                },
                                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                                    fill: 'common.white', // circle's number (ACTIVE)
                                                },
                                            }}
                                        >
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </div>
                    ))
                )}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">DETAILS</DialogTitle>
                <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={3} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label} sx={{
                                paddingBottom: "10px",
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: '#493d88aa', // circle color (COMPLETED)
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#493d88', // Just text label (COMPLETED)
                                    fontWeight: "700"
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: '#493d88', // circle color (ACTIVE)
                                    fontWeight: "700",
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#493d88', // Just text label (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: 'common.white', // circle's number (ACTIVE)
                                },
                            }}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        style={{ color: "black" }}
                    >
                        {selectedTask && (
                            <div className="details-container">
                                <div class="detail">
                                    <label>Apex ID:</label>
                                    <span>{selectedTask.apex_id}</span>
                                </div>
                                <div class="detail">
                                    <label>Apex amount:</label>
                                    <span>{selectedTask.apex_amount}</span>
                                </div>
                                <div class="detail">
                                    <label>Task ID:</label>
                                    <span>{selectedTask.task_id}</span>
                                </div>
                                <div class="detail">
                                    <label>Task type:</label>
                                    <span>{selectedTask.type}</span>
                                </div>
                                <div class="detail">
                                    <label>Requested Person:</label>
                                    <span>{selectedTask.name}</span>
                                </div>
                                <div class="detail">
                                    <label>Product Details:</label>
                                    <span>{selectedTask.product_details}</span>
                                </div>
                                <div class="detail">
                                    <label>Requested Date:</label>
                                    <span>{selectedTask.task_date}</span>
                                </div>
                                <div class="detail">
                                    <label>Quantity:</label>
                                    <span>{selectedTask.quantity}</span>
                                </div>


                                <div class="detail">
                                    <label>Purchase order no:</label>
                                    <span>{selectedTask.purchase_order}</span>
                                </div>
                                {selectedTask?.ref_no !== null ? (
                                    <div className="detail">
                                        <label>Ref_no:</label>
                                        <span>{selectedTask.ref_no}</span>
                                    </div>
                                ) : null}
                                <div class="detail">
                                    <label>Remaining amount:</label>
                                    <span>{selectedTask.remaining_amount}</span>
                                </div>
                                <div class="detail">
                                    <label>Required quantity:</label>
                                    <span>{selectedTask.required_qty}</span>
                                </div>
                                <div class="detail">
                                    <label>Received quantity:</label>
                                    <span>{selectedTask.received_qty}</span>
                                </div>
                                <div class="detail">
                                    <label>Task amount:</label>
                                    <span>{selectedTask.amount}</span>
                                </div>
                                <div class="detail">
                                    <label>Advance amount:</label>
                                    <span>{selectedTask.advance_amount}</span>
                                </div>
                                <div class="detail">
                                    <label>Task date:</label>
                                    <span>{selectedTask.task_date}</span>
                                </div>


                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                {/* request person */}
                {selectedTask && selectedTask.status == 3 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Advance given?
                                <Button
                                    label="Advance Done"
                                    onClick={handleIntimateFaculty}
                                />
                                {/* <Button label="Advance Done" onClick={handleIntimateFaculty} /> */}
                            </div>
                        </DialogContent>
                    </div>
                )}
                {selectedTask && selectedTask.status == 8 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Products Received from Stores?
                                <Button
                                    label="Products Received"
                                    onClick={handleReceived}
                                />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {selectedTask && selectedTask.status == 12 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Bill paid by accounts?
                                <Button label="Bill Paid" onClick={handleUpdateAcc} />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/* purchase team */}
                {selectedTask && selectedTask.status == 1 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Approve
                                <Button label="Approve" onClick={handleApproveClick} />
                            </div>
                            {showAdditionalButtons && (
                                <div className="popup-button-flex">
                                    <DialogContent dividers>
                                        <div className="status-update-button">
                                            Advance needed?
                                            <Button label="Yes" onClick={handleShowInput} />
                                            <Button label="No" onClick={handleUpdateAdvanceNo} />
                                        </div>

                                        {showInput && (
                                            <div>
                                                <input
                                                    type="number"
                                                    value={advance}
                                                    onChange={(e) => setAdvance(e.target.value)}
                                                />
                                                <Button label="Submit" onClick={handleAdvanceYes}></Button>
                                            </div>
                                        )}
                                    </DialogContent>
                                </div>
                            )}
                        </DialogContent>
                    </div>
                )}
                {selectedTask && selectedTask.status == 13 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Bill closed?
                                <Button
                                    label="Bill closed"
                                    onClick={handleBillStatus}
                                />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/* stores */}
                {selectedTask && selectedTask.status == 4 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Quotation passed
                                <input
                                    type="text"
                                    placeholder="purchase order number"
                                    value={purchaseOrderNum}
                                    onChange={(e) => setPurchaceOrderNum(e.target.value)}
                                />
                                <Button
                                    label="Quotation passed"
                                    onClick={handleQuotationPass}
                                />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*not working*/}
                {selectedTask && selectedTask.status == 5 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                purchase order
                                <Button
                                    label="Purchase passed"
                                    onClick={handlePurchaseOrder}
                                />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*working*/}
                {selectedTask && selectedTask.status == 6 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                temp
                                <Button label="Temp" onClick={handletemp} />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*working*/}
                {selectedTask && selectedTask.status == 7 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Full Product received?
                                <Button
                                    label="Product Received"
                                    onClick={handlefullyreceived}
                                />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*working*/}
                {selectedTask && selectedTask.status == 9 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                received bill from request person?
                                <Button
                                    label="Received bill"
                                    onClick={handlebillreceived}
                                />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*working*/}
                {selectedTask && selectedTask.status == 10 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                bill sent to accounts?
                                <Button label="Sent to accounts" onClick={handleBillSent} />
                            </div>
                        </DialogContent>
                        {/* not working*/}
                    </div>
                )}
                {/* advances */}
                {selectedTask && selectedTask.status == 2 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Advance Paid?
                                <input type="text" value={ref_no} placeholder="reference number" onChange={(e) => setRef_no(e.target.value)} />
                                <Button label="Amount Paid" onClick={handleAdvancePaid} />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*not working*/}
                {selectedTask && selectedTask.status == 11 && (
                    <div className="popup-button-flex">
                        <DialogContent dividers>
                            <div className="status-update-button">
                                Final amount Paid?
                                <Button label="Payment closed" onClick={handleFinalPayment} />
                            </div>
                        </DialogContent>
                    </div>
                )}
                {/*working*/}
                <DialogActions>
                    <Button onClick={handleClose} label="Close" />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RoleCheck(Approvals, [1, 2, 3, 4, 5, 6]);
