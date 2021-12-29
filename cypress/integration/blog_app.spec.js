describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  })

  it("Entering only displays login form", function(){
    cy.get('#loginForm');
  })

})
