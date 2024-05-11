import AppLayout from "../../components/applayout/AppLayout";
import "../../components/applayout/styles.css";

import Button from "../../components/Button/Button";

function History() {
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {

    return (
        <div>
            History pages
        </div>
    );
}

export default History;


