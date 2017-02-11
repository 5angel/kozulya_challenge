export const PRIMITIVES = [
  true,
  false,
  1,
  0,
  -1,
  'true',
  'false',
  '1',
  '0',
  '-1',
  '',
  null,
  undefined,
  Infinity,
  -Infinity,
  NaN,
];

export const OBJECTS = [
  [],
  [[]],
  [{}],
  [0],
  [1],
  {},
];

export const VALUES = PRIMITIVES.concat(OBJECTS);
