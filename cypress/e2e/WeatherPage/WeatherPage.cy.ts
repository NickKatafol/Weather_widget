describe('Weather page', () => {
  beforeEach(() => {
    cy.visit('/about')
    cy.get('.header__cross-btn').click()
  })

  it('Routing to AboutPage via click on Weather title', () => {
    cy.get('[title="about this Demo"]').click()

    const AboutURL_RE = new RegExp(`/about\$`)
    cy.url().should('to.match', AboutURL_RE)
  })
})
