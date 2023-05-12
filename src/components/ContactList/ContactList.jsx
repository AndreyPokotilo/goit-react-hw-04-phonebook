import PropTypes from 'prop-types';
import { Contact } from "./Contact";

import css from "./ContactList.module.css"

export function ContactList({ items, onDeleteContacts }) {

  return (
    <ul className={css.listContact}>
      {items.map(({id, name, number }) => (
        <li className={css.listItem} key={id}>
        <Contact
          name={name}
          number={number}
          onDeleteContacts={onDeleteContacts}
          contactId={id}
        />
      </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
  onDeleteContacts: PropTypes.func.isRequired,
};