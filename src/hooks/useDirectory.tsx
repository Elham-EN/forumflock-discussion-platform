import { communityState } from "@/atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
  directroyMenuState,
} from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BiFace } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useDirectory() {
  const router = useRouter();
  const [directoryState, setDirectoryState] =
    useRecoilState<DirectoryMenuState>(directroyMenuState);
  const communityStateValue = useRecoilValue(communityState);

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
    // Close Directory Menu
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    // Dealing with refreshing problem by updating itself when
    // there is changes in the value of currentCommunity
    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: currentCommunity.id,
          link: `/f/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: BiFace,
          iconColor: "brand.100",
        },
      }));
    }
  }, [communityStateValue.currentCommunity]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
}
