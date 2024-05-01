import React, { useState } from 'react';
import AppLayout from "../../components/applayout/AppLayout";
import './TaskForm.css';
import Button from "../../components/Button/Button";

function TaskForm() {
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {
    const [formData, setFormData] = useState({
        taskId: '',
        requestedPerson: '',
        productDetails: '',
        requestedDate: '',
        quantity: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/path', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }

            console.log('Form data submitted successfully');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    }

    return (
        <div className="form-div">
            <form className="form" onSubmit={handleSubmit}>
                <div className="each-field">
                    <label className="form-label" htmlFor="taskid">Task Id:</label>
                    <input className="form-input" type="text" name="taskId" value={formData.taskId} onChange={handleChange} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="reqPerson">Requested Person:</label>
                    <input className="form-input" type="text" name="requestedPerson" value={formData.requestedPerson} onChange={handleChange} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="productDetails">Product Details:</label>
                    <input className="form-input" type="text" name="productDetails" value={formData.productDetails} onChange={handleChange} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="reqDate">Requested Date:</label>
                    <input className="form-input" type="date" name="requestedDate" value={formData.requestedDate} onChange={handleChange} />
                </div>
                <div className="each-field">
                    <label className="form-label" htmlFor="quantity">Quantity</label>
                    <input className="form-input" type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div className="each-field1">
                    <Button label="Submit & Add Another" />
                    <Button type="submit" label="Submit" />
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
