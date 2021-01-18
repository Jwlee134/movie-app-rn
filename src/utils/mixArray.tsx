import {Movie} from '~/@types';

export const mixArray = (data: Movie[]) => {
  const newData = [...data];
  const mixed = newData.sort(() => 0.5 - Math.random());
  return mixed;
};
