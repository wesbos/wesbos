// helper function from https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
/* eslint-disable no-useless-escape */
export const pathJoin = (...args) =>
  args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[\/]*$/g, '');
      }
      return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
    })
    .filter((x) => x.length)
    .join('/');
