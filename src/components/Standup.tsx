import { useEffect, useState } from 'react';

const getClosestTimeZone = () => {
  const currentTime = new Date();

  const aryIannaTimeZones = Intl.supportedValuesOf('timeZone');

  let closestBefore6am = 0;
  let closestAfter6am = 24 * 60;

  const times: {
    timeZone: string;
    time: number;
  }[] = [];

  aryIannaTimeZones.forEach((timeZone) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat([], options);
    const time = formatter
      .format(currentTime)
      .split(':')
      .map((x) => parseInt(x))
      .reduce((acc, cur) => acc * 60 + cur);
    if (time < 360 && time > closestBefore6am) {
      closestBefore6am = time;
    }
    if (time > 360 && time < closestAfter6am) {
      closestAfter6am = time;
    }
    times.push({
      timeZone,
      time,
    });
  });

  return [times, closestBefore6am, closestAfter6am] as const;
};

const StandUp = () => {
  const [times, setTimes] = useState<{
    allBefore6am: string[];
    allAfter6am: string[];
    timeTo6am: number;
    timeFrom6am: number;
  }>({
    allBefore6am: [],
    allAfter6am: [],
    timeTo6am: 0,
    timeFrom6am: 0,
  });

  useEffect(() => {
    const updateClosestTimeZone = () => {
      const [times, closestBefore6am, closestAfter6am] = getClosestTimeZone();
      const allBefore6am = times
        .filter((time) => time.time === closestBefore6am)
        .map((time) => time.timeZone);
      const allAfter6am = times
        .filter((time) => time.time === closestAfter6am)
        .map((time) => time.timeZone);
      setTimes({
        allBefore6am,
        allAfter6am,
        timeTo6am: 360 - closestBefore6am,
        timeFrom6am: closestAfter6am - 360,
      });
    };
    updateClosestTimeZone();
    const interval = setInterval(updateClosestTimeZone, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-4xl">Stand Up</h1>
      <p>Our current stand up started {times.timeFrom6am} minutes ago in:</p>
      <ul className="list-disc">
        {times.allAfter6am.map((timeZone) => (
          <li key={timeZone}>{timeZone}</li>
        ))}
      </ul>
      <p>
        It is currently {times.timeTo6am} minutes until our 6am stand up in:
      </p>
      <ul className="list-disc">
        {times.allBefore6am.map((timeZone) => (
          <li key={timeZone}>{timeZone}</li>
        ))}
      </ul>
    </div>
  );
};

export default StandUp;
