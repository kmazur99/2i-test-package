/// <reference types="cypress" />

// Load json file with generated data
const users = require('../fixtures/parsed_data.json')

describe('Load data', () => {

    it('load users data', () => {

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