import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __addComment,
  __getComment,
  __deleteComment,
  __editComment,
} from "../redux/modules/melonSlice";
import styled from "styled-components";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
function Revise() {
  const commentList = useSelector((state) => state.melon.comment);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comments, setComments] = useState({
    name: "",
    comment: "",
  });
  //댓글 추가하기 관련
  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setComments({
      ...comments,
      [name]: value,
    });
  };
  const onClickAddButton = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("comment", comments.comment);
    const Fdata = { id: Number(id), comment: comments.comment };
    if (comments.comment.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment(Fdata));
    setComments({
      name: "",
      comment: "",
    });
  };
  useEffect(() => {
    dispatch(__getComment(id));
    console.log(commentList);
  }, [dispatch]);
  // 댓글 삭제 버튼
  const onDeleteButton = (payload) => {
    dispatch(__deleteComment(payload));
  };
  const onClickUdapte = (iddata) => {
    dispatch(__editComment({ id: iddata, comment: target }));
    setEdit(false);
  };
  const [edit, setEdit] = useState(false);
  const [target, setTarget] = useState();
  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <>
      {/* <hr /> */}
      <br />
      {/* <STInputTitle
        placeholder="이름"
        value={comment.username}
        type="text"
        name="username"
        onChange={onChangeInputHandler}
      /> */}
      <div style={{ margin: "auto" }}>
        <Input
          placeholder="댓글을 입력하세요"
          value={comments.comment || ""}
          name="comment"
          type="text"
          onChange={onChangeInputHandler}
        />
      </div>
      <Button size="large" color="reverse" onClick={onClickAddButton}>
        추가하기
      </Button>
      <div>
        {commentList.map((comment) => {
          return (
            <div key={comment.id}>
              <div>
                {comment.nickname} :
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
                    {comment.comment}
                    {/* <button
                      onClick={() => {
                        toggleEdit();
                      }}
                    >
                      수정{" "}
                    </button> */}
                    <button onClick={() => onDeleteButton(comment.id)}>
                      삭제하기
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Revise;
const STInputTitle = styled.input`
  width: 200px;
  border: 1px solid rgb(238, 238, 238);
  margin: auto;
`;
