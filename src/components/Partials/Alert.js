import React, { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { userDeleted, getHistory } from "../../Store/userSlice";
import axios from "axios";
const Modal = ({ onClose, children, ...props }) => {
  const [open, setOpen] = useState(props?.open || false);
  const url = `${pansophy_data.api_url}wprk/v1/settings`;
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const deleteAPIData = async (itemid) => {
    console.log(itemid);

    try {
      const response = await axios.delete(`${url}?id=${itemid}`);

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

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="pansophy-app"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-app-black/75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-app-blackish rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-10">
                <div>
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-app-red">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.0002 6.72998C20.9802 6.72998 20.9502 6.72998 20.9202 6.72998C15.6302 6.19998 10.3502 5.99998 5.12016 6.52998L3.08016 6.72998C2.66016 6.76998 2.29016 6.46998 2.25016 6.04998C2.21016 5.62998 2.51016 5.26998 2.92016 5.22998L4.96016 5.02998C10.2802 4.48998 15.6702 4.69998 21.0702 5.22998C21.4802 5.26998 21.7802 5.63998 21.7402 6.04998C21.7102 6.43998 21.3802 6.72998 21.0002 6.72998Z"
                        fill="#fff"
                      />
                      <path
                        d="M8.49977 5.72C8.45977 5.72 8.41977 5.72 8.36977 5.71C7.96977 5.64 7.68977 5.25 7.75977 4.85L7.97977 3.54C8.13977 2.58 8.35977 1.25 10.6898 1.25H13.3098C15.6498 1.25 15.8698 2.63 16.0198 3.55L16.2398 4.85C16.3098 5.26 16.0298 5.65 15.6298 5.71C15.2198 5.78 14.8298 5.5 14.7698 5.1L14.5498 3.8C14.4098 2.93 14.3798 2.76 13.3198 2.76H10.6998C9.63977 2.76 9.61977 2.9 9.46977 3.79L9.23977 5.09C9.17977 5.46 8.85977 5.72 8.49977 5.72Z"
                        fill="#fff"
                      />
                      <path
                        d="M15.2099 22.75H8.7899C5.2999 22.75 5.1599 20.82 5.0499 19.26L4.3999 9.18995C4.3699 8.77995 4.6899 8.41995 5.0999 8.38995C5.5199 8.36995 5.8699 8.67995 5.8999 9.08995L6.5499 19.16C6.6599 20.68 6.6999 21.25 8.7899 21.25H15.2099C17.3099 21.25 17.3499 20.68 17.4499 19.16L18.0999 9.08995C18.1299 8.67995 18.4899 8.36995 18.8999 8.38995C19.3099 8.41995 19.6299 8.76995 19.5999 9.18995L18.9499 19.26C18.8399 20.82 18.6999 22.75 15.2099 22.75Z"
                        fill="#fff"
                      />
                      <path
                        d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
                        fill="#fff"
                      />
                      <path
                        d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-medium text-white"
                    >
                      {props.label}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-base text-text-300">
                        {props.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-app-border shadow-sm px-6 py-4 bg-transparent text-base font-medium text-white hover:bg-app-black/80 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-app-blue focus:ring-offset-app-blue  sm:col-start-1 sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-4 bg-iconBlue text-base font-medium text-white hover:bg-iconBlue/80 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-iconBlue sm:col-start-2 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      if (props.id) {
                        deleteAPIData(props.id);
                      }

                      onClose();
                    }}
                  >
                    Delete History
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
