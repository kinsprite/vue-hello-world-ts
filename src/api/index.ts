/* eslint-disable import/prefer-default-export */

export const fetchItem = (id: number) => {
  const a = 10;
  const b = 20;
  const item = {
    id,
    value: a + b,
  };

  return Promise.resolve(item);
};
