/**
 * 무작위의 n자리 문자열 생성
 */
export const createRandomString = (
  digits: number = 8,
  isAdditional: boolean = false,
): string => {
  // 문자 유형별 문자열 집합
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^()';

  // 각 문자 유형에서 하나씩 선택
  let result = [
    uppercase.charAt(Math.floor(Math.random() * uppercase.length)),
    numbers.charAt(Math.floor(Math.random() * numbers.length)),
  ];

  if (isAdditional) {
    result.push(
      lowercase.charAt(Math.floor(Math.random() * lowercase.length)),
      symbols.charAt(Math.floor(Math.random() * symbols.length)),
    );
  }

  // 모든 유형에서 선택된 4자리 이후 남은 자리를 무작위로 채움
  let allCharacters = uppercase + numbers;
  if (isAdditional) {
    allCharacters = uppercase + lowercase + numbers + symbols;
  }

  // 나머지 자리를 무작위로 채움
  for (let i = result.length; i < digits; i++) {
    result.push(
      allCharacters.charAt(Math.floor(Math.random() * allCharacters.length)),
    );
  }

  // 배열을 셔플해서 순서를 무작위로 만들기
  result = result.sort(() => Math.random() - 0.5);

  return result.join('');
};
