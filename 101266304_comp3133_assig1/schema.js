const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type User {
    id: ID!
    username: String!
    lastname: String!
    password: String!
    email: String!
    type: String!
  }

  type Listing {
    listing_id: String!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    username: String!
  }

  type Book {
    listing_id: String!
    booking_id: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
  }

  type Query {
    login(username: String!, password: String!): User
    viewListings(username: String!): [Listing]
    searchListingByNameAndPostalCode(
      listing_title: String!
      postal_code: String!
    ): [Listing]
    listAllUserBookings(username: String!): [Book]
    listingsAddedByAdmin(username: String!): [Listing]
  }

  type Mutation {
    register(
      username: String!
      password: String!
      firstname: String!
      lastname: String!
      email: String!
      type: String!
    ): User
    createListing(
      listing_id: String!
      listing_title: String!
      description: String!
      street: String!
      city: String!
      postal_code: String!
      price: Float!
      email: String!
      username: String!
    ): Listing
    bookListing(
      listing_id: String!
      booking_id: String!
      booking_date: String!
      booking_start: String!
      booking_end: String!
      username: String!
    ): Book
  }
`;
