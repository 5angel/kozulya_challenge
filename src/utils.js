export const listPairs = (source) => {
  const result = [];

  source.forEach(left => (
    source.forEach(right => {
      if (left !== right) {
        result.push([left, right]);
      }
    })
  ));

  return result;
};

export const shuffleArray = (source) => {
  const array = source.slice();
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
