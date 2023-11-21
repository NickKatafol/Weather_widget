describe('settingsWindow', () => {
  function openSettingsWindow() {
    localStorage.removeItem(Cypress.env('WEATHER_LOCAL_STORAGE_NAME'))
    cy.visit('/')                                         //but there is redirect to '/about'
    cy.get('.header__cross-btn').click()                 //go to '/'
    cy.get('.spot__header .header__cross').click()      //open Settings window
  }

  it('Opening Settings window is correct', () => {
    openSettingsWindow()

    cy.get('.spot__header .header__title').should('be.visible')
  })

  describe('testing Settings window', () => {
    beforeEach(() => {
      if (!cy.get('.spot__header .header__title').should('be.visible'))
        openSettingsWindow()
    })

    afterEach(() => {
      cy.get('input').clear()
    })

    it('Type city name and receive new Weather set via apply button', () => {
      cy.contains('City').find('~ input').type('Miami')
      cy.contains('apply').click()

      cy.contains('Miami').should('exist')
    })

    it('Type city name and receive new Weather set via Enter keyboard', () => {
      cy.contains('City').find('~ input').type('Miami')
        .trigger('Enter')

      cy.contains('Miami').should('exist')
    })

    it('Type coordinates and receive new Weather set via apply button', () => {
      cy.contains('longitude').find('~ input').type('-87.65')
      cy.contains('latitude').find('~ input').type('41.85')
      cy.contains('apply').click()

      cy.contains('Chicago').should('exist')
    })

  })

})
