/* eslint-disable react/no-unescaped-entities */
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot } from "react-icons/bs";
import { useSetRecoilState } from "recoil";

type Props = {};

export default function ResetPassword({}: Props) {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Send a password reset email to the specified email address
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Image
        src="/images/fedditLogoNoText.png"
        alt="brand logo"
        height={"50px"}
        mb={5}
      />
      <Text fontWeight={"extrabold"} fontSize={"13pt"} mb={3}>
        Reset your password
      </Text>
      {success ? (
        <Text>Check your email 😃</Text>
      ) : (
        <>
          <Text
            fontSize={"11pt"}
            textAlign={"center"}
            color={"gray.700"}
            mb={5}
          >
            Enter the email associated with your account and we'll send you a
            reset link
          </Text>
          <form onSubmit={onSubmit}>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              mb={10}
              size={"lg"}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
            <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text>
            <Button
              type="submit"
              w={"full"}
              fontSize={"12pt"}
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex justifyContent={"center"} alignItems={"center"} gap={2} py={5}>
        <Text
          fontWeight={"extrabold"}
          color={"brand.100"}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "login" }))
          }
        >
          LOGIN
        </Text>
        <BsDot />
        <Text
          fontWeight={"extrabold"}
          color={"brand.100"}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "signup" }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
}
