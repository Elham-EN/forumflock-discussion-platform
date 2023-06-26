import React, { ReactElement, useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

export default function Communities(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem width={"100%"} fontSize={"11pt"} onClick={() => setOpen(true)}>
        <Flex>
          <Icon fontSize={24} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
}
