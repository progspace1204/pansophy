import React from 'react'
import Header from "./Header";
import Subscriptions from "./Subscriptions";
import DalleSettings from "./Dalle/DalleSettings";
import Promo from "./Dalle/Promo";
import GeneralSettings from "./General/GeneralSettings";

const General = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-10">
            <GeneralSettings/>
            <div className="h-[600px]">
                <Promo/>
            </div>
        </div>
    );
}

export default General;