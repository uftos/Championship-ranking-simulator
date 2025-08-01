import React from "react";

interface SelectDayProps {
  currentDay: number;
  setDay: (value: number) => void;
}

export function SelectDay(props: SelectDayProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = Number(event.target.value);
    props.setDay(selectedDay);
  };

  return (
    <>
      <select onChange={handleChange} selected={props.currentDay}>
        {Array.from({ length: props.currentDay }, (_, i) => i + 1).map((el) => (
          <option key={el} value={el}>
            {" "}
            Journée {el}{" "}
          </option>
        ))}
      </select>
    </>
  );
}
