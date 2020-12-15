import React, { useEffect, useState } from "react";

import classNames from 'classnames';
import DayListItem from 'components/DayListItem.js'
import axios from 'axios';


export default function DayList (props) {




  return (
    <ul>
      {props.days.map(day => (
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay} />
      )
      )
      }
    </ul>
  )
};

