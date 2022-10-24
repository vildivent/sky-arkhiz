/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";
import { CancelButton } from "./Buttons";
import ModalYesNo from "./ModalYesNo";
import PostItem from "./PostItem";

const PostItemDashboard = forwardRef(({ post }, ref) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteHandler = () => {
    try {
      setModalIsOpen(false);
      dispatch(deletePost({ id: post._id }));
      console.log("Новость удалена!");
    } catch (error) {
      console.error(error);
    }
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
});

export default PostItemDashboard;
