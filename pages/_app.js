import React from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/UserContext";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import axios from "axios";
import Head from "next/head";
import * as gtag from "../lib/gtag";
import Script from "next/script";
import Box from "@material-ui/core/Box";
import Copyright from "./layout/copyright";
import NavBar from "./layout/navbar";

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

  useEffect = () => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <Head>
            <link rel="stylesheet" href="/static/index.module.css" key="1" />
            <link
              rel="stylesheet"
              href="/static/LoginForm.module.css"
              key="1"
            />
            <link rel="stylesheet" href="/static/results.module.css" key="1" />
            <link rel="stylesheet" href="/staticsglobals.module.css" key="1" />
            <link
              rel="stylesheet"
              href="/static/layout/textie_icon.module.css"
              key="1"
            />
            <title key="title">Texties: Sksksksks</title>
          </Head>
          <NavBar />
          <Component {...pageProps} />
          <Box mt={8}>
            <Copyright />
          </Box>
        </ThemeProvider>
      </UserContext.Provider>
    );
  }
}
