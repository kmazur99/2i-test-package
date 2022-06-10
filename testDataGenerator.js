describe('Test Data Generator', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it("Check if key elements have been loaded", () => {
        cy.get("#select-key-drop-basic").should('exist')
        cy.get("#btn-add-prop").should('exist')
        cy.get("#custom-input").should('exist')
        cy.get("#value-select-custom").should('exist')
        cy.get("#btn-add-custom").should('exist')
        cy.get("#btn-clear-object").should('exist')
        cy.get("#entries-input").should('exist')
        cy.get("#btn-get-data").should('exist')
        cy.get("#btn-resCSV-data").should('exist')
    })

    it('Check if first name has been added', () => {
        cy.get('#select-key-drop-basic').select('firstName')
        cy.get('#btn-add-prop').click()
        cy.get('#object-props > ul').should('contain.text', 'firstName')
    })

    it('Check if last name has been added', () => {
        cy.get('#select-key-drop-basic').select('lastName')
        cy.get('#btn-add-prop').click()
        cy.get('#object-props > ul').should('contain.text', 'lastName')
    })

    it('Check if email has been added', () => {
        cy.get('#select-key-drop-basic').select('email')
        cy.get('#btn-add-prop').click()
        cy.get('#object-props > ul').should('contain.text', 'email')
    })

    it('Check if age has been selected', () => {
        cy.get('#select-key-drop-basic').select('age')
        cy.get('#select-key-drop-age').select('any')
        cy.get('#btn-add-prop').click()
        cy.get('#object-props > ul').should('contain.text', 'age')
    })

    it('Add and clear custom keys', () => {
        cy.get('#custom-input').type('Forename')
        cy.get('#value-select-custom').select('firstName')
        cy.get('#btn-add-custom').click()
        cy.get('#custom-input').should('be.empty')
        cy.get('#object-props').contains('Forename')
        cy.get('#btn-clear-object').click()
        cy.get('#object-props > ul').should('be.empty')
    })

    it('Generate and arrange CSV file', () => {
        cy.get('#entries-input').type("15")
        cy.get('#select-key-drop-basic').select('firstName')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('lastName')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('email')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('age')
        cy.get('#select-key-drop-age').select('any')
        cy.get('#btn-add-prop').click()

        cy.contains('Generate CSV').click()
        cy.contains('Arrange CSV').click()
        cy.contains('Download CSV')
    })

    it('Show an error message when generating a CSV with no data', () => {

        cy.get('#btn-get-data').click()
        cy.contains('Error: No entries value specified')
    })

    it('Show an error message when entries field is empty', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#select-key-drop-basic').select('firstName')
        cy.get('#btn-add-prop').click()

        cy.get('#btn-get-data').click()
        cy.contains('Error: No entries value specified')
    })

    it('Show an error message when entries field contains negative value', () => {

        cy.get('#select-key-drop-basic').select('firstName')
        cy.get('#btn-add-prop').click()

        cy.get('#entries-input').type("-1")

        cy.get('#btn-get-data').click()
        cy.contains('Error: No entries value specified')
    })

    it('Close error message', () => {

        cy.get('#btn-get-data').click()
        cy.contains('Error: No entries value specified')
        cy.get('#btn-error-confirm').click()
        cy.get('body').not(':contains("Error: No entries value specified")')

    })

})