import { postState } from "@/atoms/postsAtom";
import { useRecoilState } from "recoil";

export default function UsePosts() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async () => {};
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
}
