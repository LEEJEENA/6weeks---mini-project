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
  const melon = useSelector((state) => state.melon.melon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getmelon());
    console.log(melon);
  }, [dispatch]);

  // const accessToken = localStorage.getItem("Access_Token");
  // const refreshToken = localStorage.getItem("Refresh_Token");
  // console.log(accessToken);
  // console.log(refreshToken);

  return (
    <div>
      <Layout>
        <Header />

        <Button
          size="write"
          color="line"
          onClick={() => {
            navigate("/MyPage");
          }}
        >
          글쓰기
        </Button>
        <STBOX1>
          {melon.map((melon, index) => (
            <STBtn
              key={index}
              onClick={() => {
                navigate(`/Detail/${melon.id}`);
              }}
            >
              <STMainContent key={melon.id}>
                <div>사진 : </div>
                <img
                  src={melon.image}
                  style={{
                    marginBottom: "24px",
                    width: "464px",
                    height: "301px",
                  }}
                />
                <div>
                  {melon.singer} - {melon.song} / {melon.selected}
                </div>
                <h4>제목 : {melon.title}</h4>
              </STMainContent>
            </STBtn>
          ))}
        </STBOX1>
      </Layout>
    </div>
  );
};

export default Main;

const STBOX1 = styled.div`
  width: 80%;
  max-width: 1200px;
  height: 80px;
  padding-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const STBtn = styled.div`
  border: 2px solid transparent;
  width: 80%;
  max-width: 200px;
  border: 1px solid #4fb77e;
  height: 300px;
  border-radius: 5px;
  padding-top: 20px;
  margin-top: 10px;
`;

const STMainContent = styled.div`
  flex-direction: row;
  justify-content: space-between;

  flex-direction: column;
`;
