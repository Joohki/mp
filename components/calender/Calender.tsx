import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import classes from "./Calender.module.scss";
import Section from "../layout/Section";
export default function Calender({ date }: { date: string }) {
  const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
}
