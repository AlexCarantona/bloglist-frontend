describe('Blog app', function() {

  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'Tester',
        password: 'testingPWD',
        name: 'Sylvester the Tester'
      })
      cy.visit('http://localhost:3000');
    });

    after(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
    })

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

  describe('When logged in...', function() {
    before(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'Tester',
        password: 'testingPWD',
        name: 'Sylvester the Tester'
      });
    });

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login',{
        username: 'Tester',
        password: 'testingPWD'
      }).then( res => {
      localStorage.setItem('loggedUser', JSON.stringify(res.body));
      cy.visit('http://localhost:3000');
    });
    });

    it("User can insert a blog", function() {
      cy.contains('Add new').click();
      cy.get('#newTitle').type('The Testing Blog');
      cy.get('#newAuthor').type('Author');
      cy.get('#newUrl').type('testing.com');
      cy.contains('Save new blog').click();

      cy.contains('The Testing Blog by Author');
    })
  })

})
