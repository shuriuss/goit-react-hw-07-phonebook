import PropTypes from 'prop-types';
import s from './Filter.module.css';

import { search } from '../../redux/filterSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';

function Filter() {
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(search(e.target.value.toLowerCase()));
  };

  return (
    <>
      <div className={s.filter}>
        <h3 className={s.title}>Find contacts by name</h3>
        <input
          name="filter"
          onChange={handleChange}
          value={filter.value}
          className={s.input}
        />
      </div>
    </>
  );
}

Filter.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
