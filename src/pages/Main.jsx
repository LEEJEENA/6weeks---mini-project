import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getmelon } from "../redux/modules/melonSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/elements/Button";
import Header from "../components/elements/Header";
import Layout from "../components/elements/Layout";
const Main = () => {
  const navigate = useNavigate();
  const melons = useSelector((state) => state.melon.melon);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getmelon());
  }, [dispatch]);
  // const accessToken = localStorage.getItem("Access_Token");
  // const refreshToken = localStorage.getItem("Refresh_Token");
  // console.log(accessToken);
  // console.log(refreshToken);
  return (
    <div>
      <Layout>
        <Header />
        <STBody>
          {/* <STBox> */}
          <STCategory>
            <Button
              size="write"
              color="line"
              onClick={() => {
                navigate("/MyPage");
              }}
              margin-ri
            >
              글쓰기
            </Button>
          </STCategory>
          {/* <br /> */}
          <STBox>
            {melons &&
              melons.map((melon, index) => {
                return (
                  <STBtn
                    key={index}
                    onClick={() => {
                      navigate(`/Detail/${melon.id}`);
                    }}
                  >
                    <div>
                      <img
                        src={melon.image}
                        style={{
                          marginTop: "-20px",
                          width: "250px",
                          height: "170px",
                        }}
                      />
                      <div>
                        {melon.singer} - {melon.song}
                      </div>
                      <h2> {melon.title}</h2>
                    </div>
                  </STBtn>
                );
              })}
          </STBox>
          {/* </STBox> */}
        </STBody>
      </Layout>
    </div>
  );
};
export default Main;

const STBody = styled.div`
  .container {
    display: flex;
  }
`;
const STCategory = styled.div`
  width: 80%;
  max-width: 1200px;
  height: 80px;
  padding-top: 20px;
  text-align: center;
  /* display: flex;
  flex-direction: row; */
`;
const STList = styled.div`
  width: 900px 80%;
  max-width: 1200px;
  height: 80px;
  padding-top: 20px;
  text-align: center;
  background-color: #e4fcef;
  /* display: flex;
  flex-direction: row; */
`;
const STBOX1 = styled.div`
  width: 100%;

  height: 200px;
  text-align: center;
  /* display: flex; */
  flex-direction: column;
`;
const STBtn = styled.div`
  border: 2px solid transparent;
  width: 80%;
  max-width: 250px;
  border: 3px solid #e4fcef;
  height: 500x;
  border-radius: 5px;
  padding-top: 20px;
  margin-top: 10px;
  background-color: #edfaf3;
  margin-left: 10px;
  float: right;
`;
const STBox = styled.div`
  width: 100%;
  max-width: 1200px;
  width: 800px;
  margin: auto;
  padding: auto;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  align-self: center;
  flex-flow: row wrap;
`;
