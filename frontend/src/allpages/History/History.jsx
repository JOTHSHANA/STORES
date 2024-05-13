import AppLayout from "../../components/applayout/AppLayout";
import "../../components/applayout/styles.css";
import RoleCheck from "../auth/RoleResource/resources";


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

export default RoleCheck(History, [1, 2, 3, 4, 5, 6]);


