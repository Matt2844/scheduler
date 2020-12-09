import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";
import classNames from 'classnames';

<<<<<<< HEAD



export default function Button (props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
=======
export default function Button (props) {
   return <></>;
}
>>>>>>> 2e21730a804cc7a754cff25385bbe61e266a47a5
