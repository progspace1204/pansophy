import React from 'react'
import Header from "./Header";
import Subscriptions from "./Subscriptions";
import DalleSettings from "./Dalle/DalleSettings";
import Promo from "./Dalle/Promo";

const DallE = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-10">
            <DalleSettings/>
            <Promo/>
        </div>
    );
}

export default DallE;