import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getmelon,
  __editTodo,
  __deleteTodo,
} from "../redux/modules/melonSlice";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/elements/Button";
import styled from "styled-components";
import Header from "./Header";
import Revise from "./Revise";
function Detail() {
  //navigate
  const navigate = useNavigate();
  const melon = useSelector((state) => state.melon.melon);
  const dispatch = useDispatch();
  const { id } = useParams();

  const cancleButton = () => {
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);
  const [target, setTarget] = useState();
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onClickUdapte = (id) => {
    dispatch(__editTodo({ id: id, target: target }));
    setEdit(false);
  };

  useEffect(() => {
    dispatch(__getmelon());
  }, [dispatch]);

  //삭제하기

  const onTodoDelete = (payload) => {
    dispatch(__deleteTodo(payload));
  };

  return (
    <div>
      <Header />
      {melon.map(
        (melon) =>
          melon.id === Number(id) && (
            <STBox1>
              <STBox>
                <div key={melon.id}>
                  <div>
                    노래 / 제목 : {melon.singer} / {melon.song}
                  </div>
                  <h2>제목 : {melon.title}</h2>
                  {/* <div>{melon.image.preview_URL}</div> */}
                  <h4>카테고리 : {melon.selected} </h4>
                  <div>이미지 : {melon.imageInput} </div>
                  <br /> 내용:
                  {edit ? (
                    <>
                      <STTextarea
                        type="text"
                        value={target}
                        onChange={({ target }) => setTarget(target.value)}
                      />
                      {/* 버튼 일렬로 정렬 */}
                      <div>
                        <Button onClick={() => onClickUdapte(melon.id)}>
                          수정완료
                        </Button>
                        <Button onClick={() => cancleButton()}>수정취소</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <STContent>
                        {" "}
                        <br /> {melon.content}
                      </STContent>
                      <Button
                        onClick={() => {
                          toggleEdit();
                        }}
                      >
                        수정{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          onTodoDelete(melon.id);
                          navigate("/");
                        }}
                      >
                        삭제하기
                      </Button>
                    </>
                  )}
                </div>
              </STBox>
            </STBox1>
          )
      )}

      <Revise />
    </div>
  );
}
export default Detail;

const STTextarea = styled.textarea`
  width: 70%;
  border: 1px solid rgb(238, 238, 238);
  padding: 12px;
  font-size: 14px;
  height: 250px;
`;

const STBox = styled.div`
  width: 80%;
  max-width: 1000px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-left: 100px;
  gap: 15px;
`;
const STBox1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid transparent;
  margin-top: 30px;
`;

const STContent = styled.div`
  height: 80px;
`;
