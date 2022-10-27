import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import picture from "./picture.png";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const userNickname = localStorage.getItem("nickname");

  const onClickHandler = async () => {
    const accessToken = localStorage.getItem("Access_Token");
    const refreshToken = localStorage.getItem("Refresh_Token");
    await axios.get(`${process.env.REACT_APP_SERVER}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        RefreshToken: refreshToken,
        "Cache-Control": "no-cache",
      },
    });
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <>
      <STBOX>
        {/* <span> */}

        <a>
          <STTitle
            onClick={() => {
              navigate("/");
            }}
          >
            WaterMelon
          </STTitle>
          <STNickname>{userNickname}님</STNickname>
          <Button onClick={onClickHandler} size="logout" color="logout">
            로그아웃
          </Button>
        </a>

        {/* </span> */}
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
  padding-top: 40px;
  padding-bottom: 30px;
  padding-left: 200px;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  align-self: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

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
const STTitle = styled.a`
  margin-left: 100px;
  font-size: 45px;
  font-weight: bold;
  font-style: italic;
`;

const STNickname = styled.a`
  font-size: 14px;
  margin-left: 30px;
  font-weight: bold;
`;
