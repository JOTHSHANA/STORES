import React, { useState, useEffect } from "react";
import RoleCheck from "../auth/RoleResource/resources";
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
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function MyTasks() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false); // State for TaskForm dialog
    const [receivedQty, setReceivedQty] = useState(0); // State to store received_qty
    const id = Cookies.get('id');

    useEffect(() => {
        fetchTaskData();
    }, []);

    const fetchTaskData = async () => {
        try {
            const response = await requestApi("GET", `/status/req-person/all?req_person=${id}`);
            if (!response.data || !response.success) {
                throw new Error('Failed to fetch task data');
            }
            console.log(response)
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
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            // Update the values id and received_qty via /status/pteam-person
            const response = await requestApi("PUT", `/status/pteam-person?id=${selectedTask.id}`, {
                received_qty: receivedQty // Use the state receivedQty
            });
            console.log(response);
            // Close the dialog after successful update
            setOpen(false);
        } catch (error) {
            console.error('Error updating values:', error);
        }
    };

    const handleReceived = async () => {
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            // Send only the id to backend via /status/pteam-stores
            const response = await requestApi("PUT", `/status/pteam-stores?id=${selectedTask.id}`);
            console.log(response);
            // Close the dialog after successful update
            setOpen(false);
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleReceivedQtyChange = (event) => {
        setReceivedQty(event.target.value);
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
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </div>
                ))}
            </div>
            <div className="add-form-icon"><AddCircleOutlinedIcon className="add-form-icon" style={{ fontSize: "70", color: "#493d88" }} onClick={handleTaskFormOpen} /></div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Task Details</DialogTitle>
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
                                {selectedTask.status == 3 && (
                                    <div className="popup-button-flex">
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Products delivered?
                                                <div>
                                                    <input type="text" name="received_qty" value={receivedQty} onChange={handleReceivedQtyChange} />
                                                </div>
                                                <Button label="Intimate Faculty" onClick={handleIntimateFaculty} />
                                            </div>
                                        </DialogContent>
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Bill Received from Stores?
                                                <Button label="Received" onClick={handleReceived} />
                                            </div>
                                        </DialogContent>
                                        <DialogContent dividers>
                                            <div className="status-update-button">
                                                Bill passed to accounts?
                                                <Button label="Passed" />
                                            </div>
                                        </DialogContent>
                                    </div>
                                )}
                                {selectedTask.status == 4 && (
                                    <Button label="Intimate Faculty" />
                                )}
                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} label="Close" />
                </DialogActions>
            </Dialog>
            {/* TaskForm Dialog */}
            <Dialog
                open={openTaskForm}
                onClose={handleTaskFormClose}
                aria-labelledby="task-form-dialog-title"
                aria-describedby="task-form-dialog-description"
            >
                <DialogTitle id="task-form-dialog-title">Add Task</DialogTitle>
                <DialogContent>
                    <TaskForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTaskFormClose} label="Close" />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RoleCheck(MyTasks, [1, 2, 3]);
