import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import "./App.css";
import AddDirector from "./component/AddDirector";
import AddMovie from "./component/AddMovie";
import DirectorList from "./component/DirectorList";
//components
import MovieList from "./component/MovieList";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="form">
        <AddDirector />
        <AddMovie />
      </div>
      <div className="App">
        <MovieList />
        <DirectorList />
      </div>
    </ApolloProvider>
  );
}

export default App;
