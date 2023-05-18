import { useEffect, useState } from 'react';

const getClosestTimeZone = () => {
  // target 6am

  // go through all timezones
  // get current time in that timezone
  // get difference between current time and 6am
  // return the timezone with the smallest difference

  // get current time
  const currentTime = new Date();

  // get the time in each timezone
  const aryIannaTimeZones = Intl.supportedValuesOf('timeZone');

  let smallestDifference = 24 * 60;
  let matchingTimeZones: string[] = [];

  aryIannaTimeZones.forEach((timeZone) => {
    // get current hour and minute in this timezone
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
    if (time < 360) {
      if (360 - time < smallestDifference) {
        smallestDifference = 360 - time;
        matchingTimeZones = [timeZone];
      } else if (360 - time === smallestDifference) {
        matchingTimeZones.push(timeZone);
      }
    }
  });

  return [matchingTimeZones, smallestDifference] as const;
};

const StandUp = () => {
  const [matchingTimeZones, setMatchingTimeZones] = useState<string[]>([]);
  const [smallestDifference, setSmallestDifference] = useState<number>(0);

  useEffect(() => {
    const updateClosestTimeZone = () => {
      const [matchingTimeZones, smallestDifference] = getClosestTimeZone();
      setMatchingTimeZones(matchingTimeZones);
      setSmallestDifference(smallestDifference);
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
      <p>
        It is currently {smallestDifference} minutes until our 6am stand up in:
      </p>
      <ul className="list-disc">
        {matchingTimeZones.map((timeZone) => (
          <li key={timeZone}>{timeZone}</li>
        ))}
      </ul>
    </div>
  );
};

export default StandUp;
