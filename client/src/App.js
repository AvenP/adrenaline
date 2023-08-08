import React, { useState, useEffect } from "react";
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
import AllWorkout from "./pages/AllWorkouts";
import AllExercises from "./pages/AllExercises";
import AddWorkout from "./pages/AddWorkout";
// import Support from "./pages/Support";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = [
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/gym3.jpg",
    "/images/gym4.jpg",
    "/images/gym5.jpg",
    // Add more image URLs here
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageUrls.length
      );
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [imageUrls.length]);

  const currentImageUrl = imageUrls[currentImageIndex];
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className="flex-column justify-flex-start min-100-vh"
          style={{
            backgroundImage: `url(${currentImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
          }}
        >
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/me" element={<ProfilePage />} />
              <Route path="/add-workouts" element={<AddWorkout />} />
              <Route path="/workouts" element={<AllWorkout />} />
              <Route path="/exercise" element={<AllExercises />} />
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
