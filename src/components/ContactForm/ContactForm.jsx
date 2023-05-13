import PropTypes from 'prop-types';
// import { Component } from 'react';
import { nanoid } from 'nanoid';
import { useState } from 'react';

import css from './ContactForm.module.css';

export function ContactForm({ onSubmit }) {
  const [ name, setName ] = useState('');
  const [ number, setNumber ] = useState('');

  const onChangeName = e => setName(e.currentTarget.value);
  const onChangeNumber = e => setNumber(e.currentTarget.value);

  const onFormSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  return (
    <form className={css.inputForm} onSubmit={onFormSubmit}>
      <div>
        <label htmlFor={nameInputId}>
          <span className={css.nameInputSpan}>Name</span>
          <input
            className={css.nameInput}
            id={nameInputId}
            type="text"
            name="name"
            value={name}
            onChange={onChangeName}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
      </div>

      <div>
        <label htmlFor={numberInputId}>
          <span className={css.numberInputSpan}>Number</span>
          <input
            className={css.numberInput}
            id={numberInputId}
            type="tel"
            name="number"
            value={number}
            onChange={onChangeNumber}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>

      <button className={css.btnForm} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
