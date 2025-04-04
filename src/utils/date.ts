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
