import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-ebtj.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      {!isLoggedIn ? (
        <VStack as="form" onSubmit={handleLogin} spacing={4}>
          <Heading mb={6}>Login</Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" type="submit" isFullWidth>
            Sign In
          </Button>
        </VStack>
      ) : (
        <Box>
          <Text>Welcome, you are now logged in!</Text>
          {/* Other sections like chat, calendar, news, repertoire, and tickets will be added here */}
        </Box>
      )}
    </Container>
  );
};

export default Index;
