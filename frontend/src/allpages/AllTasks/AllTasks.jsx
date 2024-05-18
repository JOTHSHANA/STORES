import React, { useState, useEffect } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import './AllTasks.css';
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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RoleCheck from "../auth/RoleResource/resources";
import nopending from "../../assets/nopending.png";



function AllTasks() {
    return <AppLayout rId={7} body={<Body />} />;
}

function Body() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null); // Track the selected task
    const [open, setOpen] = useState(false); // Dialog open state
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true); // State for loading


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
        } finally {
            setLoading(false); // Set loading to false after data is fetched
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
        "Initiated",
        "Approved",
        "Products",
        "Bill pass",
        "Payment",

    ];

    const filterData = (data) => {
        return data.filter((item) =>
            // item.task_id.includes(search)||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.product_details.toLowerCase().includes(search.toLowerCase()) ||
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
                {loading ? (
                    <div className="loader-page1">
                        <div className="loader"></div>
                    </div>
                ) : (
                    filterData(taskData).length === 0 ? (
                        <div className="no-tasks">
                            <img src={nopending} alt="img" className="nopending-img" />
                            No tasks available...
                        </div>
                    ) : (
                        filterData(taskData).map((task, index) => (
                            <div className="card" key={index} onClick={() => handleClickOpen(task)}>
                                <div>
                                    <p className='card-heading'><strong>TASK ID:</strong> {task.task_id}</p>
                                    <hr />
                                    <div className='details-div'>
                                        <div className='each-detail'>
                                            <div><strong>Requested Person :</strong></div>
                                            <p className='info'>{task.name}</p>
                                        </div>
                                        <div className='each-detail'>
                                            <strong>Product Details :</strong>
                                            <p className='info'>{task.product_details}</p>
                                        </div>
                                    </div>
                                </div>
                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={1} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label} sx={{
                                                paddingBottom: "10px",
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
            {/* Dialog Component */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Task Details</DialogTitle>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={4} alternativeLabel>
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
                    <DialogContentText id="scroll-dialog-description">
                        {/* Display selected task details */}
                        {selectedTask && (
                            <div class="details-container">
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
                <DialogActions>
                    <Button onClick={handleClose} label="CLOSE"></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RoleCheck(AllTasks, [2, 3, 4, 5, 6]);
