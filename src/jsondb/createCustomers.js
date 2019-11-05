"use strict";
exports.__esModule = true;
var faker = require("faker/locale/zh_TW");
var fs = require("fs");
exports.createCustomers = function (count) {
    console.log("create " + count + " customers start...");
    var customers = [];
    for (var i = 0; i < count; i++) {
        var gender = (i % 2 === 0 ? 1 : 0);
        var customer = {
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
        };
        customers.push(customer);
    }
    fs.writeFile('./customers.json', JSON.stringify(customers), function () { return console.log('customers json file created.'); });
    console.log("create " + count + " customers end.");
};
(function () {
    exports.createCustomers(500);
})();
