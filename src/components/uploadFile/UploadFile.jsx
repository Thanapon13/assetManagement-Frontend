import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Fragment } from 'react';
import { FiDownload } from 'react-icons/fi';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

function UploadFile({ document, defaultDocument, onChange, onDelete }) {
  const inputEl = useRef();
  let location = useLocation();

  const fileTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  // console.log(document.type)

  return (
    <>
      <div className="position-relative">
        {document ? (
          fileTypes.includes(document?.type) ? (
            <>
              <div className="border-[1px] border-gray-200  rounded-lg grid grid-cols-8 mt-4 w-[350px]  ">
                <div className="col-1 flex justify-center bg-red-600 py-5 px-5 rounded-l-lg">
                  <p className="font-medium text-white">
                    {/* {capitalize(document.name?.split(".")[1])} */}
                    {document.name?.split('.')[1].toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center ml-2 col-span-5">
                  <div>
                    {/* {file.name} */}
                    <p>{document.name}</p>
                    {/* {file.lastModifiedDate} */}
                    <p className="text-sm text-gray-500">
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
             
              {/* Error span (DOCX,PDF) */}
              <div className="flex items-center mt-3 text-red-600 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  className="mercado-match"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M10.8 1H5.2L1 5.2v5.6L5.2 15h5.6l4.2-4.2V5.2zM12 9H4V7h8z"></path>
                </svg>
                <span className="ml-2 text-sm">
                  Please upload an acceptable document format (DOCX, PDF ,XLSX).
                </span>
              </div>
            </>
          )
        ) : (
          <button
            type="button"
            className="mt-3 inline-flex items-center px-4 py-1.5 border text-blue text-sm leading-4 font-medium rounded-full shadow-sm border-blue bg-white-600 hover:bg-hover-light-blue hover:border-2   focus:text-sky-900 "
            onClick={() => inputEl.current.click()}
          >
            Upload document
          </button>
        )}
      </div>
      <input type="file" multiple className="hidden" ref={inputEl} onChange={onChange} />
    </>
  );
}

export default UploadFile;

// onClick={() => inputEl.current.click()}  บอกว่าให้click กล่อง divนั้น แล้วให้เหมือนclick ที่ input
