import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ReactElement, useState, ChangeEvent, FormEvent } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialRegisterForm: RegisterForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp(): ReactElement {
  const [registerForm, setRegisterForm] =
    useState<RegisterForm>(initialRegisterForm);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [error, setError] = useState("");

  const setAuthModalState = useSetRecoilState(authModalState);

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Firebase Logic - sign up user
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (error) setError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Password do not match");
    }
    createUserWithEmailAndPassword(registerForm.email, registerForm.password);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // update form state
    setRegisterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
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
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          onChange={onChange}
          required
        />
        <InputRightElement mt={1} width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup size="md" mt={5}>
        <Input
          name="confirmPassword"
          pr="4.5rem"
          size={"lg"}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Enter confirm password"
          onChange={onChange}
          required
        />
        <InputRightElement mt={1} width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleConfirmPasswordClick}>
            {showConfirmPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {(error || userError) && (
        <Text
          textAlign={"center"}
          my={3}
          color={"red.300"}
          fontWeight={500}
          fontSize={"12pt"}
        >
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button
        type="submit"
        w={"full"}
        size={"lg"}
        fontSize={"12pt"}
        fontWeight={700}
        mt={5}
        isLoading={loading}
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
