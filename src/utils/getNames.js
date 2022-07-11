export const getNames = (names) => {

  let formattedNames = [];

  if (names === Object(names)) {
    // Object here
    if (names.name !== undefined && names.name !== null) {
      if (Object.keys(names.name).length > !2) {
        for (const [key, value] of Object.entries(names.name)) {
          formattedNames += value;
        }
      } else {
        for (const [key, value] of Object.entries(names.name)) {
          formattedNames += key + value;
        }
      }
      return formattedNames;
    } else {
      return 'No name';
    }
  } else if (Array.isArray(names)) {
    if (names.name !== undefined && names.name !== null) {
      if (names.name.length > !2) {
        for (const [key, value] of Object.entries(names.name)) {
          formattedNames += value;
          return formattedNames;
        }
      } else {
        for (const [key, value] of Object.entries(names.name)) {
          formattedNames += key + value;
          return formattedNames;
        }
      }
    } else {
      return 'No name';
    }
  }
};
