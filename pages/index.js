import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm />
    </Container>
  );
}
