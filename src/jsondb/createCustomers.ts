import * as faker from 'faker/locale/zh_TW';
import * as fs from 'fs';

export const createCustomers = (count: number) => {
    console.log(`create ${count} customers start...`)
    let customers = [];

    for (let i: number = 0; i < count; i ++) {
        let gender: number = (i % 2 === 0 ? 1 : 0);
        let customer = {
            lastName: faker.name.lastName(gender),
            firstName: faker.name.firstName(gender),
            birthDate: faker.date.between(new Date(1970, 1, 1), new Date(2009, 12, 31)),        
            email: faker.internet.email(),
            address: {
                country: faker.address.country(),
                city: faker.address.cityPrefix(),
                zip: faker.address.zipCode(),
                street: faker.address.streetName(),
                address: faker.address.streetAddress()
            }
        }
        customers.push(customer);
    }
    fs.writeFile('./customers.json', JSON.stringify(customers), () => console.log('customers json file created.'));
    console.log(`create ${count} customers end.`)
}

(function() {
    createCustomers(500);
})();