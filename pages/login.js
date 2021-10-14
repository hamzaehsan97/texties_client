import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import LoginForm from "../components/LoginForm";
import Head from "next/head";

export default function Login() {
  return (
    <Container component="main" fixed>
      <Head>
        <title>Texties: Sksksksks</title>
      </Head>
      <LoginForm />
    </Container>
  );
}
