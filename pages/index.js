import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import LoginForm from "../components/LoginForm";
import Head from "next/head";

export default function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Texties: Storage through SMS</title>
      </Head>
      <LoginForm />
    </Container>
  );
}
