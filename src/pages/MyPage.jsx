import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  __createmelon,
  __getmelon,
  __addMelon,
} from "../redux/modules/melonSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/elements/Button";
import Header from "../components/elements/Header";
import Layout from "../components/elements/Layout";
import AddImage from "../components/elements/addImage.svg";
import Input from "../components/elements/Input";
function Mypage() {
  //const melons = useSelector((state)=> state.melon.melon)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [singer, setSinger] = useState("");
  const [song, setSong] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  // const [previewImage, setPreviewImage] = useState("");
  // const [uploadImageForm, setUploadImageForm] = useState(null);
  const [melon, setMelon] = useState({
    title: "",
    singer: "",
    song: "",
    content: "",
    category: "",
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  ///image 부분
  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgFile(file);
    };
  };
  const melonHandler = (e) => {
    setTitle(e.target.value);
    setSinger(e.target.value);
    setSong(e.target.value);
    setContent(e.target.value);
    setCategory(e.target.value);
    const { value, name } = e.target;
    setMelon({
      ...melon,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // const dataSet = {
    //   title: melon.title,
    //   singer: melon.singer,
    //   song: melon.song,
    //   content: melon.content,
    // };
    // formData.append("json", JSON.stringify(dataSet));
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("title", melon.title);
    formData.append("singer", melon.singer);
    formData.append("song", melon.song);
    formData.append("content", melon.content);
    // formData.append("category", melon.category);
    dispatch(__addMelon(formData));
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(imgFile);
    console.log(melon);
    if (!title || !singer || !song || !content || !category) {
      return alert("빈칸 없이 입력해 주세요");
    }
    window.location.replace("/");
  };
  return (
    <div>
      <Layout>
        <Header />
        <STBox>
          <br />
          <div method="post" id="add" encType="multipart/form-data">
            <label> 글 제목</label>
            <Input
              size="large"
              type="text"
              name="title"
              onChange={melonHandler}
            />
            <br />
            <br />
            <label htmlFor="imgFile">
              <img
                src={imageUrl ? imageUrl : AddImage}
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
              {/* <STButton type="button" htmlFor="inputImg" size="medium">
                이미지 업로드
              </STButton> */}
            </label>
            <br />
            {/* <div>
            {" "}
            카테고리 리스트
            <select
              onChange={melonHandler}
              name="category" //e)=> setSelected(e.target.value)} value={selected}
            >
              <option value="힙합">힙합</option>
              <option value="발라드">발라드</option>
              <option value="팝송">팝송</option>
              <option value="트로트">트로트</option>
            </select>
          </div> */}
            <label> 가수 </label>
            <Input
              size="medium"
              type="text"
              placeholder="가수 이름을 입력해주세요"
              onChange={
                melonHandler
                //(e)=> setSinger(e.target.value) value={singer}
              }
              name="singer"
            />
            <label> 노래제목 </label>
            <Input
              type="text"
              placeholder="노래 제목을 입력해주세요"
              onChange={
                melonHandler
                //(e)=> setSong(e.target.value) value={song}
              }
              name="song"
            />
            <br />
            <label> 내용 </label>
            <br />
            <Input
              size="textarea"
              placeholder="내용을 입력해주세요"
              onChange={
                melonHandler
                //(e)=> setContent(e.target.value) value={content}
              }
              name="content"
            />
            <br />
            <Button type="submit" form="add" onClick={onSubmit}>
              입력하기
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              돌아가기
            </Button>
          </div>
        </STBox>
      </Layout>
    </div>
  );
}
export default Mypage;
const STInput = styled.input`
  width: 160px;
  border: 1px solid rgb(238, 238, 238);
`;
const STInput2 = styled.input`
  width: 265px;
  border: 1px solid rgb(238, 238, 238);
  padding-left: 10px;
`;
const STTextarea = styled.textarea`
  width: 70%;
  border: 1px solid rgb(238, 238, 238);
  padding: 12px;
  font-size: 14px;
  height: 250px;
`;
const STBox = styled.div`
  width: 80%;
  max-width: 1200px;
  width: 900px;
  margin: auto;
  padding: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
const STButton = styled.a`
  padding: 10px;
  margin: 5px 5px;
  align-self: center;
  width: 240px;
  height: 40px !important;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4;
  border: 0;
  color: #315a47;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #315a47;
    border: 0;
    color: white;
  }
`;
