import React, { useState, useEffect } from "react";
import Select from "../Form/Select";
import Input from "../Form/Input";
import { __ } from "@wordpress/i18n";
import Textarea from "../Form/Textarea";
import File from "../Form/File";
import Modal from "../Partials/Modal";
import SelectPages from "../Form/SelectPages";
import Toggle from "../Form/Toggle";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Toast } from "react-toastify/dist/components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getSettings } from "../../Store/settingSlice";
// import { Toast } from "react-toastify/dist/components";

const chatgtp_models = [
  { id: "gtp-3.5-turbo", name: "GPT 3.5", unavailable: false },
  { id: "text-davinci-003", name: "Da-Vinci", unavailable: false },
  { id: "text-curie-001", name: "Cure 001", unavailable: false },
  { id: "text-babbage-001", name: "Babbage 001", unavailable: false },
  { id: "text-ada-001", name: "Ada 001", unavailable: false },
];

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

const fine_tuned = [
  { id: "yes", name: "Yes", unavailable: false },
  { id: "no", name: "No", unavailable: false },
];

const modes = [
  { id: "content", name: "Content", unavailable: false },
  { id: "assistant", name: "Assistant", unavailable: false },
];

const GeneralSettings = () => {
  const dispatch = useDispatch();
  const url = `${pansophy_data.api_url}wprk/v1/general`;
  const setting = useSelector((state) => state.settings.data);
  const [pagesModalopen, setPagesModalOpen] = useState(false);
  const [logo,setLogo]=useState()
  const formik = useFormik({
    initialValues: {
      openai_api: "",
      user_types: "",
      max_tokens: "",
      mode: "",
      logo: "",
      chatgpt_model: "",
      chatgpt_popup_position: "",
      fine_tuned_model: "",
      pansophy_api: "",
      header_message: "",
      header_description: "",
      content_mode_icon: "",
      assistant_mode_icon: "",
      responses_avatar: "",
      branding: "",
      pages:[]
    },
    onSubmit: async (values) => {
      {
        try {
          const res = await axios.post(url, values);
          console.log(values);
          if (
            formik.values.openai_api === setting.openai_api &&
            formik.values.user_types === setting.user_types &&
            formik.values.max_tokens === setting.max_tokens &&
            formik.values.mode === setting.mode &&
            formik.values.logo === setting.logo &&
            formik.values.chatgpt_model === setting.chatgpt_model &&
            formik.values.chatgpt_popup_position ===
              setting.chatgpt_popup_position &&
            formik.values.pansophy_api === setting.pansophy_api &&
            formik.values.header_message === setting.header_message &&
            formik.values.header_description === setting.header_description &&
            formik.values.content_mode_icon === setting.content_mode_icon &&
            formik.values.assistant_mode_icon === setting.assistant_mode_icon &&
            formik.values.responses_avatar === setting.responses_avatar &&
            formik.values.branding === setting.branding&&
            formik.values.pages === setting.pages
          ) {
            toast.warning("Nothing Changed!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              theme: "light",
            });
          } else {
            toast.success("Updated Successfully!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
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
            theme: "light"
          });
        }
      }
    },
  });

  const getAPIData = async () => {
    try {
      const res = await axios.get(url);
      dispatch(getSettings(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (formik && setting !== null) {
      formik.setFieldValue(
        "openai_api",
        setting?.openai_api === false ? "" : setting?.openai_api
      );
      formik.setFieldValue(
        "user_types",
        setting?.user_types === false ? "" : setting?.user_types
      );

      formik.setFieldValue(
        "max_tokens",
        setting?.max_tokens === false ? "" : setting?.max_tokens
      );
      formik.setFieldValue(
        "mode",
        setting?.mode === false ? "" : setting?.mode
      );
      formik.setFieldValue(
        "logo",
        setting?.logo === false ? "" : setting?.logo
      );
      formik.setFieldValue(
        "chatgpt_model",
        setting?.chatgpt_model === false ? "" : setting?.chatgpt_model
      );
      formik.setFieldValue(
        "chatgpt_popup_position",
        setting?.chatgpt_popup_position === false
          ? ""
          : setting?.chatgpt_popup_position
      );
      formik.setFieldValue(
        "fine_tuned_model",
        setting?.fine_tuned_model === false ? "" : setting?.fine_tuned_model
      );
      formik.setFieldValue(
        "pansophy_api",
        setting?.pansophy_api === false ? "" : setting?.pansophy_api
      );
      formik.setFieldValue(
        "header_message",
        setting?.header_message === false ? "" : setting?.header_message
      );
      formik.setFieldValue(
        "header_description",
        setting?.header_description === false ? "" : setting?.header_description
      );
      formik.setFieldValue(
        "content_mode_icon",
        setting?.content_mode_icon === false ? "" : setting?.content_mode_icon
      );
      formik.setFieldValue(
        "assistant_mode_icon",
        setting?.assistant_mode_icon === false
          ? ""
          : setting?.assistant_mode_icon
      );
      formik.setFieldValue(
        "responses_avatar",
        setting?.responses_avatar === false ? "" : setting?.responses_avatar
      );
      formik.setFieldValue(
        "branding",
        setting?.branding === 0 ? 0 : setting?.branding
      );
      formik.setFieldValue(
        "pages",
        setting?.pages === false ? [] : setting?.pages
      );
    }
    
  }, [setting]);

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div className="flex flex-col space-y-10 w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="relative grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col space-y-10 w-full">
            <div>
              <Input
                name="openai_api"
                label={__("OpenAI API", "pansophy")}
                additional={{
                  label: __("Get OpenAPI API Key", "pansophy"),
                  url: "https://openai.com/api",
                }}
                onChange={formik.handleChange}
                value={formik.values.openai_api}
                setValue={(value) => formik.setFieldValue("openai_api", value)}
              />
            </div>
            <div>
              <Select
                name="user_types"
                items={user_types}
                label={__("Select Users to Show ChatGPT Popup", "pansophy")}
                onChange={formik.handleChange}
                value={formik.values.user_types}
                // formik.setFieldValue("user_types","value")
                setValue={(value) => {
                  formik.setFieldValue("user_types", value);
                }}
              />
            </div>
            <div>
              <Input
                name="max_tokens"
                label={__("Maximum Tokens", "pansophy")}
                additional={{
                  label: __("Learn More", "pansophy"),
                  url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
                }}
                options={{ type: "number", defaultValue: "10" }}
                onChange={formik.handleChange}
                value={formik.values.max_tokens}
                setValue={(value) => formik.setFieldValue("max_tokens", value)}
              />
            </div>
            <div>
              <Select
                name="mode"
                items={modes}
                label={__("Mode", "pansophy")}
                onChange={formik.handleChange}
                value={formik.values.mode}
                setValue={(value) => formik.setFieldValue("mode", value)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-10 w-full">
            <div>
              <Select
                name="chatgpt_model"
                items={chatgtp_models}
                label={__("Model for ChatGPT")}
                additional={{
                  label: __("Learn more", "pansophy"),
                  url: "https://platform.openai.com/docs/models/overview",
                }}
                onChange={formik.handleChange}
                value={formik.values.chatgpt_model}
                setValue={(value) =>
                  formik.setFieldValue("chatgpt_model", value)
                }
              />
            </div>
            <div className="relative z-10">
              <button
                type="button"
                className="absolute right-0 font-medium text-xs text-app-blue hover:text-app-blue hover:underline z-10"
                onClick={() => setPagesModalOpen(true)}
              >
                {__("Select Pages", "pansophy")}
              </button>

              <Select
                name="chatgpt_popup_position"
                items={position}
                label={__("Select Popup Position", "pansophy")}
                onChange={formik.handleChange}
                value={formik.values.chatgpt_popup_position}
                setValue={(value) =>
                  formik.setFieldValue("chatgpt_popup_position", value)
                }
              />
            </div>
            <div>
              <Select
                name="fine_tuned_model"
                items={fine_tuned}
                label={__("Use Fine Tuned Model", "pansophy")}
                onChange={formik.handleChange}
                value={formik.values.fine_tuned_model}
                setValue={(value) =>
                  formik.setFieldValue("fine_tuned_model", value)
                }
              />
            </div>
            <div>
              <Input
                name="pansophy_api"
                label={__("Pansophy API Key", "pansophy")}
                additional={{
                  label: __("Get Pansophy API Key", "pansophy"),
                  url: "#",
                }}
                onChange={formik.handleChange}
                value={formik.values.pansophy_api}
                setValue={(value) =>
                  formik.setFieldValue("pansophy_api", value)
                }
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          <Input
            name="header_message"
            label={__("Header Message", "pansophy")}
            onChange={formik.handleChange}
            value={formik.values.header_message}
            setValue={(value) => formik.setFieldValue("header_message", value)}
          />
        </div>
        <br />
        <div>
          <Textarea
            name="header_description"
            label={__("Header Description", "pansophy")}
            onChange={formik.handleChange}
            value={formik.values.header_description}
            setValue={(value) =>
              formik.setFieldValue("header_description", value)
            }
          />
        </div>
        <br />
        <div>
          <File
            name="logo"
            label={__("Logo", "pansophy")}
            fileLabel={__("Choose Logo", "pansophy")}
            value={formik.values.logo}
            setValue={(value) => formik.setFieldValue("logo", value)}
          />
        </div>
        <br />
        <div>
          <File
            name="content_mode_icon"
            label={__("Content Mode Icon", "pansophy")}
            fileLabel={__("Choose Icon", "pansophy")}
            onChange={formik.handleChange}
            value={formik.values.content_mode_icon}
            setValue={(value) => formik.setFieldValue("content_mode_icon", value)}
          />
        </div>
        <br />
        <div>
          <File
            name="assistant_mode_icon"
            label={__("Assistant Mode Icon", "pansophy")}
            fileLabel={__("Choose Icon", "pansophy")}
            onChange={formik.handleChange}
            value={formik.values.assistant_mode_icon}
            setValue={(value) =>
              formik.setFieldValue("assistant_mode_icon", value)
            }
          />
        </div>
        <br />
        <div>
          <File
            name="responses_avatar"
            label={__("Responses Avatar", "pansophy")}
            fileLabel={__("Choose Icon", "pansophy")}
            onChange={formik.handleChange}
            value={formik.values.responses_avatar}
            setValue={(value) => formik.setFieldValue("responses_avatar",value)}
          />
        </div>
        <br />
        <div>
          <Toggle
            name="branding"
            label={__("Remove Branding", "pansophy")}
            // onChange={formik.handleChange}
            value={formik.values.branding}
            setValue={(value) => formik.setFieldValue("branding", value)}
          />
        </div>
        <br />
        <div>
          <button
            type="submit"
            className="mt-8 lg:mt-auto inline-flex items-center justify-center py-4 px-8 bg-iconBlue rounded-lg text-sm hover:bg-iconBlue/80"
          >
            {__("Update Settings", "pansophy")}
          </button>

          <ToastContainer
          // position="top-center"
          // autoClose={5000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          // theme="light"
          />
        </div>
      </form>
      <Modal
        open={pagesModalopen}
        onClose={() => setPagesModalOpen(false)}
        title={__("Select Pages", "pansophy")}
        buttonLabel={__("Select Pages", "pansophy")}
      >
        <SelectPages formik={formik} value={formik?.values?.pages}  />
      </Modal>
    </div>
  );
};

export default GeneralSettings;
