import React from 'react';
import { useState } from "react";
const Switch = () => {
    const [enabled, setEnabled] = useState(false);
    console.log(enabled)
    return (
        <div className="  overflow-hidden">
            <div className="flex">
                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setEnabled(!enabled);
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-green-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>

                </label>
            </div>
        </div>
    );
};

export default Switch;