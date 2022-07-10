import React from 'react';

export const Location = React.memo(({ location : { street, ...rest }}) => {


    const myStreetName = street.name;
    const myStreetNumber = street.number;
    const myPostcode = rest.postcode;
    const myCity = rest.city;
    const myState = rest.state;
    const myCountry = rest.country;

  return (
    <>
      Address: {myStreetName + ' ' + myStreetNumber}
      <br></br>
      <br></br>
      Postcode: {myPostcode}
    </>
  );
});
