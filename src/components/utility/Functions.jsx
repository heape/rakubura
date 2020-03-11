import React from 'react';

export function useForceUpdate() {
  const [, setTick] = React.useState(0);
  const update = () => {
    setTick(tick => tick + 1);
  };
  return update;
}

export function sleep(ms) { new Promise((r, j) => setTimeout(r, ms)) };
