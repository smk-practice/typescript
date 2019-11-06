import * as faker from 'faker';
import * as fs from 'fs';

export function generateCustomers() {
    let customers = [];
    for (let id:number = 0; id < 500; id ++) {
        let gender: number = (id % 2 == 0 ? 1 : 0);
        let fName: string = faker.name.firstName(gender), lName: string = faker.name.lastName(gender);
        let title = faker.name.title();
        let address = {
            city: faker.address.city(),
            country: faker.address.country(),
            state: faker.address.state(),
            street: faker.address.streetName(),
            streetAddress: faker.address.streetAddress()
        }

        customers.push ({
            firstName: fName,
            lastName: lName,
            title: title,
            gender: gender,
            address: address
        });
    }
    fs.writeFile('./customers.json', JSON.stringify(customers), () => {});
    return { customers: customers };
};

export default generateCustomers();

