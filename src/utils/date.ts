import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/**
 * day.js 기본 설정
 * 한국 시간으로 되어 있으며, 커스텀 희망시 아래 설정 변경
 */
dayjs.locale('ko');
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

// * 날짜 locale format
export const localizedFormatDate = (
  date: Date | string,
  format: string = 'YYYY.MM.DD',
) => {
  if (!date) return '';

  return dayjs(date).tz('Asia/Seoul').format(format);
};

// * 날짜 format
export const formatDate = (
  date: Date | string,
  format: string = 'YYYY.MM.DD',
) => {
  if (!date) return '';

  return dayjs(date).format(format);
};

// * 오늘 날짜 범위 가져오기 (한국 시간)
export const getTodayDateRange = () => {
  const todayStartAt = dayjs().tz('Asia/Seoul').startOf('day');
  const todayEndAt = dayjs().tz('Asia/Seoul').endOf('day');

  return {
    todayStartAt: todayStartAt.toDate(),
    todayEndAt: todayEndAt.toDate(),
  };
};

// * 이번 주 날짜 범위 가져오기 (한국 시간)
export const getThisWeekDateRange = () => {
  const weekStartAt = dayjs().tz('Asia/Seoul').startOf('isoWeek');
  const weekEndAt = dayjs().tz('Asia/Seoul').endOf('isoWeek');

  return {
    weekStartAt: weekStartAt.toDate(),
    weekEndAt: weekEndAt.toDate(),
  };
};

// * 이번 달 날짜 범위 가져오기 (한국 시간)
export const getThisMonthDateRange = () => {
  const monthStartAt = dayjs().tz('Asia/Seoul').startOf('month');
  const monthEndAt = dayjs().tz('Asia/Seoul').endOf('month');

  return {
    monthStartAt: monthStartAt.toDate(),
    monthEndAt: monthEndAt.toDate(),
  };
};

// * 입력받은 날짜(timestamp)에서 다음 날 오후 1시 정각으로 timestamp 반환 (한국 시간)
export const getNextDayOnePM = (timestamp: number) => {
  return dayjs(timestamp)
    .tz('Asia/Seoul') // 한국 시간으로 설정
    .add(1, 'day') // 다음 날로 이동
    .set('hour', 13) // 오후 1시 설정
    .set('minute', 0) // 분을 0으로 설정
    .set('second', 0) // 초를 0으로 설정
    .set('millisecond', 0) // 밀리초를 0으로 설정
    .toDate();
};

// * 현재 일(day) 가져오기 (한국 시간)
export const getCurrentDay = () => {
  return dayjs().tz('Asia/Seoul').date();
};

// * 현재 달(month) 가져오기 (한국 시간)
export const getCurrentMonth = () => {
  return dayjs().tz('Asia/Seoul').month() + 1;
};
