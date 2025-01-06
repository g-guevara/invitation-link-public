'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import {Calendar} from "@nextui-org/react";
import {today, getLocalTimeZone, isWeekend, DateValue} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

export default function App() {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];

  let {locale} = useLocale();

  let isDateUnavailable = (date: DateValue) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );

  return <Calendar aria-label="Date (Unavailable)" isDateUnavailable={isDateUnavailable} />;
}