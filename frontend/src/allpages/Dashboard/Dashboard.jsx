import AppLayout from "../../components/applayout/AppLayout";
import "../../components/applayout/styles.css";

import Button from "../../components/Button/Button";

function Dashboard() {
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {


    return (
        <div>
            <Button label="Button" />
        </div>
    );
}

export default Dashboard;


