const {Command} = require('commander')
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require('./contacts')

const program = new Command()
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({action, id, name, email, phone}) {
	switch (action) {
		case 'list':
			const contacts = await listContacts()
			console.table(contacts)
			break

		case 'get':
			const contact = await getContactById(id)
			if (!contact) {
				return console.log('Контакт не найден')
			}
			console.table([contact])
			break

		case 'add':
			const newContact = await addContact(name, email, phone)
			if (!newContact) {
				return console.log('Переданы не все даны')
			}
			console.table([newContact])
			break

		case 'remove':
			const contactRemove = await removeContact(id)
			if (!contactRemove) {
				return console.log('Такого контакта нет')
			}
			console.table([contactRemove])
			break

		default:
			console.warn('\x1B[31m Unknown action type!')
	}
}

invokeAction(argv)
