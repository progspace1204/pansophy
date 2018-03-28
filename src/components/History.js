import React, { useState } from "react";
import HistoryItems from "./History/HistoryItems";
import HistoryFilters from "./History/HistoryFilters";

const History = () => {
  const [filteredList, setFilteredList] = useState([]);

  const getFilteredList = (updatedList) => {
    setFilteredList(updatedList);
  };

  return (
    <div className="flex flex-col space-y-10">
      <HistoryFilters getFilteredList={getFilteredList} />
      <HistoryItems filteredList={filteredList} />
    </div>
  );
};

export default History;
