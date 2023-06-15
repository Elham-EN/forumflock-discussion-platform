import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ReactElement, useState, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

interface LoginForm {
  email: string;
  password: string;
}

const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

export default function Login(): ReactElement {
  const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm);
  const [show, setShow] = useState<boolean>(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const handlePasswordClick = () => setShow(!show);

  // Firebase Logic
  const onSubmit = () => {};

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // update form state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        size={"lg"}
        onChange={onChange}
        required
      />
      <InputGroup size="md">
        <Input
          name="password"
          pr="4.5rem"
          size={"lg"}
          type={show ? "text" : "password"}
          placeholder="Enter password"
          onChange={onChange}
          required
        />
        <InputRightElement mt={1} width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Flex fontSize={"10pt"} justifyContent={"center"} my={5}>
        <Text mr={1}>Forgot your</Text>
        <Text color={"brand.100"} fontWeight={700} cursor={"pointer"}>
          password?
        </Text>
      </Flex>
      <Button
        type="submit"
        w={"full"}
        size={"lg"}
        fontSize={"12pt"}
        fontWeight={700}
      >
        Log In
      </Button>
      <Flex fontSize={"10pt"} justifyContent={"center"} my={5}>
        <Text mr={1}>New to Feddit?</Text>
        <Text
          color={"brand.100"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            // Change form modal view to signup (update global state)
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
}
