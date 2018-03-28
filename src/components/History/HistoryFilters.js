import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import Select from "../Form/Select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../Store/userSlice";
import { getSettings } from "../../Store/settingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const fine_tuned = [
  { id: "7", name: __("Auto Delete Every 7 Days"), unavailable: false },
  { id: "15", name: __("Auto Delete Every 15 Days"), unavailable: false },
  { id: "30", name: __("Auto Delete Every 30 Days"), unavailable: false },
];

const History = (props) => {
  const dispatch = useDispatch();
  const url = `${pansophy_data.api_url}wprk/v1/settings`;
  const settingUrl = `${pansophy_data.api_url}wprk/v1/general`;
  const setting = useSelector((state) => state.settings.data);
  const history = useSelector((state) => state.users.data);
  const [value, setValue] = useState("");
  const [deleteDays, setDeleteDays] = useState("");

  const filterBySearch = () => {
    const query = value;
    var updatedList = [...history];
    updatedList = updatedList.filter(
      (item) => item.question.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.answer.toLowerCase().indexOf(query.toLowerCase()) !== -1

    );
    props.getFilteredList(updatedList);
  };

  const autoDelete = async () => {
    try {
      const res = await axios.post(settingUrl + "/auto_delete", {
        auto_delete: deleteDays,
      });
   
      if (
        deleteDays === setting.auto_delete) {
        toast.warning("Nothing Changed!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          // draggable: true,
          // progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Updated Successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          // draggable: true,
          // progress: undefined,
          theme: "light",
        });
      }
      getSettingData();
    } catch (error) {
      toast.error("Something Failed!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  }
  const getAPIData = async () => {
    try {
      const res = await axios.get(url);
      if (res.data == "empty tables") {
        dispatch(getHistory([]));
      } else {
        dispatch(getHistory(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSettingData = async () => {
    try {
      const res = await axios.get(settingUrl);
      dispatch(getSettings(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);
  useEffect(() => {
    filterBySearch();
  }, [history?.length]);

  useEffect(() => {
    filterBySearch();
  }, [value]);
  useEffect(() => {
    if (setting) {
      setDeleteDays(
        setting?.auto_delete ? setting?.auto_delete : fine_tuned[0].name
      );
    }
  }, [setting]);
  useEffect(() => {
    getSettingData();
  }, []);

  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-8 lg:gap-4">
      <div className="relative md:col-span-2 xl:col-span-4 2xl:col-span-5">
        <input
          type="text"
          className="pansophy-keyword py-3.5 px-8 w-full bg-transparent border border-app-border rounded-lg text-base"
          placeholder={__("Search History...", "pansophy")}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute top-4 right-4 lg:top-[20px]">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66683 14.5C11.1646 14.5 14.0002 11.6645 14.0002 8.16671C14.0002 4.6689 11.1646 1.83337 7.66683 1.83337C4.16903 1.83337 1.3335 4.6689 1.3335 8.16671C1.3335 11.6645 4.16903 14.5 7.66683 14.5Z"
              stroke="#6C757D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.6668 15.1667L13.3335 13.8334"
              stroke="#6C757D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="xl:col-span-2">
        <div>
          <Select
            name="auto_delete"
            items={fine_tuned}
            label={__("Auto-delete time", "pansophy")}
            srOnly={true}
            absolute={true}
            value={deleteDays}
            // value={setting?.auto_delete?fine_tuned[0].name:setting?.auto_delete}
            setValue={(value) => {
              setDeleteDays(value);
            }}
          />
        </div>
        <ToastContainer/>
      </div>
      <div className="xl:col-span-2 2xl:col-span-1">
        <button
          type="button"
          onClick={autoDelete}
          className="py-3.5 px-8 w-full bg-iconBlue text-base text-white rounded-lg hover:bg-iconBlue/80"
        >
          {__("Save Changes")}
        </button>
      </div>
    </div>
  );
};

export default History;
