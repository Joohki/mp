import { format, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import classes from "./Calender.module.scss";
import Section from "../layout/Section";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";
export default function Calender({ date }: { date: string }) {
  const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  // const dummyDate = "2022-01-09T12:34:56.789Z";
  // const formatDate = parseISO(dummyDate);
  return (
    <Section>
      <div className={classes.wrap_header}>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        />
        {selected && (
          <span className={classes.txt_date}>
            {format(selected, "yyyy.MM.dd")}
          </span>
        )}
        {/* <span className={classes.txt_time}>
          {format(selected, "aaa h시 eeee", { locale: ko })}
        </span> */}
      </div>
    </Section>
  );
}
