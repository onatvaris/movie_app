import gql from "graphql-tag";

export const getMoviesQuery = gql`
  {
    movies {
      title
      description
      year
      director {
        name
      }
    }
  }
`;

export const getDirectorsQuery = gql`
  {
    directors {
      id
      name
      movies {
        title
      }
    }
  }
`;

export const addDirectorQuery = gql`
  mutation($name: String!, $birth: Int) {
    addDirector(birth: $birth, name: $name) {
      id
    }
  }
`;

export const addMovieQuery = gql`
  mutation(
    $title: String!
    $description: String
    $year: Int!
    $directorId: String!
  ) {
    addMovie(
      title: $title
      description: $description
      year: $year
      directorId: $directorId
    ) {
      id
    }
  }
`;
