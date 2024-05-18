import React, { useState, useEffect } from 'react';
import requestApi from '../../components/utils/axios';
import AppLayout from '../../components/applayout/AppLayout';
import Button from '../../components/Button/Button';
import Cookies from "js-cookie";
import './TaskForm.css';
import Select from 'react-select';

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
    const [additionalFields, setAdditionalFields] = useState([]);

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

    const handleApexSelect = (selectedOption) => {
        setSelectedApexId(selectedOption.label);
        console.log(selectedOption.value);
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
        setAdditionalFields([]);
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
                    <div className="form-label" htmlFor="apex">Apex ID:<span className="required">*</span></div>
                    <Select
                        className="form-input-select"
                        options={apexOptions.map(apex => ({ value: apex.id, label: apex.apex }))}
                        value={apexOptions.find(apex => apex.id === selectedApexId)}
                        onChange={handleApexSelect}
                        placeholder="Select Apex ID"
                        required
                    />
                </div>

                <div className="each-field">
                    <label className="form-label" htmlFor="taskid">Task type:<span className="required">*</span></label>
                    <Select
                        className="form-input-select"
                        options={taskTypes.map(task => ({ value: task.id, label: task.type }))}
                        value={taskTypes.find(task => task.id === task_type)}
                        onChange={(selectedOption) => setTaskType(selectedOption.value)}
                        placeholder="Select task type"
                        required
                    />
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
                    <Select
                        className="form-input-select"
                        options={[
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" }
                        ]}
                        onChange={(selectedOption) => setAdvancePayment(selectedOption.value)}
                        placeholder="Select Yes/No"
                        required
                    />
                </div>

                {advancePayment === "Yes" && (
                    <div className="each-field">
                        <label className="form-label" htmlFor="advance_amount">Advance Amount:<span className="required">*</span></label>
                        <input type="number" className="form-input" name="advance-amount" value={advanceAmount} onChange={(e) => setAdvanceAmount(e.target.value)} required />
                    </div>
                )}

                <div className="each-field">
                    <label className="form-label" htmlFor="quantity">Quantity:<span className="required">*</span></label>
                    <input className="form-input" type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>

                {additionalFields.map((field, index) => (
                    <div key={index}>
                        <h3 style={{ marginTop: "20px", marginBottom: "0px", color: "#1c0c6a", textDecoration: "underline" }}>Product: {index + 1}</h3>
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
                <div className="each-field-add-product" onClick={handleAddField}>
                    <div className='add-product-button'>Add Product</div>
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
