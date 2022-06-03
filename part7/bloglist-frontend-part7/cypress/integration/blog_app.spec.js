describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test User 01",
      username: "testuser01",
      password: "secretpassword",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", {
      name: "Test User 02",
      username: "testuser02",
      password: "password",
    });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser01");
      cy.get("#password").type("secretpassword");
      cy.get("#loginbutton").click();

      cy.get("html").should("contain", "logged in as Test User 01");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuser01");
      cy.get("#password").type("wrongpassword");
      cy.get("#loginbutton").click();

      cy.get(".notification")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "logged in as Test User 01");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser01", password: "secretpassword" });
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("title created by cypress");
      cy.get("#author").type("author created by cypress");
      cy.get("#url").type("url created by cypress");

      cy.get("#createblog").click();

      cy.get(".bloglist").contains("title created by cypress");
    });

    describe("When a blog is created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "testblog",
          author: "tester",
          url: "/test/blog",
        });
      });

      it("User can like a blog", function () {
        cy.get("#toggle-blog").click();
        cy.get("#likebutton").click();

        cy.get(".bloglist").contains("likes 1");
      });

      it("User can delete a blog they created", function () {
        cy.get("#toggle-blog").click();
        cy.get(".bloglist").contains("remove");
        cy.get("#remove-blog-button").click();
        cy.get(".bloglist").should("not.contain", "testblog");
      });
    });
  });
  describe("When multiple blogs created", function () {
    beforeEach(function () {
      cy.login({ username: "testuser01", password: "secretpassword" });
      cy.createBlog({
        title: "blog01",
        author: "tester01",
        url: "/test/blog",
        likes: 11,
      });
      cy.login({ username: "testuser02", password: "password" });
      cy.createBlog({
        title: "blog02",
        author: "tester02",
        url: "/test/blog",
        likes: 10,
      });
    });

    it("Blogs are ordered by likes", function () {
      cy.get(".blogdiv").eq(0).as("blog1").contains("blog01");
      cy.get("@blog1").contains("show").click();
      cy.get("@blog1").should("contain", "likes 11");

      cy.get(".blogdiv").eq(1).as("blog2");
      cy.get("@blog2").contains("show").click();
      cy.get("@blog2").should("contain", "likes 10");

      cy.get("@blog2").contains("like").click();
      cy.get("@blog2").contains("likes 11");
      cy.get("@blog2").contains("like").click();
      cy.get("@blog2").contains("likes 12");

      cy.get(".blogdiv").eq(0).contains("blog02");
    });

    it("User can't delete a blog they did not create", function () {
      cy.get(".blogdiv").eq(0).as("user01_blog");
      cy.get("@user01_blog").contains("show").click();
      cy.get("@user01_blog").should("not.contain", "remove");
    });
  });
});
