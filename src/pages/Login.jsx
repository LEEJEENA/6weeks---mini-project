import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __Login } from "../redux/modules/melonSlice";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import styled, { css } from "styled-components";
import PT from "../static/피곤해.jpg";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandlerInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const getRandom = () => Math.random();
  const inputId = getRandom();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(__Login(input));
    setInput(initialState);
  };

  return (
    <StLogin>
      <Stlogin_box>
        <Stlogin_box_Left>
          <StLeft_text>
            <StLeft_text_h2>Water Melon</StLeft_text_h2>
            <StLeft_text_h5>당신만의 숨은 명곡을 공유해보세요!</StLeft_text_h5>
          </StLeft_text>
        </Stlogin_box_Left>
        <Stlogin_box_Right>
          <StRight_contact_t />
          <StRight_contact>
            <Input
              size="medium"
              type="text"
              name="username"
              className="input"
              value={input.username || ""}
              onChange={onChangeHandlerInput}
              placeholder="ID"
              maxLength="20"
            ></Input>
          </StRight_contact>
          <StRight_contact>
            <Input
              size="medium"
              type="text"
              name="password"
              className="input"
              value={input.password || ""}
              onChange={onChangeHandlerInput}
              placeholder="PassWord"
              maxLength="20"
            ></Input>
          </StRight_contact>

          <StRight_contact_t>
            <Button onClick={onSubmitHandler} size="medium" color="reverse">
              로그인
            </Button>
          </StRight_contact_t>
          <StRight_contact>
            <h5>아직도 회원이 아니신가요?</h5>
            <StButton
              onClick={() => {
                navigate("/SignUp");
              }}
              size="medium"
              color="reverse"
            >
              회원가입
            </StButton>
          </StRight_contact>
        </Stlogin_box_Right>
      </Stlogin_box>
    </StLogin>
  );
};

export default Login;
const StButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
const StLogin = styled.section`
  /* .container {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: minmax(2000px, auto);
    margin: 100px auto;
    border-radius: 8px;
  } */
  height: 1000px;
  width: 100%;
  min-width: 800px;
  background: radial-gradient(#032413, #27a363);
  position: relative;
`;

const Stlogin_box = styled.div`
  width: 100%;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 4px 22px -8px #0004;
  display: flex;
  overflow: hidden;
  max-width: 1200px;
  min-width: 800px;
`;
const Stlogin_box_Right = styled.div`
  width: 45%;
  height: 100%;
  padding: 25px 25px;
  background: linear-gradient(-45deg, #dcd7e0, #fff);
`;
const StRight_contact_t = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 80px;
`;
const StRight_contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 30px;
`;
// const StRight_contact = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-self: center;
//   height: 100%;
//   width: 73%;
//   margin-top: 10px auto;
// `;

const Stlogin_box_Left = styled.div`
  width: 55%;
  height: 100%;
  background: url(${PT});
  color: #ffffff;
  position: relative;
  background-position: center;
  background-size: cover;
`;

const StLeft_text = styled.div`
  height: 100%;
  position: relative;
  transform: translate(0%, 45%);
`;
const StLeft_text_h2 = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
`;
const StLeft_text_h5 = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
`;

const StCenterH5 = styled.h5`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
`;
