context('Maps', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })


  it('Shoud see te quote results after form compilation', () => {
    cy.get('#evaluate-quote').should('have.attr', 'disabled');
    cy.get('#new-quote')
      .type('my test quote').should('have.value', 'my test quote')

    cy.get('#quote-author')
      .type('my test author').should('have.value', 'my test author')


    cy.get('#evaluate-quote').click();
    cy.wait(2000);
    cy.get('#quote-list').children().should('have.length', 1)

  })

})
