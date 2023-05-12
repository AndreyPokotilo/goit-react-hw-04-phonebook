import PropTypes from 'prop-types';
import css from './Filter.module.css'

export function Filter({filter, onFilter}) {
    return (
        <label className={css.filterLabel}>
      <p className={css.filterTitel}>Find contacts by name</p>
      <input
        className={css.filterInput}
        type="text"
        value={filter}
        onChange={onFilter}
      />
    </label>
    )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired, 
  onFilter: PropTypes.func.isRequired,
};