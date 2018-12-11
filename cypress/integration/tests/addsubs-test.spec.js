/* global cy */
/* global describe it */
/* eslint-env mocha */
describe('Adding a New Member', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/add-submission')
  })
  it('Are all titles visible ', () => {
    cy.contains('Name')
    cy.contains('Age')
    cy.contains('Gender')
    cy.contains('Start Weight')
    cy.contains('Goal Weight')
    cy.contains('Current Weight')
    cy.contains('Height')
    cy.contains('Select location')
    cy.contains('Date')
  })
  it('Is the add working', () => {
    cy.get(':nth-child(1) > .form__input').type('test').should('have.value', 'test')
    cy.get(':nth-child(2) > .form__input').type(21)
    cy.get('#gender').select('Male')
    cy.get(':nth-child(4) > .form__input').type(21)
    cy.get(':nth-child(5) > .form__input').type(21)
    cy.get(':nth-child(6) > .form__input').type(21)
    cy.get(':nth-child(7) > .form__input').type(21)
    cy.get('#location').select('Waterford')
    cy.get(':nth-child(10) > .btn').click()
  })
  it('View list', () => {
    cy.get('#bb').click()
    cy.url().should('include', '/submissions')
    return cy
  })
})
