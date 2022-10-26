import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import picture from "./picture.png";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <STBOX>
        <span>
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            WaterMelon
            <Button onClick={() => {}} size="logout" color="logout">
              로그아웃
            </Button>
          </h1>
        </span>
      </STBOX>
      <STImg src={picture} />
    </>
  );
}

export default Header;

const STBOX = styled.div`
  background: #4fb77e;
  color: $accent-color;
  text-transform: uppercase;
  width: 80%;
  max-width: 1200px;
  width: 700px;
  height: 80px;
  padding-top: 20px;
  padding-bottom: 40px;
  padding-left: 200px;
  text-align: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  display: flex;
  flex-direction: column;

  margin: auto;
`;
const STImg = styled.img`
  width: 80%;
  max-width: 1200px;
  width: 900px;
  height: 300px;
  display: flex;
  flex-direction: column;
  //border-bottom-right-radius: 10px;
  //border-bottom-left-radius: 10px;

  /* padding-top: 0px; */
  /* margin-top: 100px; */
  margin: auto;
`;
