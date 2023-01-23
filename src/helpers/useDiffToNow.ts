import React from "react";

const toUtc = (date: any) => {
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return now_utc;
};

const useDiffToNow = (date: string) => {
  return React.useMemo(() => {
    if (!date) return null;
    const then = new Date(date);

    const now_utc = toUtc(new Date(Date.now()));
    const diff = now_utc - toUtc(then);
    //@todo why utc doesn't work? remove - 60 minutes hack
    const roundedMinutes = Math.floor(diff / 1000 / 60) - 60;

    if (roundedMinutes >= 60) {
      const hours = Math.floor(roundedMinutes / 60);
      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return days + " days ago";
      }
      return hours + " hours ago";
    }
    if (roundedMinutes === 0) {
      return "now";
    }
    if (roundedMinutes === 1) {
      return "1 minute ago";
    }
    return roundedMinutes + " minutes ago";
  }, [date]);
};

export default useDiffToNow;
