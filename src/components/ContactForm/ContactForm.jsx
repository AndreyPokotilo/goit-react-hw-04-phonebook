import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css'

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.resetState();
  };

  resetState = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const nameInputId = nanoid();
    const numberInputId = nanoid();
    return (
      <form className={css.inputForm} onSubmit={this.onFormSubmit}>
        <div>
        <label htmlFor={nameInputId}>
          <span className={css.nameInputSpan}>Name</span>
          <input
          className={css.nameInput}
            id={nameInputId}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
