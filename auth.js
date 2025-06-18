const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");
const passport = require("passport");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    //authentication logic here
    try {
      //   console.log("Received credentials: ", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username. " });
      }

      //   const isPasswordMatch = user.password === password ? true : false;

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Username. " });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport; //Export configured passport
