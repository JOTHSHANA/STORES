import React, { useState, useEffect } from 'react';
import requestApi from '../../components/utils/axios';
import AppLayout from '../../components/applayout/AppLayout';
import Button from '../../components/Button/Button';
import Cookies from "js-cookie";
import './TaskForm.css';

function TaskForm() {
    const [task_type, setTaskType] = useState('');
    const [taskTypes, setTaskTypes] = useState([]);
    const [product_details, setProductDetails] = useState('');
    const [quantity, setQuantity] = useState('');
    const [navigateStatus, setNavigateStatus] = useState(0);
    const [amount, setAmount] = useState(0);
    const [advancePayment, setAdvancePayment] = useState("");
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const req_id = Cookies.get('id');

    useEffect(() => {
        fetchTaskTypes();
    }, []);

    const fetchTaskTypes = async () => {
        try {
            const response = await requestApi('GET', '/status/type');
            setTaskTypes(response.data);
        } catch (error) {
            console.error('Error fetching Task types:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            task_type: task_type,
            product_details: product_details,
            quantity: parseInt(quantity),
            amount: parseInt(amount),
            advance_amount: parseInt(advanceAmount),
            req_person:req_id
        };

        console.log(formData)

        try {
            const response = await requestApi('POST', '/status/req-person', formData);
            if (response.success) {
                if (navigateStatus === 1) {
                    setNavigateStatus(0);
                    window.location.href = "/alltasks";
                } else {
                    clearFormFields();
                }
            } else {
                console.error('Error submitting form:', response.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const clearFormFields = () => {
        setTaskType('');
        setProductDetails('');
        setQuantity('');
        setAdvancePayment('');
        setAdvanceAmount(0);
        setAmount(0);
    };

    return (
        <div className="form-div">
            <form className="form" onSubmit={handleSubmit}>
                <div className="each-field">
                    <label className="form-label" htmlFor="taskid">Task type:<span className="required">*</span></label>
                    <select className="form-input-select" name="task-type" value={task_type} id="tasktype" onChange={(e) => setTaskType(e.target.value)} required>
                        <option value="" disabled>Select type</option>
                        {taskTypes.map((task, index) => (
                            <option key={index} value={task.id}>{task.type}</option>
                        ))}
                    </select>
                </div>

                <div className="each-field">
                    <label className="form-label" htmlFor="product_details">Product Details:<span className="required">*</span></label>
                    <input className="form-input" type="text" name="product_details" value={product_details} onChange={(e) => setProductDetails(e.target.value)} required />
                </div>

                <div className="each-field">
                    <label className="form-label" htmlFor="amount">Amount:<span className="required">*</span></label>
                    <input className="form-input" type="text" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>

                <div className="each-field">
                    <label className="form-label" htmlFor="advancePayment">Advance payment:<span className="required">*</span></label>
                    <select className="form-input-select" name="advancePayment" value={advancePayment} id="advancePayment" onChange={(e) => setAdvancePayment(e.target.value)} required>
                        <option value="" disabled>Select type</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {advancePayment === "Yes" && (
                    <div className="each-field">
                        <label className="form-label" htmlFor="advance_amount">Advance Amount:<span className="required">*</span></label>
                        <input type="number" className="form-input" name="advance-amount" id="advanceamount" value={advanceAmount} onChange={(e) => setAdvanceAmount(e.target.value)} required />
                    </div>
                )}

                <div className="each-field">
                    <label className="form-label" htmlFor="quantity">Quantity:<span className="required">*</span></label>
                    <input className="form-input" type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>

                <div className="each-field1">
                    <Button label="Submit & Add Another" onClick={handleSubmit} />
                    <Button type="submit" label="Submit" />
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
