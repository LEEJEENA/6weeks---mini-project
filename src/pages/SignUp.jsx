import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  __getUser,
  __SignUp,
  __nameCheck,
  __idCheck,
} from "../redux/modules/melonSlice";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import styled from "styled-components";
import PT from "../static/watermelon.png";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    nickname: "",
    username: "",
    password: "",
    passwordCheck: "",
  };
  const userdata = useSelector((state) => state.melon);
  const [input, setInput] = useState(initialState);
  const [checkName, setCheckName] = useState({
    msg: "닉네임을 입력해주세요",
    isOk: "false",
  });
  const [checkID, setCheckID] = useState({
    msg: "아이디를 입력해주세요",
    isOk: "false",
  });
  const [checkPW, setCheckPW] = useState({ msg: "", isOk: "false" });
  const [checkPW2, setCheckPW2] = useState({ msg: "", isOk: "false" });

  // useEffect(() => {
  //   dispatch(__getUser());
  // }, []);
  // console.log(userdata);

  const onChangeHandlerInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      input.nickname === "" ||
      input.username === "" ||
      input.password === "" ||
      input.passwordCheck === ""
    ) {
      return alert("입력을 확인하세요!");
    }
    console.log(checkPW.isOk);
    console.log(checkPW.isOk);

    if (checkPW.isOk === false || checkPW2.isOk === false) {
      return alert("비밀번호를 확인하세요!");
    }

    console.log(input);
    dispatch(__SignUp(input));
    setInput(initialState);
  };

  // const nameCheckHandler = () => {
  //   dispatch(__nameCheck);
  //   if (userdata.nameCheck) {
  //     return setCheckName({
  //       msg: " ",
  //       isOk: "false",
  //     });
  //   } else {
  //     return setCheckName({
  //       msg: " ",
  //       isOk: "true",
  //     });
  //   }
  // };

  // const nameCheckHandler = (newName) => {
  //   {
  //     // userdata &&
  //     userdata.user.map((data) => {
  //       if (newName == data.nickname) {
  //         return setCheckName({
  //           msg: "사용할 수 없는 닉네임입니다.",
  //           isOk: "false",
  //         });
  //       } else {
  //         return setCheckName({
  //           msg: "사용 가능한 닉네임입니다.",
  //           isOk: "true",
  //         });
  //       }
  //     });
  //   }
  // };

  // const idCheckHandler = (newID) => {
  //   {
  //     // userdata &&
  //     userdata.user.map((data) => {
  //       if (newID == data.id) {
  //         return setCheckID({
  //           msg: "사용할 수 없는 아이디입니다.",
  //           isOk: "false",
  //         });
  //       } else {
  //         return setCheckID({
  //           msg: "사용 가능한 아이디입니다.",
  //           isOk: "true",
  //         });
  //       }
  //     });
  //   }
  // };

  const idCheckHandler = () => {
    dispatch(__idCheck(input.username));
    // if (userdata.idCheck) {
    //   return;
    // setCheckID({
    //   msg: "사용할 수 없는 아이디입니다.",
    //   isOk: "false",
    // });
    // } else {
    //   return;
    // setCheckID({
    //   msg: "사용 가능한 아이디입니다.",
    //   isOk: "true",
    // });
    // }
  };

  //정규식 최소 8자, 하나의 이상의 대소문자 및 하나의 숫자, 하나의 특수문자
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const passwordCheckHandler = (newPW) => {
    if (pwRegExp.test(newPW)) {
      return setCheckPW({ msg: "사용 가능한 비밀번호입니다.", isOk: "true" });
    } else {
      return setCheckPW({
        msg: "최소 8자, 대소문자 및 숫자, 특수문자를 하나이상 입력 해주세요.",
        isOk: "false",
      });
    }
  };

  const samePasswordCheckHandler = (newPW, newPW2) => {
    if (newPW === newPW2) {
      return setCheckPW2({ msg: "비밀번호가 동일합니다.", isOk: "true" });
    } else {
      return setCheckPW2({
        msg: "비밀번호가 동일하지 않습니다.",
        isOk: "false",
      });
    }
  };

  useEffect(() => {
    // console.log(input);
    passwordCheckHandler(input.password);
    samePasswordCheckHandler(input.password, input.passwordCheck);
    // nameCheckHandler(input.nickname);
  }, [input]);

  // useEffect(() => {
  //   idCheckHandler();
  // }, [checkID]);

  return (
    <StSignUp>
      <Stlogin_box>
        <Stlogin_box_Left>
          <StLeft_text>
            <StLeft_text_h2>WaterMelon</StLeft_text_h2>
            <StLeft_text_h5>당신만의 숨은 명곡을 공유해보세요!</StLeft_text_h5>
          </StLeft_text>
        </Stlogin_box_Left>
        <Stlogin_box_Right>
          <StRight_contact>
            <Input
              size="medium"
              type="text"
              name="nickname"
              className="input"
              value={input.nickname || ""}
              onChange={onChangeHandlerInput}
              placeholder="닉네임을 입력하세요"
              maxLength="10"
            ></Input>
          </StRight_contact>
          <StMsg>
            {/* {checkName.msg} */}
            {/* <StButton></StButton> */}
          </StMsg>
          <StRight_contact>
            <Input
              size="medium"
              type="text"
              name="username"
              className="input"
              value={input.username || ""}
              onChange={onChangeHandlerInput}
              placeholder="아이디 입력(20자 이내)"
              maxLength="20"
            ></Input>
          </StRight_contact>
          <StMsg>
            {/* {checkID.msg} */}
            <StButton onClick={idCheckHandler}>중복확인</StButton>
          </StMsg>

          <StRight_contact>
            <Input
              size="medium"
              type="text"
              name="password"
              className="input"
              value={input.password || ""}
              onChange={onChangeHandlerInput}
              placeholder="비밀번호 입력(20자 이내)"
              maxLength="20"
            ></Input>
          </StRight_contact>
          <StMsg>{checkPW.msg}</StMsg>

          <StRight_contact>
            <Input
              size="medium"
              type="text"
              name="passwordCheck"
              className="input"
              value={input.passwordCheck || ""}
              onChange={onChangeHandlerInput}
              placeholder="비밀번호 확인"
              maxLength="20"
            ></Input>
          </StRight_contact>
          <StMsg>{checkPW2.msg}</StMsg>

          <StRight_contact>
            <Button
              onClick={onSubmitHandler}
              size="medium"
              color="line"
              // disabled={
              //     checkID.isOk &&
              //     checkPW.isOk &&
              //     checkPW2.isOk &&
              //     checkName.isOk
              //   )
              // }
            >
              회원가입
            </Button>
          </StRight_contact>
          <StRight_contact>
            <StButton
              onClick={() => {
                navigate("/Login");
              }}
              size="medium"
              color="reverse"
            >
              로그인페이지로 돌아가기
            </StButton>
          </StRight_contact>
        </Stlogin_box_Right>
      </Stlogin_box>
    </StSignUp>
  );
};

export default SignUp;

const StMsg = styled.h5`
  font-size: 10px;
  font-weight: 200 bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const StButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StSignUp = styled.section`
  height: 1000px;
  width: 100%;
  min-width: 800px;
  background: radial-gradient(#083311d0, #478f53);
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
  background: linear-gradient(-45deg, #dcd7e0, #ffffff);
`;
const StRight_contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 10px;
`;

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
  color: #c54a4a;
`;
const StLeft_text_h5 = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
  color: #ffffff;
`;

const StCenterH5 = styled.h5`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
`;
