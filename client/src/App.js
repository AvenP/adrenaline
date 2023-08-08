import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddContent from "./pages/AddContent";
import ProfilePage from "./pages/ProfilePage";
import AddCategory from "./pages/AddCategory";
// import WorkoutDetail from "./pages/WorkoutDetail";
// import Workout from "./pages/Workout";
import AllWorkout from "./pages/AllWorkout";
import AllExercises from "./pages/AllExercises";
import AddWorkout from "./pages/AddWorkout";
import Support from "./pages/Support";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/me" element={<ProfilePage />} />
              <Route path="/Support" element={<Support />} />
              <Route path="/add-workouts" element={<AddWorkout />} />
              <Route path="/workouts" element={<AllWorkout />} />
              <Route path="/exercise" element={<AllExercises />} />
              {/* <Route path="/profiles/:username" element={<Profile />} /> */}
              <Route path="/AddContent" element={<AddContent />} />
              <Route path="/AddCategory" element={<AddCategory />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
