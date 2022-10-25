import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __addComment,
  __getComment,
  __deleteComment,
  __editComment,
} from "../redux/modules/melonSlice";

function Revise() {
  const comments = useSelector((state) => state.melon.comment);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [comment, setComment] = useState({
    username: "",
    content: "",
  });

  //댓글 추가하기 관련
  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onClickAddButton = (e) => {
    e.preventDefault();
    if (comment.content.trim() === "" || comment.username.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment({ id: comments.length + 1, todoId: id, ...comment }));

    setComment({
      username: "",
      content: "",
    });
  };
  useEffect(() => {
    dispatch(__getComment());
  }, [dispatch]);

  // 댓글 삭제 버튼
  const onDeleteButton = (payload) => {
    dispatch(__deleteComment(payload));
  };

  const onClickUdapte = (id) => {
    dispatch(__editComment({ id: id, target: target }));
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);
  const [target, setTarget] = useState();
  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <input
        placeholder="이름"
        value={comment.username}
        type="text"
        name="username"
        onChange={onChangeInputHandler}
      />

      <input
        placeholder="댓글을 입력하세요"
        value={comment.content}
        name="content"
        type="text"
        onChange={onChangeInputHandler}
      />

      <button onClick={onClickAddButton}>추가하기</button>

      <div>
        {comments.map((comment) => {
          if (comment.todoId == id) {
            return (
              <div key={comment.id}>
                <div>
                  {comment.username} :
                  {/* {comment.content}
                                    <button onClick={() => onDeleteButton(comment.id)}>삭제하기</button>
                                    <button>수정하기</button> */}
                  {edit ? (
                    <>
                      <textarea
                        type="text"
                        value={target}
                        onChange={({ target }) => setTarget(target.value)}
                      />

                      <div>
                        <button onClick={() => onClickUdapte(comment.id)}>
                          수정완료
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {comment.content}
                      <button
                        onClick={() => {
                          toggleEdit();
                        }}
                      >
                        수정{" "}
                      </button>
                      <button onClick={() => onDeleteButton(comment.id)}>
                        삭제하기
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
export default Revise;
