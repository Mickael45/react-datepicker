import {useMemo} from 'react'
import format from 'date-fns/format'
import {fr} from 'date-fns/locale'
import {getDays, GetDaysProps, getWeekdayLabels, GetWeekdayLabelsProps} from './useMonth.utils'

export const dayLabelFormatFn = (date: Date) => format(date, 'dd', {locale: fr})
export const weekdayLabelFormatFn = (date: Date) => format(date, 'eeeeee', {locale: fr})
export const monthLabelFormatFn = (date: Date) => format(date, 'MMMM yyyy', {locale: fr})

export interface UseMonthResult {
  weekdayLabels: string[]
  days: (number | {dayLabel: string; date: Date})[]
  monthLabel: string
}

export interface UseMonthProps extends GetWeekdayLabelsProps, GetDaysProps {
  monthLabelFormat?(date: Date): string
}

export function useMonth({
  year,
  month,
  firstDayOfWeek = 1,
  dayLabelFormat = dayLabelFormatFn,
  weekdayLabelFormat = weekdayLabelFormatFn,
  monthLabelFormat = monthLabelFormatFn,
}: UseMonthProps): UseMonthResult {
  const days = useMemo(() => getDays({year, month, firstDayOfWeek, dayLabelFormat}), [
    year,
    month,
    firstDayOfWeek,
    dayLabelFormat,
  ])
  const weekdayLabels = useMemo(() => getWeekdayLabels({firstDayOfWeek, weekdayLabelFormat}), [
    firstDayOfWeek,
    weekdayLabelFormat,
  ])

  return {
    days,
    weekdayLabels,
    monthLabel: monthLabelFormat(new Date(year, month)),
  }
}
