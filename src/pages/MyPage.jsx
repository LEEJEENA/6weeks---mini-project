

import React, { useState, useEffect, useRef }  from "react";
import { useDispatch, useSelector } from "react-redux";
import {__createmelon, __getmelon, addMelon} from "../redux/modules/melonSlice"
import imageCompression from 'browser-image-compression';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/elements/Button";

function Mypage(){

  //const melons = useSelector((state)=> state.melon.melon)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // image
  // const [image, setImage] = useState({
  //     image_file: "",
  //     preview_URL: "img/default_image.png",
  //   });
    
  //   const imageInput = useRef();
    
  //   const saveImage = (e) => {
  //     const fileReader = new FileReader();
        
  //     if(e.target.files[0]){
  //       fileReader.readAsDataURL(e.target.files[0])
  //     }
  //       fileReader.onload = () => {
  //         setImage(
  //           {
  //             image_file: e.target.files[0],
  //             preview_URL: fileReader.result
  //           }
  //         )
  //       }
  //     }
      

  // //   //카테고리
  //   const [selected, setSelected] = useState("")

  //   //input 값 onchange
  //   const [title, setTitle] = useState("");
  //   const [singer, setSinger] = useState("")
  //   const [song, setSong] = useState("")
  //   const [content, setContent] = useState("")

  //   const onCreatemelon = () => {
  //     dispatch(__createmelon({id:melon.length+1, title, singer, song, content, selected, image: image.image_file}))
  //   }
    
    // useEffect
    // useEffect (()=> {
    //   dispatch(__getmelon())
    // }, [])
      
    //그냥 해보는 것



    // const onClickInput = () => {
    //   imageInput.current.click();
    //   }

    //그냥 해보는 것
    //const [files, setFiles] = useState([]);
    //const [urls, setUrls] = useState("");

    
    // const onChangeHandler = async (e) => {
    //   const fileList = e.target.files;
    //   const formData = new FormData();
  
    //   for (let i = 0; i < fileList.length; i++) {
    //     formData.append("files", fileList[i]);
    //   }
      
    //   setFiles([...formData]);
    //   if (!files) {
    //     setUrls("");
    //     return;
    //   }
    
    // };

    //그냥 해보는 것 

    // const [imgUrl, SetImgUrl] = useState("");

    // const inputs = {
    //   imgUrl,

    // }

    // const [files, setFiles] = useState("");

    // function onLoadFile(e) {
    //   const file = e.target.files;
    //   setFiles(file);
    // }

    // async function uploadFB(e) {
    //   const uploaded_file = await uploadBytes(
    //     ref(storage, `images/${e.target.files[0].name}`),
    //     e.target.files[0]
    //   );
    //   const file_url = await getDownloadURL(uploaded_file.ref);
    //   SetImgUrl(file_url);
    // }selected

    const [title, setTitle] = useState("");
    const [singer, setSinger] = useState("")
    const [song, setSong] = useState("")
    const [content, setContent] = useState("") 
    const [category, setCategory] = useState("")
    const [previewImage, setPreviewImage] =useState("")

    const [uploadImageForm, setUploadImageForm] = useState(null);

    
    const [melon, setMelon] = useState({
    title: "",
    singer:"",
    song:"",
    content:"",
    category:"",
    file: "",
    });

    const imgFileHandler = (e) => {
      setUploadImageForm(e.target.files[0]);
  
      let reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = () => {
        const previewImgUrl = reader.result;
        if (previewImgUrl) {
          setPreviewImage([...previewImage, previewImgUrl]);
        }
      };
    };
  
    const melonHandler = (e) => {
      setTitle(e.target.value)
      setSinger(e.target.value)
      setSong(e.target.value)
      setContent(e.target.value)
      setCategory(e.target.value)

      const { value, name } = e.target;
      setMelon({
        ...melon,
        [name]: value,
        file: uploadImageForm,
      });
    };
  
    const submitHandler = () => {
      dispatch(addMelon(melon));
      if ( !title || !singer || !song || !content || !category || !previewImage) {
        return alert("빈칸 없이 입력해 주세요");
      }
    };


    return (
        <div>
         
          <br/>
                <label> 글 제목</label><br/>
                 <STInputTitle type="text" name="title" onChange={melonHandler
                  //(e)=> setTitle(e.target.value) value={title}
                  }/>
                <br/>
                <img src={previewImage} style={{ marginBottom: "24px", width: "464px", height: "301px" }}/>
                <input type="file" id ="addFile" onChange={imgFileHandler} accept="image/*" />

                {/* <button btn="image" label="addFile">추가하기</button> */}
                {/* <img src={image.preview_URL}/>
                 <input type="file"  accept="image/*"  onChange={saveImage}
                 // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
                onClick={(e)=>e.target.value = null}
                ref={imageInput}/>  */}
             
                {/* <input type="file" accept="image/*" onChange={(e)=> {onChangeHandler();}}></input> */}
                <div> 카테고리 리스트
                  <select onChange={melonHandler} name="category"//e)=> setSelected(e.target.value)} value={selected}
                  >
                    <option value="힙합">힙합</option>
                    <option value="발라드">발라드</option>
                    <option value="팝송">팝송</option>
                    <option value="트로트">트로트</option>
                  </select>
                </div>
                <label> 가수 </label>
                <STInput type="text" placeholder="가수 이름을 입력해주세요"
                 onChange={melonHandler
                  //(e)=> setSinger(e.target.value) value={singer}
                } name="singer"/>
                
                <label> 노래제목 </label>
                <STInput2 type="text" placeholder="노래 제목을 입력해주세요"
                 onChange={melonHandler
                  //(e)=> setSong(e.target.value) value={song}
                  } name="song"/>
                <br/>
                <label> 내용 </label><br/>
                <STTextarea placeholder="내용을 입력해주세요"
                 onChange={melonHandler
                  //(e)=> setContent(e.target.value) value={content}
                  } name="content"/>
                <br/>
                <Button onClick={()=> {
                  // onCreatemelon()
                  submitHandler()
                  navigate("/")
                }} >입력하기</Button>
                <Button onClick= {()=> { navigate(-1)}}>돌아가기</Button>

                {/* <div>
                  확인하기 위한 용도
                  <div>
                  
                    {melon.map(melon=> (
                      <div key={melon.id}>
                        
                        <div>{melon.title}</div>
                        <div>{melon.singer}</div>
                        <div>{melon.song}</div>
                        <div>{melon.content}</div>
                          <div>{melon.image.image_file}</div>  
                        <div>{melon.selected}</div>
                        <div>{melon.imageInput}</div>
                      </div>
                    ))}
                  </div>
                </div> */}
        </div>
    )
}

export default Mypage;



//https://duckgugong.tistory.com/249

const STInputTitle= styled.input`
  width: 70%;
  border: 1px solid rgb(238, 238, 238);
`

const STInput= styled.input`
  width: 160px;
  border: 1px solid rgb(238, 238, 238);
  
`
const STInput2= styled.input`
  width: 265px;
  border: 1px solid rgb(238, 238, 238);
  padding-left : 10px;
  
`

const STTextarea = styled.textarea`
  width: 70%;
  border: 1px solid rgb(238, 238, 238);
  padding: 12px;
  font-size: 14px;
  height : 250px;
`

const STImg = styled.img`
  width : 100px;
  height : 100px;
`