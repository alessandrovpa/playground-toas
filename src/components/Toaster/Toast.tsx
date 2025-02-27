import { Fragment, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Transition } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";

import { Toast as ToastType, useToasterContext } from "../../contexts/Toaster";

export const Toast = ({ id, type, text }: ToastType) => {
  const [show, setShow] = useState(false);
  const { removeToast } = useToasterContext();

  useEffect(() => {
    setTimeout(() => {
      console.log("TIMEOUT");
      setShow(true);
    }, 0);

    const time = setTimeout(() => {
      console.log("finished");
      // O afterLeave do headless não está funcionando, depois do timer também deve remover o toast do array
      removeToast(id);
      setShow(false);
    }, 8000);

    return () => {
      console.log("timeout");
      clearTimeout(time);
    };
  }, []);

  const onDismissToast = () => {
    setShow(false);
  };

  const afterLeave = () => {
    console.log('after');
    setTimeout(() => {
      removeToast(id);
    }, 0);
  };

  return (
    <div role="alert">
      <Transition
        as={Fragment}
        show={show}
        unmount={true}
        entered="transition-all duration-500"
        enter="transition-all"
        enterFrom="translate-x-[102%]"
        enterTo="translate-x-[-5%]"
        leave="transition-all duration-500 ease-in-out"
        leaveFrom="translate-x-[-5%]"
        leaveTo="translate-x-[102%]"
        afterLeave={afterLeave}
      >
        <div
          className={twMerge(
            "relative pl-2 pr-7 py-4 max-w-xs bg-white rounded-md flex items-center shadow-lg border-b border-2",
            type === "info" && "border-b-sky-600",
            type === "warning" && "border-b-yellow-600",
            type === "error" && "border-b-red-600",
            type === "success" && "border-b-green-600"
          )}
        >
          <button
            className="absolute right-2 top-2 text-gray-500"
            onClick={onDismissToast}
          >
            <XMarkIcon className="w-4 h-4" aria-label="Close" />
          </button>
          <div className="flex items-center">
            <div>
              {type === "info" && (
                <InformationCircleIcon
                  className="h-6 w-6 mr-1 text-sky-600"
                  aria-label="Information"
                />
              )}
              {type === "warning" && (
                <ExclamationTriangleIcon
                  className="h-6 w-6 mr-1 text-yellow-600"
                  aria-label="Warning"
                />
              )}
              {type === "error" && (
                <ExclamationCircleIcon
                  className="h-6 w-6 mr-1 text-red-600"
                  aria-label="Error"
                />
              )}
              {type === "success" && (
                <CheckCircleIcon
                  className="h-6 w-6 mr-1 text-green-600"
                  aria-label="Success"
                />
              )}
            </div>
            <p className="text-sm">{text}</p>
          </div>
        </div>
      </Transition>
    </div>
  );
};
