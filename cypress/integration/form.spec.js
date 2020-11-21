context('Maps', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })


  it('Shoud see te quote results after form compilation', () => {
    cy.get('#evaluate-quote').should('have.attr', 'disabled');
    cy.get('#new-quote')
      .type('my test quote').should('have.value', 'my test quote');

    cy.get('#quote-author')
      .type('my test author').should('have.value', 'my test author');


    cy.get('#evaluate-quote').click();
    cy.wait(2000);
    cy.get('#quote-list > ul').children().should('have.length', 1);

    cy.get('#quote-list > ul').children().first().should('have.text', 'my test quote');

  })

  it('Shoud display newer quotes first', () => {
    cy.get('#evaluate-quote').should('have.attr', 'disabled');
    cy.get('#new-quote')
      .type('my test quote').should('have.value', 'my test quote');

    cy.get('#quote-author')
      .type('my test author').should('have.value', 'my test author');
    cy.get('#evaluate-quote').click();
    cy.wait(2000);
    cy.get('#new-quote').clear()
      .type('my new test quote').should('have.value', 'my new test quote');

    cy.get('#quote-author').clear()
      .type('my new test author').should('have.value', 'my new test author');


    cy.get('#evaluate-quote').click();
    cy.wait(2000);
    cy.get('#quote-list > ul').children().should('have.length', 2);

    cy.get('#quote-list > ul').children().first().should('have.text', 'my new test quote');

  })

})
