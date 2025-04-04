/**
 * 작성자 필터링
 */
export const filterAuthor = (email: string) => {
  const split = email.split('@');
  return `${split[0].slice(0, 2)}****@${split[1]}`;
};
