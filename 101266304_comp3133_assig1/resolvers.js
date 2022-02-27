const User = require("./models/User");
const Listing = require("./models/Listing");
const jwt = require("jsonwebtoken");
const Book = require("./models/Book");

exports.resolvers = {
  Query: {
    login: async (parent, args) => {
      /*
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      */
      const foundUser = await User.findOne({
        username: args.username,
        password: args.password,
      });
      return foundUser;
    },
    viewListings: async (parent, args) => {
      const user = await User.findOne({ username: args.username });
      if (user.type === "admin") {
        return Listing.find({ username: args.username });
      }
    },
    searchListingByNameAndPostalCode: async (parent, args) => {
      try {
        return Listing.find({
          listing_title: args.listing_title,
          postal_code: args.postal_code,
        });
      } catch (error) {
        {
          throw new Error(error.message);
        }
      }
    },
    listAllUserBookings: async (parent, args) => {
      return Book.find({}).where({ username: args.username });
    },
    listingsAddedByAdmin: async (parent, args) => {
      return Listing.find({ username: args.username });
    },
  },
  Mutation: {
    register: async (parent, args) => {
      const user = new User({
        username: args.username,
        password: args.password,
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        type: args.type,
      });
      await user.save();
      return user;
    },
    createListing: async (parent, args) => {
      const findUser = await User.findOne({ username: args.username });
      if (findUser.type === "admin") {
        let newListing = new Listing({
          listing_id: args.listing_id,
          listing_title: args.listing_title,
          description: args.description,
          street: args.street,
          city: args.city,
          postal_code: args.postal_code,
          price: args.price,
          email: args.email,
          username: args.username,
        });
        await newListing.save();
        return newListing;
      } else {
        return console.log(
          "error creating the list, username is not associated with admin permissions"
        );
      }
    },
    bookListing: async (parent, args) => {
      const user = await User.findOne({ username: args.username });
      if (user.type === "customer") {
        const booking = new Book({
          listing_id: args.listing_id,
          booking_id: args.booking_id,
          booking_date: args.booking_date,
          booking_start: args.booking_start,
          booking_end: args.booking_end,
          username: args.username,
        });
        await booking.save();
        return booking;
      }
    },
  },
};
