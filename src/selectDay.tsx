import React, { useState, useEffect } from "react";

interface SelectDayProps {
  currentDay: number; 
}


export function SelectDay(props: SelectDayProps) {
  return (
    <>
      <select>
        {Array.from({ length: props.currentDay }, (_, i) => i).map(el => (
          <option key={el}> Journée {el} </option>
        ))}
    </select>
    </>
  )
}
