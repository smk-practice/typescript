var faker = require('faker');
var fs = require('fs');
function generateCustomers() {
    var customers = [];
    for (var id = 0; id < 500; id++) {
        var gender = (id % 2 == 0 ? 1 : 0);
        var fName = faker.name.firstName(gender), lName = faker.name.lastName(gender);
        var title = faker.name.title();
        var address = {
            city: faker.address.city(),
            country: faker.address.country(),
            state: faker.address.state(),
            street: faker.address.streetName(),
            streetAddress: faker.address.streetAddress()
        };
        customers.push({
            firstName: fName,
            lastName: lName,
            title: title,
            gender: gender,
            address: address
        });
    }
    fs.writeFile('./customers.json', JSON.stringify(customers), function () { });
    return { customers: customers };
}
exports.generateCustomers = generateCustomers;
;
exports["default"] = generateCustomers();
