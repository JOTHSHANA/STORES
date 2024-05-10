import React, { useState, useEffect } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import './AllTasks.css';
import requestApi from "../../components/utils/axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";



function AllTasks() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null); // Track the selected task
    const [open, setOpen] = useState(false); // Dialog open state
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchTaskData();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
    };
    const fetchTaskData = async () => {
        try {
            const response = await requestApi("GET", '/status/task');
            console.log('Response:', response); // Log the response
            if (!response.data || !response.success) {
                throw new Error('Failed to fetch task data');
            }
            const data = response.data;
            console.log('Task data:', data); // Log the data received
            setTaskData(data);
        } catch (error) {
            console.error('Error fetching task data:', error);
            // Add more specific error handling or logging here
        }
    };

    const handleClickOpen = (task) => {
        setSelectedTask(task); // Set the selected task
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

    const filterData = (data) => {
        return data.filter((item) =>
            // item.task_id.includes(search)||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.product_details.toLowerCase().includes(search.toLowerCase())||
            item.task_date.includes(search)
        );
    };

    return (
        <div>
            <div className="search-input">
                <div style={{ display: "flex", gap: 10 }}>
                    <SearchRoundedIcon
                        sx={{ color: "#472d2d", fontSize: "20px" }}
                    />
                    <input placeholder="Search" value={search} onChange={handleSearchInputChange} />
                </div>
            </div>
            <div className='workspace-div'>
                {filterData(taskData).map((task, index) => (
                    <div className="card" key={index} onClick={() => handleClickOpen(task)}> {/* Attach click handler */}
                        <div>
                            <p className='card-heading'><strong>TASK ID:</strong> {task.task_id}</p>
                            <hr />
                            <div className='details-div'>
                                <div className='each-detail'><div><strong>Requested Person :</strong></div><p className='info'>{task.name}</p></div>
                                <div className='each-detail'><strong>Product Details :</strong><p className='info'>{task.product_details}</p></div>
                                <div className='each-detail'><strong>Requested Date :</strong> <p className='info'>{task.task_date}</p></div>
                                <div className='each-detail'><strong>Quantity :</strong><p className='info'>{task.quantity}</p></div>
                            </div>
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
                    </div>

                ))}
            </div>
            {/* Dialog Component */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Task Details</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="scroll-dialog-description">
                        {/* Display selected task details */}
                        {selectedTask && (
                            <div class="details-container">
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
                                    <Stepper activeStep={3} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </div>

                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AllTasks;
