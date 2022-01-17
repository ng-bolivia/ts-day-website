import { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [timerString, setTimerString] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const dropDate = new Date(2022, 1, 19);
  const dateToTimeStamp = new Date(dropDate).getTime() / 1000;
  const dropDateFormat = new Date(dateToTimeStamp * 1000).getTime();


  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDateFormat - currentDate;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerString({
        days,
        hours,
        minutes,
        seconds
      });

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <>
      <div className="CountdownTimer">
        <div className="copy">Registraté ahora y reserva tu cupo, el evento iniciará en:</div>
        {timerString && <div className="values">
          <div><strong>{timerString.days}</strong> Días</div>
          <div><strong>{timerString.hours}</strong> Horas</div>
          <div><strong>{timerString.minutes}</strong> Min</div>
          <div><strong>{timerString.seconds}</strong> Seg</div>
        </div>}
      </div>
    </>
  );
};


export default CountdownTimer;

