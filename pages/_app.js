import React from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/UserContext";
import axios from "axios";
import Head from "next/head";
import * as gtag from "../lib/gtag";
import Script from "next/script";
import Box from "@material-ui/core/Box";
import Copyright from "./layout/copyright";
import NavBar from "./layout/navbar";
import "../public/static/globals.css";
import NProgress from "nprogress";

NProgress.configure({ easing: "ease", speed: 500 });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
    darkMode: false,
  };

  componentDidMount = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (localStorage.getItem("darkMode") === "true") {
      this.setState({
        darkMode: true,
      });
    } else {
      this.setState({
        darkMode: false,
      });
    }
    if (user && token) {
      this.setState({
        user,
        token,
      });
    } else if (!user && !token && Router.pathname !== "/") {
      Router.push("/login");
    }
  };

  //Toggles dark mode
  toggleDarkMode = () => {
    if (this.state.darkMode === true) {
      this.setState({
        darkMode: false,
      });
      localStorage.setItem("darkMode", false);
    } else {
      this.setState({
        darkMode: true,
      });
      localStorage.setItem("darkMode", true);
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
    let darkToggle = this.state.darkMode == true ? "darkBody" : "lightBody";
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          token: this.state.token,
          errors: this.state.errors,
          darkMode: this.state.darkMode,
          signIn: this.signIn,
          signOut: this.signOut,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
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
          <script src="/static/js/nprogress.js"></script>
          <link rel="preload" as="style" href="/static/nprogress.css" />
          <link as="style" href="/static/index.module.css" key="5" />
          <link as="style" href="/static/LoginForm.module.css" key="4" />
          <link as="style" href="/static/results.module.css" key="3" />
          <link as="style" href="/static/globals.css" key="2" />
          <link
            as="style"
            href="/static/layout/textie_icon.module.css"
            key="1"
          />
          <title key="title">Notes - Texties</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Making notes harder, because why not?"
          />
        </Head>
        <div className={darkToggle}>
          <NavBar />
          <Component {...pageProps} />
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </UserContext.Provider>
    );
  }
}
