import Navbar from "../components/Navbar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useEffect, useState } from "react";
import { RRule, RRuleSet, rrulestr } from "rrule"; //package afin de créer les events de façon récurente
import { getHours } from "date-fns";

export default function TimeTable() {
  const [classes, setClasses] = useState();

  // variable qui va stocker toutes les dates
  const evenements = [];

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/timetable/${localStorage.getItem(
        "accessToken"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //récupère d'abord la liste des classes choisies
  if (classes) {
    // on map à travers l'ensemble de ces classes
    classes.map((x) => {
      // création d'une nouvelle instance de RRule qui va créer un ensemble de dates récurrentes selon une date de départ
      console.log(x.start);
      const rule = new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        dtstart: new Date(x.start), //date de debut récupérer depuis la base de donnée
        until: new Date(2022, 11, 29), //date de fin pour tous les events: 29 decembre 2022
      }).all();
      // ajout des nouvelles dates au tableau final
      evenements.push(rule);
      // console.log("liste evenements finale:", evenements.flat())
    });
  }

  // définit le format de date selon un pays voulu
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  // va s'occuper des dates qu'on passe aux events du react-big-calendar en gros
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = evenements.flat().map((x) => ({
    title: "Events",
    start: new Date(x),
    end: new Date(x.setHours(x.getHours() + 1))
  }))

  // const events = [
  //   {
  //     title: "noel",
  //     start: new Date(2022, 1, 16, 10),
  //     end: new Date(2022, 1, 16, 11),
  //   },
  // ];

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
