import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Layout } from "./Layout";
import { useState } from "react";
import { useEffect } from "react";


export const App = () => {


  const [contacts, setContacts] = useState(() => { 
       return JSON.parse(localStorage.getItem("contacts")) || []
  });
  const [filter, setFilter] = useState('');


  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) 
    {
      alert(`${name} is already in contacts`)
    return}
    setContacts(prevContacts => ([...prevContacts, {id: nanoid(), name, number }]))
  }

  const deleteContact = (id) => {
   setContacts(prevContacts => (
      prevContacts.filter(contact => contact.id !== id)
    ))
  }

  const changeFilter = (evt) => {
  setFilter(evt.currentTarget.value)
  }

  useEffect(() => {
   localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
 
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    
  return (
      <Layout>
        <h1>Phonebook</h1>
  <ContactForm onSubmit={addContact}/>

  <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          items={filteredContacts}
           onDelete={deleteContact}/>
      </Layout>
  )
  
}















