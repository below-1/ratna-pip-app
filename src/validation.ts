import * as v from '@badrap/valita'

export const DateSchema = v.string()
  .chain(str => {
    const date = new Date(str);

    // If the date is invalid JS returns NaN here
    if (isNaN(date.getTime())) {
      return v.err(`Invalid date "${str}"`);
    }
  
    return v.ok(date);
  });

// Use this when handle input from FormData
// As everything is string when using FormData
export const NumberFromString = v.string()
  .chain(str => {
    const result = parseInt(str);
    if (isNaN(result)) {
      return v.err(`Invalid number: "${str}"`)
    }

    return v.ok(result);
  })