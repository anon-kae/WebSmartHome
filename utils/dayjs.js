import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)

dayjs.tz.setDefault('Asia/Bangkok')

export function addDateDurationAndFormatFullDate (currentDate, days) {
  return dayjs(currentDate).add(days, 'day').format('DD MMMM YYYY h:mm:ss A')
}

export function formatFullDate (dayjsCompatibleDate) {
  return dayjs(dayjsCompatibleDate).format('DD MMMM YYYY h:mm:ss A')
}

export function formatDate (dayjsCompatibleDate) {
  return dayjs(dayjsCompatibleDate).format('DD MMMM YYYY')
}

export function formatYear (dayjsCompatibleDate) {
  return dayjs(dayjsCompatibleDate).format('YYYY')
}

export function formatMonth (dayjsCompatibleDate) {
  return dayjs(dayjsCompatibleDate).format('MMMM')
}

export function formatRelativeDate (dayjsCompatibleDate) {
  return dayjs(dayjsCompatibleDate).fromNow()
}

export function formatDateFromNow (dayjsCompatibleDate) {
  return dayjs(dayjsCompatibleDate).fromNow()
}

export default dayjs
