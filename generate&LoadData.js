/// <reference types="cypress" />

describe('Generate data', () => {
    it('Generate users data', function() {
        cy.visit('http://localhost:3000/')
        cy.get('#custom-input').type('test')
        cy.get('#select-key-drop-basic').select('firstName')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('lastName')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('email')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('age')
        cy.get('#select-key-drop-age').select('any')
        cy.get('#btn-add-prop').click()
        cy.get('#btn-resCSV-data').click()
        cy.get('#entries-input').type('15')
        cy.get('#btn-get-data').click()
        cy.get('#btn-arr-data').click()
        cy.get('#btn-download-data').click()
    })

    it('Parse CSV to JSON', function() {
        // Load data from CSV file
        cy.readFile('cypress/downloads/generatedBy_react-csv.csv')
            .then((data) => {
                // Remove double quotes to allow parsing CSV to JSON
                var data_no_quotes = data.replace(/['"]+/g, '');
                // Remove invisible characters
                var data_fixed = data_no_quotes.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')

                // Organize the data
                var lines = data_fixed.split("\n");
                var result = [];
                var headers = lines[0].split(",");
                for (var i = 1; i < lines.length; i++) {

                    var obj = {};
                    var currentline = lines[i].split(",");

                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }
                    result.push(obj);
                }

                // Write data to JSON file
                cy.writeFile('cypress/fixtures/parsed_data.json', result)
            })
    })

});

// Load json file with generated data
const users = require('../fixtures/parsed_data.json')

describe('Load data', () => {

    it('load users data', () => {

        // Visit the page
        cy.visit('http://webdev.edinburghcollege.ac.uk/~HNCSOFTSA7/2i/')

        users.forEach(user => {

            // Enter the data from the file into HTML form
            cy.get('#fname').type(user.firstName);
            cy.get('#lname').type(user.lastName);
            cy.get('#email').type(user.email);
            cy.get('#age').type(user.age);
            cy.get('#btn').click()
        })
    })


});