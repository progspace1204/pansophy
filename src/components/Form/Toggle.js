import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Toggle = (props) => {
  const [enabled, setEnabled] = useState(false);
//   useEffect(() => {
//     props.setValue(enabled);
//     console.log(enabled);
//   }, [enabled]);

  useEffect(() => {
    if (props.value === "0") {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [props.value]);
  return (
    <div className="pansophy-toggle">
      <Switch.Group
        as="div"
        className="flex items-center justify-between p-4 border border-app-border rounded-lg"
      >
        <span className="flex-grow flex flex-col">
          <Switch.Label
            as="span"
            className="text-xs font-medium text-white"
            passive
          >
            {props.label}
          </Switch.Label>
        </span>
        <Switch
          checked={enabled}
          onChange={(e) => props.setValue(e===false?'0':'1')}
          className={classNames(
            enabled ? "bg-app-blue" : "bg-transparent",
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-app-border rounded-full cursor-pointer transition-colors ease-in-out duration-200"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            )}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
};

export default Toggle;
