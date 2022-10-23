import React, { useState, useEffect, useRef }  from "react";
import { useDispatch, useSelector } from "react-redux";
import {__createmelon, __getmelon} from "../redux/modules/melonSlice"
import imageCompression from 'browser-image-compression';
function Mypage(){

  const melon = useSelector((state)=> state.melon.melon)
  const dispatch = useDispatch();

  // image
  const [image, setImage] = useState({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
    
    const imageInput = useRef();
    
    const saveImage = (e) => {
      const fileReader = new FileReader();
        
      if(e.target.files[0]){
        fileReader.readAsDataURL(e.target.files[0])
      }
        fileReader.onload = () => {
          setImage(
            {
              image_file: e.target.files[0],
              preview_URL: fileReader.result
            }
          )
        }
      }
      

  //   //카테고리
    const [selected, setSelected] = useState("")

    //input 값 onchange
    const [title, setTitle] = useState("");
    const [singer, setSinger] = useState("")
    const [song, setSong] = useState("")
    const [content, setContent] = useState("")

    const onCreatemelon = () => {
      dispatch(__createmelon({id:melon.length+1, title, singer, song, content, selected, image: image.preview_URL}))
    }
    
    // useEffect
    useEffect (()=> {
      dispatch(__getmelon())
    }, [])
      
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
    // }

    return (
        <div>
         
          <br/>
                <label> 글 제목</label>
                 <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/>
                <br/>
                <img src={image.preview_URL}/>
                 <input type="file"  accept="image/*"  onChange={saveImage}
                 // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
                onClick={(e)=>e.target.value = null}
                ref={imageInput}/> 
             
                {/* <input type="file" accept="image/*" onChange={(e)=> {onChangeHandler();}}></input> */}
                <div> 카테고리 리스트
                  <select onChange={(e)=> setSelected(e.target.value)} value={selected}>
                    <option value="힙합">힙합</option>
                    <option value="발라드">발라드</option>
                    <option value="팝송">팝송</option>
                    <option value="트로트">트로트</option>
                  </select>
                </div>
                <label> 가수 </label>
                <input type="text" placeholder="가수 이름을 입력해주세요"
                value={singer} onChange={(e)=> setSinger(e.target.value)}/>
                <br/>
                <label> 노래제목 </label>
                <input type="text" placeholder="노래 제목을 입력해주세요"
                value={song} onChange={(e)=> setSong(e.target.value)}/>
                <br/>
                <label> 내용 </label>
                <textarea placeholder="내용을 입력해주세요"
                value={content} onChange={(e)=> setContent(e.target.value)}/>
                <br/>
                <button onClick={onCreatemelon} >입력하기</button>
                <button>돌아가기</button>

                <div>
                  확인하기 위한 용도
                  <div>
                  
                    {melon.map(melon=> (
                      <div key={melon.id}>
                        
                        <div>{melon.title}</div>
                        <div>{melon.singer}</div>
                        <div>{melon.song}</div>
                        <div>{melon.content}</div>
                        {/* <div>{melon.image.preview_URL}</div> */}
                        <div>{melon.selected}</div>
                        <div>{melon.imageInput}</div>
                      </div>
                    ))}
                  </div>
                </div>
        </div>
    )
}

export default Mypage;



//https://duckgugong.tistory.com/249
