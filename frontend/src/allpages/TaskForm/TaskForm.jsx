import React, { useState } from 'react';
import requestApi from '../../components/utils/axios';
import AppLayout from '../../components/applayout/AppLayout';
import Button from '../../components/Button/Button';
import './TaskForm.css'

function TaskForm() {
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {
    // State for form inputs
    const [task_id, setTaskId] = useState('');
    const [req_person, setReqPerson] = useState('');
    const [product_details, setProductDetails] = useState('');
    const [quantity, setQuantity] = useState('');
    const [navigateStatus, setNavigateStatus] = useState(0); // 0: No navigation, 1: Navigate to "/workspace"
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
    const [personsOptions, setPersonsOptions] = useState([]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            task_id: task_id,
            req_person: req_person,
            product_details: product_details,
            date: date,
            quantity: parseInt(quantity),
            available_qty: 0
        };
        console.log(formData)

        try {
            // Send POST request using requestApi
            const response = await requestApi('POST', '/status/pteam', formData);

            if (response.success) {
                console.log(response.data); // Handle successful response
                // If navigateStatus is 1, navigate to "/workspace"
                if (navigateStatus === 1) {
                    setNavigateStatus(0); // Reset navigateStatus
                    window.location.href = "/alltasks"; // Navigate to "/workspace"
                } else {
                    // Clear form fields if navigateStatus is 0
                    clearFormFields();
                }
            } else {
                console.error('Error submitting form:', response.error);
                // Handle error
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error
        }
    };

    // Function to clear form fields
    const clearFormFields = () => {
        setTaskId('');
        setReqPerson('');
        setProductDetails('');
        setDate('');
        setQuantity('');
    };

    // Function to handle "Submit & Add Another" button click
    const handleAddAnother = () => {
        setNavigateStatus(1); // Set navigateStatus to 1
        handleSubmit(); // Call handleSubmit to submit the form
    };


    // useEffect(() => {
    //     // Fetch options from the backend
    //     fetchPersonsOptions(); // Function to fetch options from the backend
    // }, []);

    // const fetchPersonsOptions = async () => {
    //     try {
    //         const response = await fetch('your-backend-url');
    //         const data = await response.json();
    //         setPersonsOptions(data); // Assuming data is an array of objects with { value, label } structure
    //     } catch (error) {
    //         console.error('Error fetching persons options:', error);
    //     }
    // };


    return (
        <div className="form-div">
            <form className="form" onSubmit={handleSubmit}>
                <div className="each-field">
                    <label className="form-label" htmlFor="taskid">Task Id:</label>
                    <input className="form-input" type="text" name="task_id" value={task_id} onChange={(e) => setTaskId(e.target.value)} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="req_person">Requested Person:</label>
                    <input className="form-input" type="text" name="req_person" value={req_person} onChange={(e) => setReqPerson(e.target.value)} />
                </div>
                {/* <div className="each-field">
                    <label className="form-label" htmlFor="req_person">Requested Person:</label>
                    <select className="form-input" name="req_person" value={req_person} onChange={(e) => setReqPerson(e.target.value)}>
                        <option value="">Select Requested Person</option>
                        {personsOptions.map((person) => (
                            <option key={person.value} value={person.value}>{person.label}</option>
                        ))}
                    </select>
                </div> */}
                <div className="each-field">
                    <label className="form-label" htmlFor="product_details">Product Details:</label>
                    <input className="form-input" type="text" name="product_details" value={product_details} onChange={(e) => setProductDetails(e.target.value)} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="date">Requested Date:</label>
                    <input className="form-input" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="quantity">Quantity</label>
                    <input className="form-input" type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="each-field1">
                    <Button label="Submit & Add Another" />
                    <Button type="submit" label="Submit" onClick={handleAddAnother} />
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
