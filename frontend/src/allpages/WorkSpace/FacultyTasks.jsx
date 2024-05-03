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

function FacultyTasks() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);
    const name = Cookies.get('name');

    useEffect(() => {
        fetchTaskData();
    }, []);

    const fetchTaskData = async () => {
        try {
            const response = await requestApi("GET", `/status/reqPerson?req_person=${name}`);
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

    const steps = [
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
                                <div className='each-detail'><div><strong>Requested Person :</strong></div><p className='info'>{task.req_person}</p></div>
                                <div className='each-detail'><strong>Product Details :</strong><p className='info'>{task.product_details}</p></div>
                                <div className='each-detail'><strong>Requested Date :</strong> <p className='info'>{task.date}</p></div>
                                <div className='each-detail'><strong>Quantity :</strong><p className='info'>{task.quantity}</p></div>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Task Details</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="scroll-dialog-description">
                        {selectedTask && (
                            <div className="details-container">
                                <div class="detail">
                                    <label>Task ID:</label>
                                    <span>{selectedTask.task_id}</span>
                                </div>
                                <div class="detail">
                                    <label>Requested Person:</label>
                                    <span>{selectedTask.req_person}</span>
                                </div>
                                <div class="detail">
                                    <label>Product Details:</label>
                                    <span>{selectedTask.product_details}</span>
                                </div>
                                <div class="detail">
                                    <label>Requested Date:</label>
                                    <span>{selectedTask.date}</span>
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
                                    <div>
                                        <Button label="Intimate Faculty"/>
                                        <Button label="Bill Received from Stores"/>
                                        <Button label="Passed to Accounts"/>
                                    </div>
                                )}
                                {selectedTask.status == 4 && (
                                    <Button label="Intimate Faculty"/>
                                )}
                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} label="Close"/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FacultyTasks;
