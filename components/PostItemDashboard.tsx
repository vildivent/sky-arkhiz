import { forwardRef, useState } from "react";
import { deletePost } from "../redux/features/post/postSlice";
import { useAppDispatch } from "../utils/hooks/redux";
import { CancelButton } from "./Buttons";
import ModalYesNo from "./ModalYesNo";
import PostItem, { PostItemProps } from "./PostItem";

const PostItemDashboard = forwardRef<HTMLDivElement, PostItemProps>(
  function PostItemDashboard({ post }, ref) {
    const dispatch = useAppDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const deleteHandler = () => {
      setModalIsOpen(false);
      dispatch(deletePost({ id: post._id }));
    };

    return (
      <>
        <div className="flex w-full justify-end">
          <div className="flex justify-center mt-5">
            <CancelButton onClick={() => setModalIsOpen(true)}>
              Удалить
            </CancelButton>

            <ModalYesNo
              isOpen={modalIsOpen}
              setIsOpen={setModalIsOpen}
              yesClick={deleteHandler}
              noCkick={() => setModalIsOpen(false)}
            >
              <h1>Вы действительно хотите удалить эту новость?</h1>
            </ModalYesNo>
          </div>
        </div>

        <PostItem ref={ref} post={post} />
      </>
    );
  }
);

export default PostItemDashboard;
