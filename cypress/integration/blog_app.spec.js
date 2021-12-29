describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'Tester',
      password: 'testingPWD',
      name: 'Sylvester the Tester'
    })
    cy.visit('http://localhost:3000');
  })

  describe('Login', function() {

    it("Entering only displays login form", function(){
      cy.get('#loginForm');
    });

    it("Succesful login displays blog main page", function(){
      cy.get('#loginUsername').type('Tester');
      cy.get('#loginPassword').type('testingPWD');
      cy.get('#loginButton').click()

      cy.contains('Tester is logged in');
    })

    it("Wrong login displays a notification of failure", function(){
      cy.get('#loginUsername').type('Tester');
      cy.get('#loginPassword').type('wrong');
      cy.get('#loginButton').click()

      cy.get('#notification')
        .contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    })
  })

})
