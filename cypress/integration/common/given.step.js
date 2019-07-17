import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I go to {string}', url => {
    cy.visit(url)
})
