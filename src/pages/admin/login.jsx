import { Button, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Admin } from "../../contexts/AdminContext";

const Login = () => {
  const { signIn, signOut } = useContext(Admin);

  return (
    <Stack>
      <Button onClick={signIn}>Sign in</Button>
      <Button onClick={signOut}>Sign out</Button>
    </Stack>
  );
};

export default Login;
