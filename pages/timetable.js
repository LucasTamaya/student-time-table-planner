import Navbar from "../components/Navbar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { RRule, RRuleSet, rrulestr } from "rrule"; //package afin de créer les events de façon récurente
import { useEffect } from "react";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Noel",
    start: new Date("Tue Feb 15 2022 11:00:00 GMT+0400"),
    end: new Date("Tue Feb 15 2022 12:00:00 GMT+0400"),
  },
];

const rule = new RRule({
  freq: RRule.WEEKLY, // repeate weekly, possible freq [DAILY, WEEKLY, MONTHLY, ]
  interval: 1,
  // byweekday: [RRule.MO, RRule.FR],
  dtstart: new Date(Date.UTC(2022, 1, 1, 7)), //date de debut
  until: new Date(Date.UTC(2022, 11, 29)), //date de fin de la recurence
});

const recurrentDates = rule.all(); //contient les date recurentes sous forme d'object
console.log(recurrentDates[0].getDate()); //contient les dates recurentes sous forme de date exploitable

recurrentDates.map((x) => {
  console.log(x.toString()); //toString format accepter dans new Date()
});

export default function TimeTable() {
  // useEffect(() => {
  //   fetch()
  // }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-2xl text-center font-bold">Timetable</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: "20px", height: 500 }}
        />
      </div>
    </>
  );
}
