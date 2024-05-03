import AppLayout from "../../components/applayout/AppLayout";
import './Holidays.css'
import Button from "../../components/Button/Button";

function Holidays() {
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {

    return (
        <div className="holidays-page">
            <div className="add-holidays-div">
                holidays
            </div>
            <div className="display-holidays-div">

            </div>
        </div>
    );
}

export default Holidays;


