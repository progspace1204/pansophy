import React, { useState, useEffect } from "react";
import Select from "../Form/Select";
import { __ } from "@wordpress/i18n";
import File from "../Form/File";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getSettings } from "../../Store/settingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const user_types = [
  { id: "all", name: "All Users", unavailable: false },
  { id: "members", name: "Logged in users only", unavailable: false },
  { id: "admins", name: "Admin users only", unavailable: false },
];

const position = [
  { id: "bottom-right", name: "Bottom Right", unavailable: false },
  { id: "bottom-left", name: "Bottom Left", unavailable: false },
  { id: "top-right", name: "Top Right", unavailable: false },
  { id: "top-left", name: "Top Left", unavailable: false },
];
const DalleSettings = () => {
  const url = `${pansophy_data.api_url}wprk/v1/general`;
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.settings.data);

  const formik = useFormik({
    initialValues: {
      dall_user_types: "",
      dall_popup_position: "",
      dall_logo: "",
    },
    onSubmit: async (values) => {
      {
        try {
          const res = await axios.post(url + "/dall", values);

          if (
            formik.values.dall_user_types === setting.dall_user_types &&
            formik.values.dall_popup_position === setting.dall_popup_position &&
            formik.values.dall_logo === setting.dall_logo 
          ) {
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
          getAPIData();
        } catch (error) {
          console.log(error);
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
        }
      }
    },
  });
  const getAPIData = async () => {
    try {
      const res = await axios.get(url);
      console.log(res);
      dispatch(getSettings(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (formik && setting !== null) {
      formik.setFieldValue(
        "dall_user_types",
        setting?.dall_user_types === false ? "" : setting?.dall_user_types
      );
      formik.setFieldValue(
        "dall_popup_position",
        setting?.dall_popup_position === false
          ? ""
          : setting?.dall_popup_position
      );
      formik.setFieldValue(
        "dall_logo",
        setting?.dall_logo === false ? "" : setting?.dall_logo
      );
    }
  }, [setting]);

  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <div className="relative flex flex-col items-start">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-10 w-full">
          <div>
            <Select
              name="dall_user_types"
              items={user_types}
              setValue={(value) =>
                formik.setFieldValue("dall_user_types", value)
              }
              value={formik.values.dall_user_types}
              onChange={formik.handleChange}
              label={__("Select Users to Show ChatGPT Popup", "pansophy")}
            />
          </div>
          <div>
            <Select
              name="dall_popup_position"
              items={position}
              value={formik.values.dall_popup_position}
              onChange={formik.handleChange}
              label={__("Select Popup Position", "pansophy")}
              setValue={(value) =>
                formik.setFieldValue("dall_popup_position", value)
              }
            />
          </div>
          <div>
            <File
              name="dall_logo"
              label={__("Logo", "pansophy")}
              fileLabel={__("Choose Logo", "pansophy")}
              onChange={formik.handleChange}
              setValue={(value) => formik.setFieldValue("dall_logo", value)}
              value={formik.values.logo}
            />
          </div>
        </div>
        <br />
        <ToastContainer/>
        <button
          type="submit"
          className="mt-8 lg:mt-auto inline-flex items-center justify-center py-4 px-8 bg-iconBlue rounded-lg text-sm hover:bg-iconBlue/80"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default DalleSettings;
