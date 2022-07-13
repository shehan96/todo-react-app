import React, { useMemo } from 'react';
import { getNames } from '../../utils';
import { LazyImage } from '../LazyImage';
import { Location } from '../Location';
import './Todo.css';

export const Todo = ({ todo, onChange, config, isCompleted }) => {
  const [showModal, setShownModal] = React.useState(false);
  // const [completed, setCompleted] = React.useState(false);
  const showHideClassName = showModal ? 'modal display-block' : 'modal display-none';

  const handleModal = () => {
    setShownModal(!showModal);
  };

  const closeModal = () => {
    setShownModal(false);
  };

  // React.useEffect(() => {
  //   setCompleted(isCompleted);
  // }, [isCompleted]);

  // React.useEffect(() => {
  //   if (config.sorted) {
  //     setShownModal(true);
  //   }
  // }, [config.sorted]);

  const userName = useMemo(() => getNames(todo), []);

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
        Completed:{' '}
        <input
          type='checkbox'
          checked={isCompleted}
          className='todo_checked'
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
        />
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
