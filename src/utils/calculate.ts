import { BigNumber, ethers } from 'ethers';

// * toFixed로 인해 불필요한 0 제거
export const removeUnnecessaryZero = (value: string) => {
  return value.includes('.') ? value.replace(/\.?0+$/, '') : value;
};

// * 큰 수를 특정 단위로 포맷팅
export const formatBigNumber = (value: string | number) => {
  const num = ethers.utils.parseUnits(value.toString(), 18);
  const integerValue = parseFloat(ethers.utils.formatUnits(num, 18));

  // Q: Quadrillion, T: Trillion, B: Billion, M: Million, K: Thousand
  if (integerValue >= 1e15) {
    return (integerValue / 1e15).toFixed(2) + ' Q';
  } else if (integerValue >= 1e12) {
    return (integerValue / 1e12).toFixed(2) + ' T';
  } else if (integerValue >= 1e9) {
    return (integerValue / 1e9).toFixed(2) + ' B';
  } else if (integerValue >= 1e6) {
    return (integerValue / 1e6).toFixed(2) + ' M';
  } else if (integerValue >= 1e3) {
    return (integerValue / 1e3).toFixed(2) + ' K';
  } else {
    return integerValue.toLocaleString();
  }
};

// 지수 형태의 값을 소수점 형태로 변환
const convertExponentialToDecimal = (exponentialValue: string | number) => {
  const strValue = exponentialValue.toString();
  if (strValue.includes('e') || strValue.includes('E')) {
    return Number(strValue).toFixed(18); // 소수점 18자리까지 표현
  }
  return strValue;
};

// * localeString 소수점 자리수 포맷팅
export const formatPrecisionToLocaleString = (
  price: number | string,
  precision: number = 5,
) => {
  // 문자열로 변환하여 소수점 이하 precision 자리까지 자름
  let formattedPrice = Number(price).toFixed(precision);

  // 만약 소수점 이하 자릿수가 precision 자리 이하인 경우 그대로 표시
  if (Number(price) < 1) {
    const actualDigits = price.toString().split('.')[1]?.length || 0;
    if (actualDigits < precision) {
      formattedPrice = Number(price).toFixed(actualDigits);
    }
  }

  // toLocaleString을 사용하면서 자동 반올림 방지
  const localeFormattedPrice = parseFloat(formattedPrice).toLocaleString(
    undefined,
    { minimumFractionDigits: 0, maximumFractionDigits: precision },
  );

  return localeFormattedPrice;
};

// * localeString 소수점 자리수 절대값 포맷팅
export const formatPrecisionAbsToLocaleString = (
  price: number | string,
  precision: number = 5,
) => {
  // 절대값으로 변환
  const absPrice = Math.abs(Number(price));

  // 문자열로 변환하여 소수점 이하 precision 자리까지 자름
  let formattedPrice = absPrice.toFixed(precision);

  // 만약 소수점 이하 자릿수가 precision 자리 이하인 경우 그대로 표시
  if (absPrice < 1) {
    const actualDigits = absPrice.toString().split('.')[1]?.length || 0;
    if (actualDigits < precision) {
      formattedPrice = absPrice.toFixed(actualDigits);
    }
  }

  // toLocaleString을 사용하면서 자동 반올림 방지
  const localeFormattedPrice = parseFloat(formattedPrice).toLocaleString(
    undefined,
    { minimumFractionDigits: 0, maximumFractionDigits: precision },
  );

  return localeFormattedPrice;
};

// * number 타입의 값 소수점 자리수 포맷팅
export const formatPrecisionToNumber = (
  price: number | string,
  precision: number = 5,
) => {
  // 문자열로 변환하여 소수점 이하 precision 자리까지 자름
  let formattedPrice = Number(price).toFixed(precision);

  // 만약 소수점 이하 자릿수가 precision 자리 이하인 경우 그대로 표시
  if (Number(price) < 1) {
    const actualDigits = price.toString().split('.')[1]?.length || 0;
    if (actualDigits < precision) {
      formattedPrice = Number(price).toFixed(actualDigits);
    }
  }

  // 숫자로 변환하여 반환
  return parseFloat(formattedPrice);
};

// 큰 수를 곱한 결과를 포맷팅 (소수 끼리 곱셈)
export const formatMulBigNumber = (
  value1: string | number,
  value2: string | number,
  digits: number = 2,
) => {
  try {
    // 지수 형태를 일반 소수점 형태로 변환
    const decimalValue1 = convertExponentialToDecimal(value1);
    const decimalValue2 = convertExponentialToDecimal(value2);

    // wei 단위로 변환
    const num1 = ethers.utils.parseEther(decimalValue1);
    const num2 = ethers.utils.parseEther(decimalValue2);

    // wei 단위로 변환한 값을 곱함
    const result = num1.mul(num2);

    // wei 단위로 곱했기 때문에 원래의 값으로 변환
    const parseResult = ethers.utils.formatUnits(result, 36);

    // digits가 0일 때는 버림 처리
    if (digits === 0) {
      const floatResult = parseFloat(parseResult);
      return Math.floor(floatResult).toString();
    }

    return parseFloat(parseResult).toFixed(digits);
  } catch (error) {
    console.error('formatMulBigNumber', error);
  }
};

// * 큰 수를 곱한 결과를 포맷팅 (소수와 정수 끼리 곱셈)
export const formatMulBigNumberInteger = (
  decimalValue: string | number,
  integerValue: string | number,
  digits: number = 4,
) => {
  try {
    // 입력 값 검증
    const decValue = parseFloat(decimalValue.toString());
    const intNumber = BigNumber.from(integerValue.toString());

    // BigNumber 객체로 변환 후 계산
    const num1 = ethers.utils.parseUnits(decValue.toFixed(18), 18); // 소수점 이하 18자리까지만 허용
    const result = num1.mul(intNumber);
    const parseResult = ethers.utils.formatUnits(result, 18);

    return parseFloat(parseResult).toFixed(digits);
  } catch (error) {
    console.error('formatMulBigNumberInteger', error);
  }
};

// 큰 수를 곱한 결과를 포맷팅 (소수 끼리 곱셈)
export const formatDivBigNumber = (
  value1: string | number,
  value2: string | number,
  digits: number = 2,
) => {
  try {
    // 지수 형태를 일반 소수점 형태로 변환
    const decimalValue1 = convertExponentialToDecimal(value1);
    const decimalValue2 = convertExponentialToDecimal(value2);

    // wei 단위로 변환
    const num1 = ethers.utils.parseEther(decimalValue1);
    const num2 = ethers.utils.parseEther(decimalValue2);

    // wei 단위로 변환한 값을 나눔
    const result = num1.div(num2);

    // wei 단위로 나눴기 때문에 원래의 값으로 변환
    const parseResult = ethers.utils.formatUnits(result, 18);
    return parseFloat(parseResult).toFixed(digits);
  } catch (error) {
    console.error('formatDivBigNumber', error);
  }
};

// 큰 수를 더한 결과를 포맷팅 (소수 끼리 덧셈)
export const formatAddBigNumber = (
  value1: string | number,
  value2: string | number,
  digits: number = 2,
) => {
  try {
    // 지수 형태를 일반 소수점 형태로 변환
    const decimalValue1 = convertExponentialToDecimal(value1);
    const decimalValue2 = convertExponentialToDecimal(value2);

    // wei 단위로 변환
    const num1 = ethers.utils.parseEther(decimalValue1);
    const num2 = ethers.utils.parseEther(decimalValue2);

    // wei 단위로 변환한 값을 더함
    const result = num1.add(num2);

    // wei 단위로 더했기 때문에 원래의 값으로 변환
    const parseResult = ethers.utils.formatUnits(result, 18);
    return parseFloat(parseResult).toFixed(digits);
  } catch (error) {
    console.error('formatAddBigNumber', error);
  }
};

// 큰 수를 뺀 결과를 포맷팅 (소수 끼리 뺄셈)
export const formatSubBigNumber = (
  value1: string | number,
  value2: string | number,
  digits: number = 2,
) => {
  try {
    // 지수 형태를 일반 소수점 형태로 변환
    const decimalValue1 = convertExponentialToDecimal(value1);
    const decimalValue2 = convertExponentialToDecimal(value2);

    // wei 단위로 변환
    const num1 = ethers.utils.parseEther(decimalValue1);
    const num2 = ethers.utils.parseEther(decimalValue2);

    // wei 단위로 변환한 값을 뺌
    const result = num1.sub(num2);

    // wei 단위로 뺐기 때문에 원래의 값으로 변환
    const parseResult = ethers.utils.formatUnits(result, 18);
    return parseFloat(parseResult).toFixed(digits);
  } catch (error) {
    console.error('formatSubBigNumber', error);
  }
};

// 정수인지 확인
export const isInteger = (value: string | number) => {
  return Number.isInteger(Number(value));
};
