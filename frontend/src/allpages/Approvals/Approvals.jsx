import React, { useState, useEffect } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import '../AllTasks/AllTasks.css'
import requestApi from "../../components/utils/axios";
import Button from "../../components/Button/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Cookies from "js-cookie";
import TaskForm from "../TaskForm/TaskForm"

function Approvals() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false); // State for TaskForm dialog
    const [receivedQty, setReceivedQty] = useState(0); // State to store received_qty
    const id = Cookies.get('id');
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [showInput, setShowInput] = useState(false)
    const [advance, setAdvance] = useState()
    const [purchaseOrderNum, setPurchaceOrderNum] = useState();



    useEffect(() => {
        fetchTaskData();
    }, [id]);

    const fetchTaskData = async () => {
        try {
            const role_id = Cookies.get('role');
            let apiEndpoint = "";

            // Determine API endpoint based on role_id
            switch (role_id) {
                case '1':
                    apiEndpoint = `/status/req-person?req_person=${id}`;
                    break;
                case '4':
                    apiEndpoint = "/status/stores";
                    break;
                case '5':
                    apiEndpoint = "/status/pteam";
                    break;

                case '6':
                    apiEndpoint = "/status/accounts";
                    break;
                default:
                    throw new Error("Invalid role ID");
            }

            const response = await requestApi("GET", apiEndpoint);
            if (!response.data || !response.success) {
                throw new Error('Failed to fetch task data');
            }
            const data = response.data;
            setTaskData(data);
        } catch (error) {
            console.error('Error fetching task data:', error);
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
        console.log(selectedTask.task_id)
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            // Update the values id and received_qty via /status/pteam-person
            const response = await requestApi("PUT", `/status/person-advance?id=${selectedTask.task_id}`, {
                received_qty: receivedQty // Use the state receivedQty
            });
            console.log(response);
            // Close the dialog after successful update
            setOpen(false);
            fetchTaskData();

        } catch (error) {
            console.error('Error updating values:', error);
        }
    };

    const handleReceived = async () => {
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/person-stores?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleUpdateAcc = async () => {
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/req-accounts?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleBillStatus = async () => {
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/pteam-close?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleQuotationPass = async () => {
        console.log(selectedTask.task_id);
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/stores-1?id=${selectedTask.task_id}`, {
                purchase_order: purchaseOrderNum
            });
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };


    const handlePurchaseOrder = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/stores-2?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handletemp = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/stores-3?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handlefullyreceived = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/stores-products?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };


    const handlebillreceived = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/stores-bill?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleBillSent = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/stores-sent?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleAdvancePaid = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/accounts-advance?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleFinalPayment = async () => {

        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/accounts-pay?id=${selectedTask.task_id}`);
            console.log(response);
            setOpen(false);
            fetchTaskData();
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };




    const handleReceivedQtyChange = (event) => {
        setReceivedQty(event.target.value);
    };

    const handleApproveClick = () => {
        console.log("afuvbubfuavaeffe")
        setShowAdditionalButtons(true); // Toggle the visibility of additional buttons

    };
    const handleShowInput = () => {
        setShowInput(true)
    }

    const handleAdvanceNeededYesClick = async () => {
        // Handle logic when "Advance needed: Yes" button is clicked
    };

    const handleAdvanceNeededNoClick = async () => {
        // Handle logic when "Advance needed: No" button is clicked
    };

    const steps = ['INITIATED',
        'STORES (OR) P-TEAM',
        'REQUEST PERSON',
        'STORES',
        'P-TEAM',
        'ACCOUNTS'
    ];

    return (
        <div>
            <div className='workspace-div'>
                {taskData.map((task, index) => (
                    <div className="card" key={index} onClick={() => handleClickOpen(task)}>
                        <div>
                            <p className='card-heading'><strong>TASK ID:</strong> {task.task_id}</p>
                            <hr />
                            <div className='details-div'>
                                <div className='each-detail'><div><strong>Requested Person :</strong></div><p className='info'>{task.name}</p></div>
                                <div className='each-detail'><strong>Product Details :</strong><p className='info'>{task.product_details}</p></div>
                                {/* <div className='each-detail'><strong>Requested Date :</strong> <p className='info'>{task.task_date}</p></div>
                                <div className='each-detail'><strong>Quantity :</strong><p className='info'>{task.quantity}</p></div> */}
                            </div>
                        </div>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={3} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}
                                    //  sx={{
                                    //     '& .MuiStepLabel-root .Mui-completed': {
                                    //       color: 'secondary.dark', // circle color (COMPLETED)
                                    //     },
                                    //     '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                    //       {
                                    //         color: 'grey.500', // Just text label (COMPLETED)
                                    //       },
                                    //     '& .MuiStepLabel-root .Mui-active': {
                                    //       color: 'secondary.main', // circle color (ACTIVE)
                                    //     },
                                    //     '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                    //       {
                                    //         color: 'common.white', // Just text label (ACTIVE)
                                    //       },
                                    //     '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    //       fill: 'black', // circle's number (ACTIVE)
                                    //     },
                                    //   }}
                                    >
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </div>
                ))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">DETAILS</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="scroll-dialog-description" style={{ color: 'black' }}>
                        {selectedTask && (
                            <div className="details-container">
                                <div class="detail">
                                    <label>Task ID:</label>
                                    <span>{selectedTask.task_id}</span>
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
                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={1} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>


                                {/* request person */}


                                {selectedTask.status == 3 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Advance given?

                                                <Button label="Advance Done" onClick={handleIntimateFaculty} />
                                                {/* <Button label="Advance Done" onClick={handleIntimateFaculty} /> */}

                                            </div>
                                        </DialogContent>


                                    </div>
                                )}
                                {selectedTask.status == 8 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Products Received from Stores?
                                                <Button label="Products Received" onClick={handleReceived} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}

                                {selectedTask.status == 12 && (
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


                                {selectedTask.status == 1 && (
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
                                                            <Button label="No" />

                                                        </div>

                                                        {showInput && (
                                                            <div>
                                                                <input type="number" value={advance} onChange={(e) => setAdvance(e.target.value)} />
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </div>
                                )}

                                {selectedTask.status == 13 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Bill closed?
                                                <Button label="Bill closed" onClick={handleBillStatus} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}

                                {/* stores */}


                                {selectedTask.status == 4 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Quotation passed
                                                <input type="text" placeholder="purchase order number" value={purchaseOrderNum} onChange={(e) => setPurchaceOrderNum(e.target.value)} />
                                                <Button label="Quotation passed" onClick={handleQuotationPass} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                             {/*not working*/}

                                {selectedTask.status == 5 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                purchase order
                                                <Button label="Purchase passed" onClick={handlePurchaseOrder} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                          {/*working*/}

                                {selectedTask.status == 6 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                temp
                                                <Button label="Temp" onClick={handletemp} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                               {/*working*/}

                                {selectedTask.status == 7 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Full Product received?
                                                <Button label="Received" onClick={handlefullyreceived} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                                {/*working*/}

                                {selectedTask.status == 9 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                received bill from request person?
                                                <Button label="Received bill" onClick={handlebillreceived} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                               {/*working*/}

                                {selectedTask.status == 10 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                bill sent to accounts?
                                                <Button label="Sent" onClick={handleBillSent} />
                                            </div>
                                        </DialogContent>                 {/* not working*/}
                                    </div>
                                )}


                                {/* advances */}

                                {selectedTask.status == 2 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Advance Paid?
                                                <Button label="Sent" onClick={handleAdvancePaid} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                             {/*not working*/}

                                {selectedTask.status == 11 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Final amount Paid?
                                                <Button label="Sent" onClick={handleFinalPayment} />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}                             {/*working*/}


                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} label="Close" />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Approvals;
