describe('About page', () => {
  const WeatherURL_RE = new RegExp(`${Cypress.env('baseUrl')}/\$`)

  it('Redirect to AboutPage while first visiting home page', () => {
    cy.visit('/')
    cy.reload(true)
    cy.contains('h1', 'ABOUT').should('be.visible')
  })

  it('Routing from AboutPage to WeatherPage via cross-button', () => {
    cy.visit('/about')
    cy.get('.header__cross-btn').click()

    cy.url().should('to.match', WeatherURL_RE)
  })

  it('Routing from AboutPage to WeatherPage via BACK_to_Home button', () => {
    cy.visit('/about')
    cy.get('footer .controller_open-space').click()

    cy.url().should('to.match', WeatherURL_RE)
  })

})
