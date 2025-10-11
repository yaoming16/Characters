import React from "react";

const DownloadButton = ({
  onClick,
  label = "Download",
  className = "",
  warningArr = [],
}) => (
  <div className={`w-2/3 ml-auto mr-auto ${className}`}>
    <button
      className="w-full ml-auto mr-auto mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={onClick}
    >
      {label}
    </button>
    {warningArr.some((val) => val === true) ? (
      <p className="text-red-600 text-center">
        Please fix the errors in the form to be able to download the PDF
      </p>
    ) : null}
  </div>
);

export default DownloadButton;
