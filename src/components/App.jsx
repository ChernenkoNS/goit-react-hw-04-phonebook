import { useEffect, useState } from 'react';
import shortid from 'shortid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';

export function App() {
  const initialContacts =
    JSON.parse(localStorage.getItem('contactsBook')) ?? [];
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactsBook', JSON.stringify(contacts));
  }, [contacts]);

  const checkingUniqueNames = name => {
    return contacts.find(obj => obj.name === name);
  };

  const addContactName = (name, number) => {
    console.log('qqq');

    if (checkingUniqueNames(name)) {
      alert(`${name} is already is contacts`);
    } else {
      const contact = {
        name,
        number,
        id: shortid.generate(),
      };
      setContacts(contacts => [contact, ...contacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactName} />
      <h2>Contact</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
