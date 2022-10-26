import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getmelon } from "../redux/modules/melonSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import picture from "../components/elements/picture.png";
import Header from "./Header";

const Main = () => {
  const navigate = useNavigate();
  const melon = useSelector((state) => state.melon.melon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getmelon());
  }, [dispatch]);

  return (
    <STBOX1>
      <Header />

      <div>
        <STImg src={picture} />
      </div>
      {melon.map((melon, index) => (
        <STBtn key={index}
          onClick={() => {
            navigate(`/Detail/${melon.id}`);
          }}
        >
          <STMainContent key={melon.id}>
            <div>사진 : {melon.image}</div>
            <div>
              {melon.singer} - {melon.song} / {melon.selected}
            </div>
            <h4>제목 : {melon.title}</h4>
          </STMainContent>
        </STBtn>
      ))}
    </STBOX1>
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

const STImg = styled.img`
  width: 80%;
  max-width: 1200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: auto;
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
