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

    cy.get('#quote-list > ul').children().first().children().first().should('have.text', 'my test quote');

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

    cy.get('#quote-list > ul').children().first().children().first().should('have.text', 'my new test quote');

  })

  it('Shoud display filtered quotes only', () => {
    cy.get('#evaluate-quote').should('have.attr', 'disabled');

    cy.get('#new-quote').type('my test quote fast');
    cy.get('#quote-author').type('my test author');
    cy.get('#evaluate-quote').click();
    cy.wait(1000);

    cy.get('#new-quote').clear().type('The only way to go fast, is to go well.');
    cy.get('#quote-author').clear().type('Robert C. Martin');
    cy.get('#evaluate-quote').click();
    cy.wait(1000);

    cy.get('#filter-keyword').clear().type('Robert C. Martin');
    cy.wait(300);
    cy.get('#quote-list > ul').children().should('have.length', 1);
    cy.get('#quote-list > ul').children().first().children().first().should('have.text', 'The only way to go fast, is to go well.');
    cy.get('#filter-keyword').clear();
    cy.wait(300);
    cy.get('#quote-list > ul').children().should('have.length', 2);
    cy.get('#filter-keyword').type('fast');
    cy.wait(300);
    cy.get('#quote-list > ul').children().should('have.length', 2);
    cy.get('#filter-keyword').clear();
    cy.wait(300);
    cy.get('#filter-keyword').type('quote');
    cy.wait(300);
    cy.get('#quote-list > ul').children().should('have.length', 1);
  })

  // @todo: find a test to check pasted content
  it('Shoud copy/paste quotes', () => {
    // cy.get('#evaluate-quote').should('have.attr', 'disabled');
    //
    // cy.get('#new-quote').type('my test quote fast');
    // cy.get('#evaluate-quote').click();
    // cy.wait(1000);
    //
    // cy.get('#quote-list > ul').children().first().get('button').click({ multiple: true });
  })

  it('Shoud save quote inside personal quote collection', () => {
    cy.get('#evaluate-quote').should('have.attr', 'disabled');
    cy.get('#new-quote').type('my test quote fast');
    cy.get('#quote-author').type('my test author');
    cy.get('#evaluate-quote').click();
    cy.wait(1000);

    cy.get('#new-quote').clear().type('The only way to go fast, is to go well.');
    cy.get('#quote-author').clear().type('Robert C. Martin');
    cy.get('#evaluate-quote').click();
    cy.wait(1000);
    cy.get('#filter-keyword').clear();
    cy.wait(300);
    cy.get('#quote-list > ul').children().should('have.length', 2);
    cy.get('#quote-suggestion-list > ul > li > .right-btn').click();
    cy.wait(300);
    cy.get('#quote-list > ul').children().should('have.length', 3);
  })
})
