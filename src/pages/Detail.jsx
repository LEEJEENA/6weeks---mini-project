import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getmelon,
  __deleteMelon,
  __editMelon,
} from "../redux/modules/melonSlice";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/elements/Button";
import styled from "styled-components";
import Header from "../components/elements/Header";
import Revise from "./Revise";
import Layout from "../components/elements/Layout";
import Input from "../components/elements/Input";
function Detail() {
  //navigate
  const navigate = useNavigate();
  const melons = useSelector((state) => state.melon.melon);
  const dispatch = useDispatch();
  const paramsid = useParams();
  const [imgFile, setImgFile] = useState("");
  const cancleButton = () => {
    setEdit(false);
  };
  const indexId = melons.findIndex((user) => {
    if (user.id == paramsid.id) {
      return true;
    }
    return false;
  });
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(melons[indexId]);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const onChangeHandlerInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };
  const onClickUdapte = (data) => {
    const formData = new FormData();
    // formData.append("file", imgFile);
    formData.append("title", data.title);
    formData.append("singer", data.singer);
    formData.append("song", data.song);
    formData.append("content", data.content);
    const Fdata = { id: input.id, formData: formData };
    dispatch(__editMelon(Fdata));
    setEdit(false);
  };
  const onMelonDelete = (payload) => {
    dispatch(__deleteMelon(payload));
  };
  return (
    <div>
      <Layout>
        <Header />
        <STBox>
          <STBox1>
            <>
              {/*
            <label htmlFor="imgFile">
                  <img
                    src={input.image}
                    style={{
                      marginBottom: "24px",
                      width: "464px",
                      height: "301px",
                    }}
                  />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="imgFile"
                    onChange={onChangeImage}
                    accept="image/*"
                    ref={imgRef}
                    name="imgFile"
                    multiple
                  />
                  <a type="button" htmlFor="inputImg">
                    ????????? ?????????
                  </a>
                </label> */}
              <img
                src={input.image}
                style={{
                  marginBottom: "24px",
                  width: "400px",
                  height: "400px",
                }}
              />
              <div>
                {edit ? (
                  <div>
                    <br />
                    <label>?????? : </label>
                    <Input
                      type="text"
                      name="title"
                      value={input.title || ""}
                      onChange={onChangeHandlerInput}
                    />
                    <br />
                    <label>?????? : </label>
                    <Input
                      type="text"
                      name="singer"
                      value={input.singer || ""}
                      onChange={onChangeHandlerInput}
                    />
                    <label>?????? ?????? :</label>
                    <Input
                      type="text"
                      name="song"
                      value={input.song || ""}
                      onChange={onChangeHandlerInput}
                    />
                    <br />
                    <label>??????</label>
                    <Input
                      size="textarea"
                      type="text"
                      name="content"
                      value={input.content || ""}
                      onChange={onChangeHandlerInput}
                    />
                    <br />
                    <Button onClick={() => onClickUdapte(input)}>
                      ????????????
                    </Button>
                    <Button onClick={() => cancleButton()}>????????????</Button>
                  </div>
                ) : (
                  <div>
                    <label>?????? : </label>
                    <Input
                      size="large"
                      type="text"
                      name="title"
                      value={input.title || ""}
                      readOnly
                    />
                    <br />
                    <label>?????? : </label>
                    <Input
                      type="text"
                      name="singer"
                      value={input.singer || ""}
                      readOnly
                    />
                    <label>?????? ?????? :</label>
                    <Input
                      size="medium"
                      type="text"
                      name="song"
                      readOnly
                      value={input.song || ""}
                    />
                    <br />
                    <label>??????</label>
                    <Input
                      size="textarea"
                      type="text"
                      name="content"
                      value={input.content || ""}
                      readOnly
                    />
                    <br />
                    <br />
                    <Button
                      onClick={() => {
                        toggleEdit();
                      }}
                    >
                      ??????{" "}
                    </Button>
                    <Button
                      onClick={() => {
                        onMelonDelete(input.id);
                        navigate("/Main");
                      }}
                    >
                      ????????????
                    </Button>
                  </div>
                )}
              </div>
            </>
            <Revise />
          </STBox1>
        </STBox>
      </Layout>
    </div>
  );
}
export default Detail;
const STTextarea = styled.textarea`
  width: 800px;
  border: 1px solid rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  padding: 12px;
  font-size: 14px;
  height: 250px;
`;
const STInputarea = styled.textarea`
  width: 800x;
  background-color: rgb(133, 129, 129);
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

  /* justify-content: left; */
  /* padding-left: 100px; */
  gap: 15px;
`;
const STBox1 = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* -webkit-box-align: center; */
  align-items: center;
  /* -webkit-box-pack: center; */
  /* justify-content: center; */
  background-color: transparent;
  border: 2px solid transparent;
  margin-top: 30px;
  margin: auto;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
const STContent = styled.div`
  height: 80px;
`;
