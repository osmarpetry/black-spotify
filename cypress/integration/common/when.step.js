import { When } from 'cypress-cucumber-preprocessor/steps'

When('I click on href {string}', href => {
    cy.get(`[href="/${href}"]`).click()
})

When('I click on first element a', () => {
    cy.get('a')
        .first()
        .click()
})
