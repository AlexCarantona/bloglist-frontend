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
    })
  })

  describe('When logged in...', function() {
    beforeEach(function() {
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
      cy.login({ username: 'Tester', password: 'testingPWD'});
      cy.createBlog({title: 'One blog', author: 'One author', url: 'one.com', comments: ['Funniest stuff ever', 'I love you']});
      cy.createBlog({title: 'Third blog', author: 'Third', url: 'third.com', likes: 32});
      cy.createBlog({title: 'Second blog', author: 'Second', url: 'second.com', likes: 50});

    });

    afterEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
    })

    it("A navbar with active links to Blogs/Users pages", function () {
      cy
        .get('nav')
        .contains('Blogs')
        .parent()
        .contains('Users')
        .parent()
        .contains('Log out')

      cy
        .contains('Blogs')
        .click()

      cy
        .get('li')
        .should('have.length', 3)

      cy
        .contains('Users')
        .click()

      cy.contains('Tester: 3 blogs')
    })

    it("User can insert a blog", function() {
      cy.contains('Add new').click();
      cy.get('#newTitle').type('The Testing Blog');
      cy.get('#newAuthor').type('Author');
      cy.get('#newUrl').type('testing.com');
      cy.contains('Save new blog').click();

      cy.contains('The Testing Blog by Author');
    })

    it("Clicking on a blog link takes to the blogs' page", function() {

      cy.contains('One blog')
        .click()
      cy
      .contains('One blog by One author')

      cy
        .get('.comments')
        .get('li')
        .should('have.length', 2)

    })

    it("Users can like blogs", function() {
      cy.contains('One blog')
        .click()
      cy.contains('Like it!')
        .as('likeOne');

      cy.get('@likeOne').click();

      cy.get('@likeOne').parent().contains('Likes: 1');
    });

    it("Users can post comments on blogs", function() {
      cy
        .contains('One blog')
        .click()

      cy
        .get('#commentInput')
        .type('Love this one')
        .parent()
        .contains('Send')
        .click()
      cy
        .contains('Love this one')
    })

    it("Only the user who added a blog can delete it", function() {
      cy.login({ username: 'Tester', password: 'testingPWD'});
      cy.createBlog({
        title: 'The Testing Blog',
        author: 'Dostoievsky',
        url: 'karenina.com'
      })
      cy.contains('The Testing Blog')
        .click()
      cy
        .contains('Delete')
        .click();
      cy.on('window:confirm', (message) => {
        expect(message).to.eq('You want to delete this post?')
      })
      cy.contains('The Testing Blog').should('not.exist');
      cy.logout();
      cy.login({ username: 'Dummy', password: 'dummyPWD'});
      cy.contains('One blog')
        .click()
      cy
        .contains('Delete')
        .should('not.exist');
    })

    it("Posts are ordered by number of likes", function () {
      cy.get('ul').each(($el, index, $lis) => {
        switch(index){
          case 0: cy.wrap($el).contains('Second blog'); break;
          case 1: cy.wrap($el).contains('Third blog'); break;
          case 2: cy.wrap($el).contains('One blog'); break;
        }
      })
    })

    describe("Specific User route", function() {

    it("User route displays list of users/blogs", function () {
      cy.visit('http://localhost:3000/users')
      cy
        .get('a.openUser')
        .should('have.length', 2)
        .contains('Tester: 3 blogs')
        .parent().parent()
        .contains('Dummy: 0 blogs')
    })

    it("Clicking on a link takes to a specific user page", function () {
      cy.visit('http://localhost:3000/users')
      cy
        .contains('Tester: 3 blogs')
        .click()
        .get('h2')
        .contains('Tester')
      cy
        .get('ul')
        .children()
        .should('have.length', 3)
    })
  })
})

})
