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

interface RegisterForm {
  email: string;
  password: string;
}

const initialRegisterForm: RegisterForm = {
  email: "",
  password: "",
};

export default function SignUp(): ReactElement {
  const [registerForm, setRegisterForm] =
    useState<RegisterForm>(initialRegisterForm);
  const [show, setShow] = useState<boolean>(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const handlePasswordClick = () => setShow(!show);

  // Firebase Logic
  const onSubmit = () => {};

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // update form state
    setRegisterForm((prev) => ({
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
        size={"lg"}
        onChange={onChange}
        required
      />
      <InputGroup size="md" mt={5}>
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
      <InputGroup size="md" mt={5}>
        <Input
          name="confirmPassword"
          pr="4.5rem"
          size={"lg"}
          type={show ? "text" : "password"}
          placeholder="Enter confirm password"
          onChange={onChange}
          required
        />
        <InputRightElement mt={1} width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        type="submit"
        w={"full"}
        size={"lg"}
        fontSize={"12pt"}
        fontWeight={700}
        mt={5}
      >
        Sign Up
      </Button>
      <Flex fontSize={"10pt"} justifyContent={"center"} my={5}>
        <Text mr={1}>Already a fedditor?</Text>
        <Text
          color={"brand.100"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            // Change form modal view to signup (update global state)
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
}
