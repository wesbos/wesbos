'use client';

import { useState, useEffect } from 'react';

function useInterval(callback: () => void, delay: number) {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

function useOldGuy({ update = 60000 }) {
  const startingDate = 940001932590;
  const birth = 572195051960;
  const [timeSinceStarting, setTime] = useState(Date.now() - startingDate);
  const [age, setAge] = useState(Date.now() - birth);
  useInterval(() => {
    setTime(Date.now() - startingDate);
    setAge(Date.now() - birth);
  }, update);
  return {
    timeSinceStarting,
    timeAsYears: Math.floor(timeSinceStarting / 1000 / 60 / 60 / 24 / 365),
    age,
    // this doesn't account for leap years and will be wrong in about 1400 years
    ageAsYears: Math.floor(age / 1000 / 60 / 60 / 24 / 365),
  };
}

export function TimeSinceStarting() {
  const { timeSinceStarting } = useOldGuy({
    update: 100,
  });
  return <span suppressHydrationWarning>{timeSinceStarting}</span>;
}

export function TimeSince() {
  const { timeAsYears, timeSinceStarting, age, ageAsYears } = useOldGuy({ update: 100 });
  return (
    <p>
      I'm a web developer, teacher and speaker from Hamilton, Ontario 🇨🇦. I'm{' '}
      <span suppressHydrationWarning title={`That's ${age} ms!`}>
        {ageAsYears}
      </span>{' '}
      years old and I've been{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://web.archive.org/web/20040608163410/http://www.wesbos.com/"
      >
        making websites
      </a>{' '}
      for about <span suppressHydrationWarning>{timeAsYears}</span> years - or <em>exactly</em> <TimeSinceStarting />{' '}
      milliseconds!
    </p>
  );
}
