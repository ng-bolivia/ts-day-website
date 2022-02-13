import { set, format, differenceInMinutes } from "date-fns";
import data from "../../data/data.json";
import './Schedule.css';

const Schedule = () => {
  const baseDate = new Date(2022, 1, 19);

  const sessions = data.Schedule.sessions;

  const parseDate = (time: string, formatStr: string) => {
    const [hours, minutes] = time.split(":");
    const newDate = set(baseDate, {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
    });
    return format(newDate, formatStr);
  };

  const calcDiff = (start: string, end: string) => {
    const [startHours, startMinutes] = start.split(":");
    const startDate = set(baseDate, {
      hours: parseInt(startHours, 10),
      minutes: parseInt(startMinutes, 10),
    });
    const [endHours, endMinutes] = end.split(":");
    const endDate = set(baseDate, {
      hours: parseInt(endHours, 10),
      minutes: parseInt(endMinutes, 10),
    });
    return differenceInMinutes(endDate, startDate);
  };

  return (
    <section className="Schedule section">
      <div className="container">
        <h2>{data.Schedule.title}</h2>
        <p className="copy">
          Un día lleno de charlas increíbles que no te puedes perder recuerda que la agenda a continuación se muestra en la zona horaria de tu país es decir en{" "}
          <b>{format(new Date(), "OOOO")}</b>
        </p>

        <div className="talks">
          {sessions.map((session) => (
            <div className="talk" key={session.title}>
              <div className="meta">
                <p className="time">
                  {parseDate(session.time.start, "hh:mm")} -{" "}
                  {parseDate(session.time.end, "hh:mm a")} (
                  {calcDiff(session.time.start, session.time.end)}min)
                </p>
                <picture>
                  <source srcSet={session.speaker.imageWebp} />
                  <source srcSet={session.speaker.image} />
                  <img
                    loading="lazy"
                    src={session.speaker.image}
                    alt={session.speaker.name}
                  />
                </picture>
                <p className="speakerName">
                  <strong>{session.speaker.name}</strong>
                </p>
                {session.speaker.jobTitle && (
                  <p className="speakerTitle">{session.speaker.jobTitle}</p>
                )}
              </div>
              <div className="content">
                <h3>{session.title}</h3>
                <div>
                  <p dangerouslySetInnerHTML={{ __html: session.description }}></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
