import './Loader.css';

export const Loader = () => {
  return (
    <>
      <div className='container'>
        <div className='loader'>
          <div className='loaderWheel'></div>
          <div className='loaderText'></div>
        </div>
      </div>
    </>
  );
};
