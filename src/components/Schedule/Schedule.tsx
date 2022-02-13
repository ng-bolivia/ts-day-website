import { set, differenceInMinutes, format } from "date-fns";
import spacetime from "spacetime";
import data from "../../data/data.json";
import "./Schedule.css";

const Schedule = () => {
  const sessions = data.Schedule.sessions;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const parseDate = (time: string) => {
    const [hours, minutes] = time.split(":");
    let d = spacetime.now('America/La_Paz');
    d = d.hour(parseInt(hours, 10));
    d = d.minute(parseInt(minutes, 10));
    d = d.goto(timeZone);
    return d.time();
  };

  const calcDiff = (start: string, end: string) => {
    const [startHours, startMinutes] = start.split(":");
    const startDate = set(new Date(), {
      hours: parseInt(startHours, 10),
      minutes: parseInt(startMinutes, 10),
    });
    const [endHours, endMinutes] = end.split(":");
    const endDate = set(new Date(), {
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
          Un día lleno de charlas increíbles que no te puedes perder, recuerda
          que la agenda a continuación se muestra en la zona horaria de tu país
          es decir en <b>{timeZone}</b>
        </p>

        <div className="talks">
          {sessions.map((session) => (
            <div className="talk" key={session.title}>
              <div className="meta">
                <p className="time">
                  {parseDate(session.time.start)} -{" "}
                  {parseDate(session.time.end)} (
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
                  <p
                    dangerouslySetInnerHTML={{ __html: session.description }}
                  ></p>
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
