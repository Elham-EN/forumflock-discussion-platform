import {
  DirectoryMenuItem,
  DirectoryMenuState,
  directroyMenuState,
} from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function useDirectory() {
  const router = useRouter();
  const [directoryState, setDirectoryState] =
    useRecoilState<DirectoryMenuState>(directroyMenuState);

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  // update the state with that menu item was clicked on
  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    // Take user to that route
    router.push(menuItem.link);
  };

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
}
