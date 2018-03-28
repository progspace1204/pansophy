import React, { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import galleryImage from "../../../images/gallery_image.jpg";
import SimpleLightbox from "simple-lightbox";
import "simple-lightbox/dist/simpleLightbox.min.css";
import { Tooltip } from "react-tooltip";
import { useSelector } from "react-redux";

const AiImagesMessage = (props) => {
  const [selected, setSelected] = useState([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const data = useSelector((state) => state.chats.data.answer);
  console.log(data)
//   const images = data.map((item)=>{
//     id:data.length,
//     url:item.img_scr
//   });
//   const images = data.map((item)=>{[
//     { id: 1, url: data[0].img_scr},
//     { id: 2, url: data[1].img_scr },
//     { id: 3, url: data[2].img_scr },
//     { id: 4, url: data[0].img_scr },
//     { id: 5, url: data[0].img_scr },
//     { id: 6, url: data[0].img_scr },
//     { id: 7, url: data[0].img_scr },
//     { id: 8, url: data[0].img_scr },
//     { id: 9, url: data[0].img_scr },
//     { id: 10, url: data[0].img_scr },
//     { id: 11, url: data[0].img_scr },
//     { id: 12, url: data[0].img_scr },
//   ]};
  console.log(data);
  const handleSelected = (imageId) => {
    props.getImageValue(imageId);
    if (selected.includes(imageId)) {
      const array = selected.filter((item) => item !== imageId);
      setSelected(array);
    } else {
      setSelected((prevState) => [...prevState, imageId]);
    }
  };

  const handleSelectAll = () => {
    data &&
      data.forEach((image) =>
        setSelected((prevState) => [...prevState, image.media_id])
      );
  };

  useEffect(() => {
    if (galleryOpen) {
      const imgs = data.map((image) => image.img_scr);
      SimpleLightbox.open({
        items: imgs,
        beforeClose: () => {
          setGalleryOpen(false);
        },
      });
    }
  }, [galleryOpen]);

  return (
    <div className="flex md:space-x-4 w-full">
      <div className="hidden relative items-center justify-center min-w-[32px] w-8 h-8 bg-app-green rounded-full md:flex">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9387 7.03827C15.2991 5.95185 15.179 4.74691 14.5982 3.75926C13.7171 2.23827 11.9349 1.4679 10.1927 1.82346C9.43177 0.974074 8.31037 0.5 7.14892 0.5C5.36669 0.5 3.80474 1.62593 3.24404 3.28519C2.10261 3.52222 1.12139 4.21358 0.54066 5.22099C-0.340441 6.74198 -0.140191 8.63827 1.04129 9.94198C0.680835 11.0481 0.82101 12.2333 1.40174 13.221C2.28284 14.742 4.06507 15.5321 5.80724 15.1568C6.58822 16.0062 7.6896 16.5 8.85105 16.5C10.6333 16.5 12.1952 15.3741 12.7559 13.7148C13.8974 13.4778 14.8786 12.7864 15.4593 11.779C16.3404 10.258 16.1402 8.34198 14.9387 7.03827ZM8.85105 15.4531C8.13015 15.4531 7.4493 15.216 6.90862 14.7617C6.92864 14.742 6.98872 14.7222 7.00874 14.7025L10.2328 12.8654C10.393 12.7667 10.4931 12.6086 10.4931 12.4111V7.92716L11.8548 8.69753C11.8748 8.69753 11.8748 8.71728 11.8748 8.73704V12.4506C11.8949 14.1099 10.5332 15.4531 8.85105 15.4531ZM2.32289 12.7074C1.96244 12.0951 1.84229 11.384 1.96244 10.6926C1.98246 10.7123 2.02251 10.7321 2.06256 10.7519L5.28659 12.5889C5.44679 12.6877 5.64704 12.6877 5.80724 12.5889L9.75217 10.337V11.8975C9.75217 11.9173 9.75217 11.937 9.73215 11.937L6.46807 13.7938C5.02627 14.6235 3.16394 14.1296 2.32289 12.7074ZM1.48184 5.75432C1.84229 5.14198 2.40299 4.68765 3.06381 4.43086V8.22346C3.06381 8.40123 3.16394 8.57901 3.32414 8.67778L7.26907 10.9296L5.90737 11.7C5.88734 11.7 5.86732 11.7198 5.86732 11.7L2.60324 9.84321C1.12139 9.01358 0.640785 7.17654 1.48184 5.75432ZM12.6959 8.32222L8.75092 6.07037L10.1126 5.3C10.1326 5.3 10.1527 5.28025 10.1527 5.3L13.4168 7.15679C14.8786 7.98642 15.3592 9.82346 14.5181 11.2457C14.1577 11.858 13.597 12.3123 12.9362 12.5494V8.77654C12.9562 8.59877 12.8561 8.42099 12.6959 8.32222ZM14.0375 6.30741C14.0175 6.28765 13.9775 6.2679 13.9374 6.24815L10.7134 4.41111C10.5532 4.31235 10.3529 4.31235 10.1927 4.41111L6.24779 6.66296V5.10247C6.24779 5.08272 6.24779 5.06296 6.26782 5.06296L9.5319 3.20617C10.9937 2.37654 12.836 2.87037 13.6771 4.31235C14.0375 4.90494 14.1577 5.61605 14.0375 6.30741ZM5.50687 9.07284L4.14517 8.30247C4.12514 8.30247 4.12514 8.28272 4.12514 8.26296V4.54938C4.12514 2.89012 5.48684 1.54691 7.16894 1.54691C7.88985 1.54691 8.5707 1.78395 9.11137 2.23827C9.09135 2.25802 9.0513 2.27778 9.01125 2.29753L5.78722 4.13457C5.62702 4.23333 5.52689 4.39136 5.52689 4.58889V9.07284H5.50687ZM6.24779 7.49259L8.01 6.48519L9.7722 7.49259V9.48765L8.01 10.4951L6.24779 9.48765V7.49259Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="flex flex-nowrap items-start justify-between space-x-10 p-4 w-full bg-pansophy-bgDark rounded-xl self-center leading-7 text-sm text-white">
        <div className="flex flex-col items-start space-y-4 w-full">
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-1">
            {data &&
              data.map((image, imageIdx) => (
                <div
                  className="group relative h-16 w-16 rounded"
                  key={imageIdx}
                  datasrc={image.img_scr}
                >
                  <img
                    src={image.img_scr}
                    alt={__("AI Generated image", "pansophy")}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded"
                  />

                  <div
                    className={`flex items-center justify-center space-x-2 absolute top-0 left-0 w-full h-full bg-[#126949]/90 rounded group-hover:visible ${
                      selected.includes(image.media_id) ? "visible" : "invisible"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelected(image.media_id)}
                    >
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          selected.includes(image.media_id)
                            ? "fill-[#10B981]"
                            : "fill-white"
                        }`}
                      >
                        <path d="M7.99992 15.6667C4.04659 15.6667 0.833252 12.4533 0.833252 8.5C0.833252 4.54667 4.04659 1.33333 7.99992 1.33333C11.9533 1.33333 15.1666 4.54667 15.1666 8.5C15.1666 12.4533 11.9533 15.6667 7.99992 15.6667ZM7.99992 2.33333C4.59992 2.33333 1.83325 5.1 1.83325 8.5C1.83325 11.9 4.59992 14.6667 7.99992 14.6667C11.3999 14.6667 14.1666 11.9 14.1666 8.5C14.1666 5.1 11.3999 2.33333 7.99992 2.33333Z" />
                        <path d="M7.05321 10.8867C6.91988 10.8867 6.79321 10.8333 6.69988 10.74L4.81321 8.85333C4.61988 8.66 4.61988 8.34 4.81321 8.14667C5.00655 7.95333 5.32655 7.95333 5.51988 8.14667L7.05321 9.68L10.4799 6.25333C10.6732 6.06 10.9932 6.06 11.1865 6.25333C11.3799 6.44667 11.3799 6.76667 11.1865 6.96L7.40655 10.74C7.31321 10.8333 7.18655 10.8867 7.05321 10.8867Z" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => setGalleryOpen(true)}>
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99995 11.3867C6.40661 11.3867 5.11328 10.0933 5.11328 8.5C5.11328 6.90667 6.40661 5.61333 7.99995 5.61333C9.59328 5.61333 10.8866 6.90667 10.8866 8.5C10.8866 10.0933 9.59328 11.3867 7.99995 11.3867ZM7.99995 6.61333C6.95995 6.61333 6.11328 7.46 6.11328 8.5C6.11328 9.54 6.95995 10.3867 7.99995 10.3867C9.03995 10.3867 9.88661 9.54 9.88661 8.5C9.88661 7.46 9.03995 6.61333 7.99995 6.61333Z"
                          fill="white"
                        />
                        <path
                          d="M7.99997 14.5133C5.4933 14.5133 3.12664 13.0467 1.49997 10.5C0.793304 9.4 0.793304 7.60667 1.49997 6.5C3.1333 3.95333 5.49997 2.48667 7.99997 2.48667C10.5 2.48667 12.8666 3.95333 14.4933 6.5C15.2 7.6 15.2 9.39333 14.4933 10.5C12.8666 13.0467 10.5 14.5133 7.99997 14.5133ZM7.99997 3.48667C5.84664 3.48667 3.78664 4.78 2.34664 7.04C1.84664 7.82 1.84664 9.18 2.34664 9.96C3.78664 12.22 5.84664 13.5133 7.99997 13.5133C10.1533 13.5133 12.2133 12.22 13.6533 9.96C14.1533 9.18 14.1533 7.82 13.6533 7.04C12.2133 4.78 10.1533 3.48667 7.99997 3.48667Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex flex-col space-y-2 w-full md:space-y-0 md:items-center md:flex-row md:space-x-2">
            <button
              type="button"
              className="p-3 bg-pansophy-bg rounded-lg font-light text-[11px] xl:text-sm text-app-green hover:bg-pansophy-bg/80"
            >
              {__("Copy All", "pansophy")}
            </button>
            <button
              type="button"
              className="p-3 bg-pansophy-bg rounded-lg font-light text-[11px] xl:text-sm text-app-green hover:bg-pansophy-bg/80"
            >
              {__("Copy Selected", "pansophy")}
            </button>
            <button
              type="button"
              className="p-3 bg-pansophy-bg rounded-lg font-light text-[11px] xl:text-sm text-app-green hover:bg-pansophy-bg/80"
            >
              {__("Download All", "pansophy")}
            </button>
            <button
              type="button"
              className="p-3 bg-pansophy-bg rounded-lg font-light text-[11px] xl:text-sm text-app-green hover:bg-pansophy-bg/80"
            >
              {__("Download Selected", "pansophy")}
            </button>
          </div>
        </div>

        <div className="hidden items-center space-x-2 md:flex">
          <button
            type="button"
            data-tooltip-id="copy-to-clipboard-2"
            data-tooltip-content={__("Copy to Clipboard", "pansophy")}
            className="flex items-center justify-center bg-app-green/10 w-10 h-10 rounded-full hover:bg-app-green/20"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8099 20.68C15.5499 20.68 15.2799 20.67 14.9899 20.64C14.4699 20.6 13.88 20.5 13.27 20.35L11.59 19.95C6.97995 18.86 5.46995 16.42 6.54995 11.82L7.52995 7.63C7.74995 6.68 8.00995 5.91 8.32995 5.27C10.0499 1.72 13.3399 2.04 15.6799 2.59L17.3499 2.98C19.6899 3.53 21.1699 4.4 21.9999 5.73C22.82 7.06 22.9499 8.77 22.4 11.11L21.4199 15.29C20.5599 18.95 18.7699 20.68 15.8099 20.68ZM13.1199 3.75C11.4499 3.75 10.3899 4.44 9.67995 5.92C9.41995 6.46 9.18995 7.13 8.98995 7.97L8.00995 12.16C7.11995 15.94 8.14995 17.59 11.93 18.49L13.6099 18.89C14.1499 19.02 14.6599 19.1 15.1199 19.14C17.8399 19.41 19.1899 18.22 19.95 14.95L20.9299 10.77C21.3799 8.84 21.3199 7.49 20.7199 6.52C20.1199 5.55 18.9399 4.89 16.9999 4.44L15.3299 4.05C14.4999 3.85 13.7599 3.75 13.1199 3.75Z"
                fill="#10B981"
              />
              <path
                d="M8.33005 22.75C5.76005 22.75 4.12005 21.21 3.07005 17.96L1.79005 14.01C0.370052 9.61 1.64005 7.13 6.02005 5.71L7.60005 5.2C8.12005 5.04 8.51005 4.93 8.86005 4.87C9.15005 4.81 9.43005 4.92 9.60005 5.15C9.77005 5.38 9.80005 5.68 9.68005 5.94C9.42005 6.47 9.19005 7.14 9.00005 7.98L8.02005 12.17C7.13005 15.95 8.16005 17.6 11.9401 18.5L13.6201 18.9C14.1601 19.03 14.6701 19.11 15.1301 19.15C15.4501 19.18 15.7101 19.4 15.8001 19.71C15.8801 20.02 15.7601 20.34 15.5001 20.52C14.8401 20.97 14.0101 21.35 12.9601 21.69L11.3801 22.21C10.2301 22.57 9.23005 22.75 8.33005 22.75ZM7.78005 6.72L6.49005 7.14C2.92005 8.29 2.07005 9.97001 3.22005 13.55L4.50005 17.5C5.66005 21.07 7.34005 21.93 10.9101 20.78L12.4901 20.26C12.5501 20.24 12.6001 20.22 12.6601 20.2L11.6001 19.95C6.99005 18.86 5.48005 16.42 6.56005 11.82L7.54005 7.63C7.61005 7.31 7.69005 7 7.78005 6.72Z"
                fill="#10B981"
              />
              <path
                d="M17.49 11.01C17.43 11.01 17.37 11 17.3 10.99L12.45 9.76001C12.05 9.66001 11.81 9.25001 11.91 8.85001C12.01 8.45001 12.42 8.21001 12.82 8.31001L17.67 9.54001C18.07 9.64001 18.31 10.05 18.21 10.45C18.13 10.78 17.82 11.01 17.49 11.01Z"
                fill="#10B981"
              />
              <path
                d="M14.56 14.39C14.5 14.39 14.44 14.38 14.37 14.37L11.46 13.63C11.06 13.53 10.82 13.12 10.92 12.72C11.02 12.32 11.43 12.08 11.83 12.18L14.74 12.92C15.14 13.02 15.38 13.43 15.28 13.83C15.2 14.17 14.9 14.39 14.56 14.39Z"
                fill="#10B981"
              />
            </svg>
            <Tooltip id="copy-to-clipboard-2" />
          </button>
          <button
            type="button"
            data-tooltip-id="regenerate-response-2"
            data-tooltip-content={__("Regenerate Rresponse", "pansophy")}
            className="flex items-center justify-center bg-app-green/10 w-10 h-10 rounded-full hover:bg-app-green/20"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1098 18.11C13.9198 18.11 13.7298 18.04 13.5798 17.89C13.2898 17.6 13.2898 17.12 13.5798 16.83L16.6198 13.79C16.9098 13.5 17.3898 13.5 17.6798 13.79C17.9698 14.08 17.9698 14.56 17.6798 14.85L14.6398 17.89C14.4998 18.03 14.3098 18.11 14.1098 18.11Z"
                fill="#10B981"
              />
              <path
                d="M17.1498 15.07H6.83984C6.42984 15.07 6.08984 14.73 6.08984 14.32C6.08984 13.91 6.42984 13.57 6.83984 13.57H17.1498C17.5598 13.57 17.8998 13.91 17.8998 14.32C17.8998 14.73 17.5698 15.07 17.1498 15.07Z"
                fill="#10B981"
              />
              <path
                d="M6.85004 11.43C6.66004 11.43 6.47004 11.36 6.32004 11.21C6.03004 10.92 6.03004 10.44 6.32004 10.15L9.36002 7.10996C9.65002 6.81996 10.13 6.81996 10.42 7.10996C10.71 7.39996 10.71 7.87998 10.42 8.16998L7.38004 11.21C7.23004 11.36 7.04004 11.43 6.85004 11.43Z"
                fill="#10B981"
              />
              <path
                d="M17.1498 11.4299H6.83984C6.42984 11.4299 6.08984 11.0899 6.08984 10.6799C6.08984 10.2699 6.42984 9.92993 6.83984 9.92993H17.1498C17.5598 9.92993 17.8998 10.2699 17.8998 10.6799C17.8998 11.0899 17.5698 11.4299 17.1498 11.4299Z"
                fill="#10B981"
              />
              <path
                d="M12 23.25C6.07 23.25 1.25 18.43 1.25 12.5C1.25 6.57 6.07 1.75 12 1.75C17.93 1.75 22.75 6.57 22.75 12.5C22.75 18.43 17.93 23.25 12 23.25ZM12 3.25C6.9 3.25 2.75 7.4 2.75 12.5C2.75 17.6 6.9 21.75 12 21.75C17.1 21.75 21.25 17.6 21.25 12.5C21.25 7.4 17.1 3.25 12 3.25Z"
                fill="#10B981"
              />
            </svg>
            <Tooltip id="regenerate-response-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiImagesMessage;
