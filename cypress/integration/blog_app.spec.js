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
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'Dummy',
        password: 'dummyPWD',
        name: 'A user without rights'
      });
    });

    it("User can insert a blog", function() {
      cy.login({ username: 'Tester', password: 'testingPWD'});

      cy.contains('Add new').click();
      cy.get('#newTitle').type('The Testing Blog');
      cy.get('#newAuthor').type('Author');
      cy.get('#newUrl').type('testing.com');
      cy.contains('Save new blog').click();

      cy.contains('The Testing Blog by Author');
    })

    it("Users can like blogs", function() {
      cy.login({ username: 'Tester', password: 'testingPWD'});

      cy.createBlog({
        title: 'One blog',
        author: 'One author',
        url: 'one.com'
      });

      cy.contains('One blog')
        .parent()
        .contains('Details')
        .click()
        .parent().parent()
        .contains('Like it!')
        .as('likeOne');

      cy.get('@likeOne').click();

      cy.get('@likeOne').parent().contains('Likes: 1');
    });

    it("Only the user who added a blog can delete it", function() {
      cy.login({ username: 'Tester', password: 'testingPWD'});
      cy.contains('The Testing Blog')
        .parent()
        .contains('Details')
        .click()
        .parent().parent()
        .contains('Delete')
        .click();
      cy.on('window:confirm', (message) => {
        expect(message).to.eq('You want to delete The Testing Blog?')
      })
      cy.contains('The Testing Blog').should('not.exist');
      cy.logout();
      cy.login({ username: 'Dummy', password: 'dummyPWD'});
      cy.contains('One blog')
        .parent()
        .contains('Details')
        .click()
        .parent().parent()
        .contains('Delete')
        .should('not.exist');
    })

    it("Posts are ordered by number of likes", function () {
      cy.login({ username: 'Tester', password: 'testingPWD'});
      cy.createBlog({title: 'Third blog', author: 'Third', url: 'third.com', likes: 32});
      cy.createBlog({title: 'Second blog', author: 'Second', url: 'second.com', likes: 50});

      cy.get('.blogInfo').each(($el, index, $lis) => {
        switch(index){
          case 0: cy.wrap($el).contains('Second blog'); break;
          case 1: cy.wrap($el).contains('Third blog'); break;
          case 2: cy.wrap($el).contains('One blog'); break;
        }
      })

    });

  });

})
