const fs = require('fs').promises
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

async function listContacts() {
	const data = await fs.readFile(contactsPath)
	const contacts = JSON.parse(data)
	return contacts
}

async function getContactById(contactId) {
	const contacts = await listContacts()
	const contact = contacts.find((item) => item.id === contactId)
	if (!contact) {
		return null
	}
	return contact
}

async function removeContact(contactId) {
	const contacts = await listContacts()
	const contact = await getContactById(contactId)

	if (!contact) {
		return null
	}
	const newContacts = contacts.filter((item) => item.id !== contactId)
	await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
	return contact
}

async function addContact(name, email, phone) {
	if (name !== undefined && email !== undefined && phone !== undefined) {
		const contacts = await listContacts()
		const newContact = {id: nanoid(), name, email, phone}
		contacts.push(newContact)
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
		return newContact
	}
	return null
}

module.exports = {listContacts, getContactById, removeContact, addContact}
