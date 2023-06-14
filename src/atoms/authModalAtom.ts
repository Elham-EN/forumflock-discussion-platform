import { atom } from "recoil";

/**
 * An atom represents a piece of state. Atoms can be read from and written
 * to from any component. Components that read the value of an atom are
 * implicitly subscribed to that atom, so any atom updates will result in
 * a re-render of all components subscribed to that atom:
 */

export interface AutoModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword"; // Predefined set of string
}

const defaultModalState: AutoModalState = {
  open: false,
  view: "login",
};

// global state
export const authModalState = atom<AutoModalState>({
  key: "authModalState", // unique ID
  default: defaultModalState, // default state value (aka initial value)
});
