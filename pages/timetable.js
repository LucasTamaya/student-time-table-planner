import Navbar from "../components/Navbar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
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
    start: new Date(2021, 2, 0),
    end: new Date(2021, 2, 3)
  }
]

export default function TimeTable() {

  // useEffect(() => {
  //   fetch()
  // }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold">Timetable</h1>
        <Calendar localizer={localizer} events={events} startAccessor={"start"} endAccessor={"end"} />
      </div>
    </>
  );
}
