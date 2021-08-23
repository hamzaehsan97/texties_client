import React from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/UserContext";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import axios from "axios";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default class MyApp extends App {
  state = {
    user: null,
    token: null,
    errors: null,
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
        "https://texties.herokuapp.com/auth_check?phone_number=" +
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
            errors: null,
          },
          () => {
            Router.push("/results");
          }
        );
      })
      .catch((err) => {
        localStorage.setItem("errors", err);
        this.setState({
          errors: err.response.data["Error"],
        });
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
          token: this.state.token,
          errors: this.state.errors,
          signIn: this.signIn,
          signOut: this.signOut,
        }}
      >
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Head>
            <title>Texties: Sksksksks</title>
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserContext.Provider>
    );
  }
}
