db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("blogs");
db.createCollection("users");

//Uncomment if you plan running the local tests
db_for_testing = new Mongo().getDB("blogapp-test");

db_for_testing.createUser({
  user: "user_for_testing",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "blogapp-test",
    },
  ],
});

db_for_testing.createCollection("blogs");
db_for_testing.createCollection("users");
