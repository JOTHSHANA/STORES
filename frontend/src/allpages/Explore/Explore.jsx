import React from 'react'
import AppLayout from '../../components/applayout/AppLayout';

function Explore() {
    return <AppLayout rId={5} body={<Body />} />;
}

function Body() {

    return (
        <div>
            Explore
        </div>
    );
}

export default Explore;