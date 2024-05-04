import AppLayout from "../../components/applayout/AppLayout";
import './Holidays.css'
import Button from "../../components/Button/Button";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import requestApi from "../../components/utils/axios";

function Holidays() {
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {
    const [selectedDates, setSelectedDates] = useState([]);
    const [holidays, setHolidays] = useState([]);



    useEffect(() => {
        fetchHolidays();
    }, []);

    const fetchHolidays = async () => {
        try {
            const response = await requestApi("GET", "/date/dates"); // Update the URL here
            console.log('Response from backend:', response);
            if (!response || !response.success) {
                throw new Error('Failed to fetch holidays');
            }
            setHolidays(response.data); // Update the holidays state with fetched dates
        } catch (error) {
            console.error('Error fetching holidays:', error);
            // Handle error
        }
    };


    const parseDateToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (newDates) => {
        // Convert each date object to a string and then parse it as a date
        const formattedDates = newDates.map(date => parseDateToDDMMYYYY(date.toString()));
        setSelectedDates(formattedDates);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            console.log(selectedDates)
            const response = await requestApi("POST", '/date/dates', selectedDates);

            if (response.success) {
                console.log('Response from backend:', response);
            } else {
                console.log('Error response from backend:', response.error);
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (

        <div className="holidays-page">
            <div className="add-holidays-div">
                <div className="date-picker">
                    <DatePicker
                        multiple
                        plugins={[<DatePanel />]}
                        value={selectedDates}
                        onChange={handleDateChange}
                        style={{ padding: '7px' }}
                        placeholder="Select Holidays"
                    />
                </div>
                <div className="button-submit">
                    <Button label="Submit" onClick={handleSubmit} />
                </div>
            </div>
            <div className="display-holidays-grid">
                {holidays.map((holiday, index) => (
                    <div key={index} className="holiday-item">
                        {holiday.dates}
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Holidays;
