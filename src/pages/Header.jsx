
import styled from "styled-components";
import { useNavigate} from "react-router-dom";

function Header(){

    const navigate = useNavigate()

    return(
        <>
            <STBOX>
                <span>
                    <h2 onClick={() => {navigate("/")}}>WaterMelon</h2>
                </span>
                
            </STBOX>
        </>
    )
}

export default Header;

const STBOX = styled.div`
    background: #4FB77E;
    color: $accent-color;
    text-transform: uppercase;
    width: 80%;
    max-width: 1200px;
    height :80px;
    padding-top: 20px;
    text-align : center;
    display: flex;
   flex-direction: column;

  margin: auto;`