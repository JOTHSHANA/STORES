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
    const [apexOptions, setApexOptions] = useState([]);
    const [selectedApexId, setSelectedApexId] = useState("");
    const [additionalFields, setAdditionalFields] = useState([]); // State to store additional fields

    const req_id = Cookies.get('id');

    useEffect(() => {
        fetchTaskTypes();
        fetchApex();
    }, []);

    const fetchTaskTypes = async () => {
        try {
            const response = await requestApi('GET', '/status/type');
            setTaskTypes(response.data);
        } catch (error) {
            console.error('Error fetching Task types:', error);
        }
    };

    const fetchApex = async () => {
        try {
            const response = await requestApi('GET', `/status/apex?user=${req_id}`);
            setApexOptions(response.data);
        } catch (error) {
            console.error('Error fetching Apex options:', error);
        }
    };

    const handleApexSelect = (id) => {
        setSelectedApexId(id);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            apex_id: selectedApexId,
            task_type: task_type,
            product_details: product_details,
            quantity: parseInt(quantity),
            amount: parseInt(amount),
            advance_amount: parseInt(advanceAmount),
            req_person: req_id
        };

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
        setAdditionalFields([]); // Clear additional fields
    };

    const handleAddField = () => {
        const newField = { name: '', quantity: '', expectedPrice: '', total: 0 };
        setAdditionalFields([...additionalFields, newField]);
    };

    const handleAdditionalFieldChange = (index, field, value) => {
        const updatedFields = [...additionalFields];
        updatedFields[index][field] = value;
        if (field === 'quantity' || field === 'expectedPrice') {
            updatedFields[index].total = parseInt(updatedFields[index].quantity) * parseFloat(updatedFields[index].expectedPrice);
        }
        setAdditionalFields(updatedFields);
    };

    return (
        <div className="form-div">
            <form className="form" onSubmit={handleSubmit}>

            <div className="each-field">
                    <label className="form-label" htmlFor="apex">Apex:<span className="required">*</span></label>
                    <select className="form-input-select" name="apex" value={selectedApexId} id="apex" onChange={(e) => handleApexSelect(e.target.value)} required>
                        <option value="">Select Apex</option>
                        {apexOptions.map((apex, index) => (
                            <option key={index} value={apex.id}>{apex.apex}</option>
                        ))}
                    </select>
                </div>
                
                <div className="each-field">
                    <label className="form-label" htmlFor="taskid">Task type:<span className="required">*</span></label>
                    <select className="form-input-select" name="task-type" value={task_type} id="tasktype" onChange={(e) => setTaskType(e.target.value)} required>
                        <option value="" disabled>Select type</option>
                        {taskTypes.map((task, index) => (
                            <option key={index} value={task.id}>{task.type}</option>
                        ))}
                    </select>
                </div>

                {/* Apex selection field */}
                

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

                {/* Additional fields */}
                {additionalFields.map((field, index) => (
                    <div key={index}>

                        <h3 style={{marginTop:"20px", marginBottom:"0px"}}>Product: {index+1}</h3>
                        <div className='repeating-box'>
                            <div className='all-repeating-fields'>
                                <label className="form-label" htmlFor={`productName-${index}`}>Product Name:</label>
                                <input className="form-input" type="text" id={`productName-${index}`} value={field.name} onChange={(e) => handleAdditionalFieldChange(index, 'name', e.target.value)} />
                            </div>
                            <div className='all-repeating-fields'>
                                <label className="form-label" htmlFor={`quantity-${index}`}>Quantity:</label>
                                <input className="form-input" type="number" id={`quantity-${index}`} value={field.quantity} onChange={(e) => handleAdditionalFieldChange(index, 'quantity', e.target.value)} />
                            </div>
                            <div className='all-repeating-fields'>
                                <label className="form-label" htmlFor={`expectedPrice-${index}`}>Expected Price:</label>
                                <input className="form-input" type="number" id={`expectedPrice-${index}`} value={field.expectedPrice} onChange={(e) => handleAdditionalFieldChange(index, 'expectedPrice', e.target.value)} />
                            </div>
                            <div className='all-repeating-fields'>
                                <label className="form-label">Total:</label>
                                <input className="form-input" type="text" value={field.total} disabled />
                            </div>
                        </div>


                    </div>
                ))}
                <div className="each-field1" onClick={handleAddField}>
                    adddd
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
