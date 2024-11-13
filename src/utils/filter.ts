/**
 * 검색 결과 필터링
 * @param stnd 기준 string 배열
 * @param input 검색할 string
 */
export const findMatchingSearch = (stnd: string[], input: string) => {
  return stnd.filter((item) => item.includes(input));
};

/**
 * 작성자 필터링
 */
export const filterAuthor = (email: string) => {
  const split = email.split('@');
  return `${split[0].slice(0, 2)}****@${split[1]}`;
};