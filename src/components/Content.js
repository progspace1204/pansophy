import React, {useState} from 'react'
import Header from "./Header";
import General from "./General";
import History from "./History";
import DallE from "./DallE";

const Content = () => {
    const [page, setPage] = useState(pansophy_data?.menu || 'home');
    const changePage = (p) => {
        setPage(p)
    }

    return (
        <div className="flex flex-col py-24 pr-4">
            <Header onClick={(p) => changePage(p)} page={page}/>

            {page === 'home' && <General/>}
            {page === 'history' && <History/>}
            {page === 'dall-e-2' && <DallE/>}
        </div>
    );
}

export default Content;