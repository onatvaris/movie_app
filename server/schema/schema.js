const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} = require("graphql");
const _ = require("lodash");
//  Mongodb model

const Movie = require("../models/Movie");
const Director = require("../models/Director");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        console.log(`parent`, parent);
        console.log(`args`, args);
        // return _.find(directors, { id: parent.directorid });
        // direk id üzerinden arama yaptığımız için findById kullanıldı
        // yani director lerin idlerini aradığımız için
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        console.log(`parent`, parent);
        // return _.filter(movies, { directorid: parent.id });
        // burda filmlerde ki directorid si parent id ye eşit olanları çekiyoruz
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //table ismi
    movie: {
      //table ın ait olduğu class
      type: MovieType,
      //sorgulanacak değer
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //get data
        //return _.find(movies, { id: args.id });
        // filmleri id ye göre çağırma olduğundan findbyid
        return Movie.findById(args.id);
      },
    },
    director: {
      //table ın ait olduğu class
      type: DirectorType,
      //sorgulanacak değer
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //get data
        // return _.find(directors, { id: args.id });
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        // ne kadar data varsa hepsini çağır
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        // return directors;
        return Director.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        directorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // new Movie ile şema yı aldık
        // args ile eklemek istediğimiz verileri almış oluyoruz
        const movie = new Movie({
          title: args.title,
          description: args.description,
          year: args.year,
          directorId: args.directorId,
        });

        return movie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        birth: { type: GraphQLInt },
      },
      resolve(parent, args) {
        // new Movie ile şema yı aldık
        // args ile eklemek istediğimiz verileri almış oluyoruz
        const director = new Director({
          name: args.name,
          birth: args.birth,
        });

        return director.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // get işlemlerinin tanımı
  query: RootQuery,
  // update delete add işlemlerinin tanımı
  mutation: Mutation,
});
