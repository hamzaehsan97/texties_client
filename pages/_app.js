import React from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/UserContext";
import axios from "axios";

export default class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      this.setState({
        user,
        token,
      });
      Router.push("/results");
    } else {
      Router.push("/");
    }
  };

  signIn = (phone_number, auth_code) => {
    axios
      .post(
        "http://localhost:5000/auth_check?phone_number=" +
          phone_number +
          "&auth_code=" +
          auth_code,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data["access_token"]);
        localStorage.setItem("user", phone_number);

        this.setState(
          {
            user: phone_number,
            token: res.data["access_token"],
          },
          () => {
            Router.push("/results");
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.setState({
      user: null,
      token: null,
    });
    Router.push("/");
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
