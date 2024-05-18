import React, { useState, useEffect } from "react";
import RoleCheck from "../auth/RoleResource/resources";
import AppLayout from "../../components/applayout/AppLayout";
import '../AllTasks/AllTasks.css';
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
import TaskForm from "../TaskForm/TaskForm";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import nopending from "../../assets/nopending.png";

function MyTasks() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [receivedQty, setReceivedQty] = useState(0);
    const [loading, setLoading] = useState(true); // State for loading
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
            console.log(response);
            const data = response.data;
            setTaskData(data);
        } catch (error) {
            console.error('Error fetching task data:', error);
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
        try {
            if (!selectedTask) {
                throw new Error('No task selected');
            }
            const response = await requestApi("PUT", `/status/pteam-person?id=${selectedTask.id}`, {
                received_qty: receivedQty
            });
            console.log(response);
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
            const response = await requestApi("PUT", `/status/pteam-stores?id=${selectedTask.id}`);
            console.log(response);
            setOpen(false);
        } catch (error) {
            console.error('Error sending id to backend:', error);
        }
    };

    const handleReceivedQtyChange = (event) => {
        setReceivedQty(event.target.value);
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
            <div className='workspace-div'>
                {loading ? (
                    <div className="loader-page">
                        <div className="loader"></div>
                    </div> // Render loader while fetching data
                ) : (
                    taskData.length === 0 ? (
                        <div className="no-approvals">
                            <img src={nopending} alt="img" className="nopending-img" />
                            No tasks added...<br /><span style={{ fontSize: "16px", color: "#130847" }}>Click on Add button at the bottom to add tasks</span>
                        </div>
                    ) : (
                        taskData.map((task, index) => (
                            <div className="card" key={index} onClick={() => handleClickOpen(task)}>
                                <div>
                                    <p className='card-heading'><strong>TASK ID:</strong> {task.task_id}</p>
                                    <hr />
                                    <div className='details-div'>
                                        <div className='each-detail'><div><strong>Requested Person :</strong></div><p className='info'>{task.name}</p></div>
                                        <div className='each-detail'><strong>Product Details :</strong><p className='info'>{task.product_details}</p></div>
                                    </div>
                                </div>
                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={3} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label} sx={{
                                                '& .MuiStepLabel-root .Mui-completed': {
                                                    color: '#493d88aa',
                                                },
                                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                                {
                                                    color: '#493d88',
                                                    fontWeight: "700"
                                                },
                                                '& .MuiStepLabel-root .Mui-active': {
                                                    color: '#493d88',
                                                    fontWeight: "700",
                                                },
                                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                                {
                                                    color: '#493d88',
                                                },
                                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                                    fill: 'common.white',
                                                },
                                            }}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </div>
                        ))
                    )
                )}
            </div>
            <div className="add-form-icon"><AddCircleOutlinedIcon className="add-form-icon" style={{ fontSize: "70", color: "#493d88" }} onClick={handleTaskFormOpen} /></div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Task Details</DialogTitle>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label} sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: '#493d88aa',
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#493d88',
                                    fontWeight: "700"
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: '#493d88',
                                    fontWeight: "700",
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#493d88',
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: 'common.white',
                                },
                            }}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <DialogContent dividers>
                    <DialogContentText id="scroll-dialog-description" style={{ color: 'black' }}>
                        {selectedTask && (
                            <div className="details-container">
                                <div className="detail">
                                    <label>Apex ID:</label>
                                    <span>{selectedTask.apex_id}</span>
                                </div>
                                <div className="detail">
                                    <label>Apex amount:</label>
                                    <span>{selectedTask.apex_amount}</span>
                                </div>
                                <div className="detail">
                                    <label>Task ID:</label>
                                    <span>{selectedTask.task_id}</span>
                                </div>
                                <div className="detail">
                                    <label>Task type:</label>
                                    <span>{selectedTask.type}</span>
                                </div>
                                <div className="detail">
                                    <label>Requested Person:</label>
                                    <span>{selectedTask.name}</span>
                                </div>
                                <div className="detail">
                                    <label>Product Details:</label>
                                    <span>{selectedTask.product_details}</span>
                                </div>
                                <div className="detail">
                                    <label>Requested Date:</label>
                                    <span>{selectedTask.task_date}</span>
                                </div>
                                <div className="detail">
                                    <label>Quantity:</label>
                                    <span>{selectedTask.quantity}</span>
                                </div>
                                <div className="detail">
                                    <label>Purchase order no:</label>
                                    <span>{selectedTask.purchase_order}</span>
                                </div>
                                {selectedTask?.ref_no !== null ? (
                                    <div className="detail">
                                        <label>Ref_no:</label>
                                        <span>{selectedTask.ref_no}</span>
                                    </div>
                                ) : null}
                                <div className="detail">
                                    <label>Remaining amount:</label>
                                    <span>{selectedTask.remaining_amount}</span>
                                </div>
                                <div className="detail">
                                    <label>Required quantity:</label>
                                    <span>{selectedTask.required_qty}</span>
                                </div>
                                <div className="detail">
                                    <label>Received quantity:</label>
                                    <span>{selectedTask.received_qty}</span>
                                </div>
                                <div className="detail">
                                    <label>Task amount:</label>
                                    <span>{selectedTask.amount}</span>
                                </div>
                                <div className="detail">
                                    <label>Advance amount:</label>
                                    <span>{selectedTask.advance_amount}</span>
                                </div>
                                <div className="detail">
                                    <label>Task date:</label>
                                    <span>{selectedTask.task_date}</span>
                                </div>
                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} label="CLOSE" />
                </DialogActions>
            </Dialog>
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
