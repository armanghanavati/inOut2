// InstallPrompt.js
import React from 'react';

const InstallPrompt = ({ show, onInstall, onIgnore }) => {
  return (
    <>
      {show && (
        <div className="modal-content text-xs top-2 right-3 fixed bg-zinc-100 p-0.5 sm:p-1 rounded-xl visible opacity-100">
          <p className="text-xs sm:text-sm">Do you want to install App?</p>
          <div className="flex items-center mt-2 text-xs sm:text-sm gap-x-1 sm:gap-x-2 justify-between">
            <button className="p-1 w-full rounded-xl bg-green-400 text-white" onClick={onInstall}>
              Install
            </button>
            <button className="p-1 w-full rounded-xl bg-red-400 text-white" onClick={onIgnore}>
              Ignore
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPrompt;