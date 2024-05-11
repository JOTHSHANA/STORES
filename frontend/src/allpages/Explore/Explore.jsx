import React from "react";
import RoleCheck from "../auth/RoleResource/resources";

function Explore(){
    return <AppLayout rId={2} body={<Body />} />;
}

function Body() {

    return (
        <div>
            EXPLORE
        </div>
    );
}

export default RoleCheck(Explore, [2, 3, 4 ,5, 6])
