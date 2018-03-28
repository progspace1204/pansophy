import React, { useState, useEffect } from "react";
import Pagination from "../Partials/Pagination";
import Alert from "../Partials/Alert";
import { __ } from "@wordpress/i18n";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import forwardIcons from "./forwardicons.svg";
import backwardIcons from "./previousicon.svg";
const HistoryItems = (props) => {
  const [id, setId] = useState();
  const history = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const PER_PAGE = 5;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  const offSet = currentPage * PER_PAGE;

  const currentPageData = props.filteredList.slice(offSet, offSet + PER_PAGE);
  const pageCount = Math.ceil(props.filteredList.length / PER_PAGE);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border border-app-border sm:rounded-lg">
            <table className="min-w-full divide-y divide-app-border">
              <thead className="bg-app-blackish">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-300 tracking-wider"
                  >
                    {__("Prompt", "pansophy")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-300 tracking-wider"
                  >
                    {__("Response", "pansophy")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-300 tracking-wider"
                  >
                    {__("Actions", "pansophy")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-app-blackish divide-y divide-app-border">
                {currentPageData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {item.question}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-white ${
                        item.is_image === "1" && "italic"
                      }`}
                    >
                      {item.answer.length>90?
                      (<div>{item.answer.slice(0,90)}...</div>):<div>{item.answer}</div>}
                      {item.is_image === "1" && "px"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        className="text-text-300 hover:text-white"
                        onClick={() => {
                          setId(item.id);
                          setConfirmOpen(true);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.0002 6.72998C20.9802 6.72998 20.9502 6.72998 20.9202 6.72998C15.6302 6.19998 10.3502 5.99998 5.12016 6.52998L3.08016 6.72998C2.66016 6.76998 2.29016 6.46998 2.25016 6.04998C2.21016 5.62998 2.51016 5.26998 2.92016 5.22998L4.96016 5.02998C10.2802 4.48998 15.6702 4.69998 21.0702 5.22998C21.4802 5.26998 21.7802 5.63998 21.7402 6.04998C21.7102 6.43998 21.3802 6.72998 21.0002 6.72998Z"
                            fill="currentColor"
                          />
                          <path
                            d="M8.49977 5.72C8.45977 5.72 8.41977 5.72 8.36977 5.71C7.96977 5.64 7.68977 5.25 7.75977 4.85L7.97977 3.54C8.13977 2.58 8.35977 1.25 10.6898 1.25H13.3098C15.6498 1.25 15.8698 2.63 16.0198 3.55L16.2398 4.85C16.3098 5.26 16.0298 5.65 15.6298 5.71C15.2198 5.78 14.8298 5.5 14.7698 5.1L14.5498 3.8C14.4098 2.93 14.3798 2.76 13.3198 2.76H10.6998C9.63977 2.76 9.61977 2.9 9.46977 3.79L9.23977 5.09C9.17977 5.46 8.85977 5.72 8.49977 5.72Z"
                            fill="currentColor"
                          />
                          <path
                            d="M15.2099 22.75H8.7899C5.2999 22.75 5.1599 20.82 5.0499 19.26L4.3999 9.18995C4.3699 8.77995 4.6899 8.41995 5.0999 8.38995C5.5199 8.36995 5.8699 8.67995 5.8999 9.08995L6.5499 19.16C6.6599 20.68 6.6999 21.25 8.7899 21.25H15.2099C17.3099 21.25 17.3499 20.68 17.4499 19.16L18.0999 9.08995C18.1299 8.67995 18.4899 8.36995 18.8999 8.38995C19.3099 8.41995 19.6299 8.76995 19.5999 9.18995L18.9499 19.26C18.8399 20.82 18.6999 22.75 15.2099 22.75Z"
                            fill="currentColor"
                          />
                          <path
                            d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
                            fill="currentColor"
                          />
                          <path
                            d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              containerClassName="pagination_container"
              previousLinkClassName="pagination_previous"
              nextLinkClassName="pagination_previous"
              activeClassName="pagination_active"
              pageClassName="pageClass"
              nextLabel={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={forwardIcons} alt="" />
                </div>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<img src={backwardIcons} alt="" />}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>

      {/* <div className="mt-10">
        <Pagination />
      </div> */}
      <Alert
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        id={id}
        label={__("Delete History", "pansophy")}
        description={__(
          "Are you sure you wish to proceed? This action is permanent can not be undone.",
          "pansophy"
        )}
      />
    </div>
  );
};

export default HistoryItems;
