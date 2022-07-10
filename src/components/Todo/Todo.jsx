import React, { useMemo } from 'react';
import { LazyImage } from '../LazyImage';
import { Location } from '../Location';
import './Todo.css';

export const Todo = ({ todo, onChange, config, isCompleted }) => {
  const [showModal, setShownModal] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const showHideClassName = showModal ? 'modal display-block' : 'modal display-none';

  const handleModal = () => {
    setShownModal(!showModal);
  };

  const closeModal = () => {
    setShownModal(false);
  };

  React.useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  React.useEffect(() => {
    if (config.sorted) {
      setShownModal(true);
    }
  }, [config.sorted]);

  var formattedNames = [];

  const getNames = (names) => {
    if (names === Object(names)) {
      // Object here
      if (names.name != undefined && names.name != null) {
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
      if (names.name != undefined && names.name != null) {
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

  const userName = useMemo(() => getNames(todo), []);

  /* Remove location function and place it in a component */
  // const getLocation = ({ location: { street, ...rest } }) => {
  //   const myStreetName = street.name;
  //   const myStreetNumber = street.number;
  //   const myPostcode = rest.postcode;
  //   const myCity = rest.city;
  //   const myState = rest.state;
  //   const myCountry = rest.country;

  //   return (
  //     <>
  //       Address: {myStreetName + ' ' + myStreetNumber}
  //       <br></br>
  //       <br></br>
  //       Postcode: {myPostcode}
  //     </>
  //   );
  // };

  // const userLocation = useMemo(() => getLocation(todo), []);

  // const getPicture = () => {
  //   return <LazyImage src={todo.picture.large} alt={todo.picture.large} />;
  // };

  return (
    <div className='todo'>
      <div className='todo_title'>{userName}</div>

      <div className='todo_image' onClick={handleModal}>
        {/**Place lazy image component in here directly */}
        <LazyImage src={todo.picture.large} alt={todo.picture.large} />
      </div>

      <div className='todo_location'>
        <Location location={todo.location} />
      </div>

      <span>
        Completed: <input type='checkbox' checked={completed} className='todo_checked' onChange={onChange} />
      </span>

      <div className={showHideClassName}>
        <section className='modal-wrapper'>
          <LazyImage src={todo.picture.large} alt={todo.picture.large} />
          <div className='todo_description'>{todo.description}</div>
          <button type='button' onClick={closeModal}>
            Close
          </button>
        </section>
      </div>
    </div>
  );
};
