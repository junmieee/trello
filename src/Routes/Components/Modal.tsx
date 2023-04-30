import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../../utils.ts";
import { getDetailData, IDetailInfo } from "../../api.ts";
import { useQuery } from "@tanstack/react-query";
import { Navigate, PathMatch } from "react-router-dom";
import { useMatch, useNavigate } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillPlayCircle, AiOutlinePlusCircle } from "react-icons/ai";
import ReactStars from "react-stars";


const Overlay = styled(motion.div)`
    height: 100%;
    width: 100%;
    top: 0; 
    left: 0; 
    background-color: rgba(0,0,0,0.4);
    z-index: 99;
    position: fixed;
    opacity: 0;

`
const ModalBox = styled(motion.div)`
    position: fixed;
  top: 7rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  min-width: 76.8rem;
  height: 80%;
  overflow: auto;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  z-index: 100;

  /* 높이에 따라 스크롤 터지게 만들기 */
  @media screen and (max-height: 860px) {
    overflow: auto;
  }
  @media only screen and (max-width: 800px) {
    top: 5rem;
    min-width: 58.8rem;
    width: 90%;
    height: auto;
  }
  @media only screen and (max-width: 700px) {
    top: 0;
    bottom: 0;
    min-width: auto;
    width: 100%;
    border-radius: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-track {
    background-color: #4e4e4e;
    border-radius: 100px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`

const ModalCover = styled.div`
position: relative;
    width: 100%;
    height:40rem;
    background-position: center center;
    background-size:cover;
    
`

const ModalCoverTitle = styled.div`
position: absolute;
bottom: 2rem;
font-weight: 200;
left: 2.5rem;
bottom: 6rem;
`

const ModalDescription = styled.div`
margin-right: 4rem;
margin-left: 2rem;
`



const TagLine = styled.h3`
  position: relative;
  margin-bottom: 1rem;
  padding-left: 2rem;
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-left:2rem;
  font-size:16px;
  font-weight:400;

  &:before {
    content: "";
    position: absolute;
    width: 0.3rem;
    height: 1.2rem;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ccc;
  }
  @media only screen and (max-width: 700px) {
    display: inline;
  }
`;

const OverView = styled.p`
  margin-bottom: 5rem;
  font-size: 1.4rem;
  line-height: 1.9rem;
  margin-left:2rem;
  @media only screen and (max-width: 700px) {
    margin: 0 auto;
    margin-top: 2rem;
    text-align: left;
    line-height: 2.4rem;
    width: 90%;
  }
`;


const KorTitle = styled.h2`
font-size: 3.6rem;
margin-bottom: 0.5rem;
font-weight: 150;
`

const EngTitle = styled.h2`
font-size: 2.0rem;
font-weight:400;
`


const ModalDetail = styled.div`
    width: 100%;
  
    display: flex;
    
`
const detailVariants = {
    initial: { opacity: 0 },
    click: { opacity: 1 },
    exit: { opacity: 0 },
};

const ModalYear = styled.div`
    

`




const ModalInfo = styled.div`
margin-top:2rem;
font-size:1.4rem;
font-weight:200;
width: 100%;
position: relative;
margin-right: 2rem;
display:flex;
flex-direction:column;

`
const ModalGanre = styled.div`
margin-bottom: 1.5rem;
width: 100%;
`
const ModalRuntime = styled.div`
    margin-bottom: 1.5rem;
`




interface IBannerBtn {
    color: string;
    bgcolor: string;
    hovercolor: string;
};



const ButtonSection = styled.div`
  display: flex;
  gap: 1vw;
  padding-top: 35rem;
  padding-left: 2rem;
  
   
`;



const BtnICon = styled.div<{ hovercolor: string; bgcolor: string }>`
  width: 4rem;
  height: 4rem;
  display: flex;
  cursor:pointer;
  color: ${(props) => props.bgcolor};
  &:hover {
    color: ${(props) => props.hovercolor};
  }

  align-items: center;
  svg {
    width: 4rem;
    height: 4rem;
  }

  @media only screen and (max-width: 1000px) {
    width: 2.4rem;
    height: 2.4rem;
  }
  @media only screen and (max-width: 800px) {
    width: 2.4rem;
    height: 2.4rem;
  }

  `


const VoteAverage = styled.div`
    display: flex;
    margin-left:15px;
    margin-top: 10px;
  
    
`;


const Rates = styled.span`
    font-size:20px;
    margin-left: 10px;
`



interface IModal {
    dataId: number;
    listType: string;
    menuName: string;
    requestUrl: string;
    returnUrl?: string;
    layoutId: string;
}



export default function Modal({
    dataId,
    listType,
    menuName,
    requestUrl,
    returnUrl,
    layoutId
}: IModal) {
    const navigate = useNavigate();
    const modalMatch = useMatch(`/${menuName}/${listType}/:id`);

    const { data } = useQuery<IDetailInfo>(
        [listType + dataId, "detail" + dataId],
        () => getDetailData(requestUrl, dataId) || null
    );
    const onClickedOverlay = () => navigate(-1);
    console.log(data)
    const getYear = (date: string) => {
        if (date) {
            return date.split("-")[0];
        } else {
            return "";
        }
    };
    const getGenreToString = (arr: IGenre[]): string => {
        if (arr && arr.length > 0) {
            return (
                arr.map((g, idx) => {
                    return idx + 1 === arr.length ? `${g.name}` : `${g.name}`;
                }) + ""
            );
        }
        return "";
    };


    return (
        <>
            <Overlay
                onClick={onClickedOverlay}
                exit={{ opacity: 0 }}

                animate={{ opacity: 1 }} />

            <ModalBox
                layoutId={modalMatch?.params.id + listType}
                variants={detailVariants}
                initial="initial"
                animate="click"
                exit="exit"
            >
                <>

                    <ModalCover
                        style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(data?.backdrop_path || "", "w500")}) ` }}
                    >
                        <>
                            <ModalCoverTitle>

                                <KorTitle>
                                    {data?.title ? data?.title : data?.name}

                                </KorTitle>
                                <EngTitle>
                                    {data?.original_title ? data?.original_title : ""}

                                </EngTitle>


                            </ModalCoverTitle>
                            <ButtonSection
                            >

                                <BtnICon
                                    bgcolor={"rgba(255, 255, 255, 0.75)"}
                                    hovercolor={"rgba(255, 255, 255, 1)"}
                                >
                                    <AiFillPlayCircle />
                                </BtnICon>


                                <BtnICon
                                    bgcolor={"rgba(255, 255, 255, 0.75)"}
                                    hovercolor={"rgba(255, 255, 255, 1)"}                                >
                                    <AiOutlinePlusCircle />
                                </BtnICon>
                                <VoteAverage>
                                    <ReactStars
                                        count={5}
                                        value={
                                            data?.vote_average
                                                ? data.vote_average / 2
                                                : 0
                                        }
                                        color1="#e6e6e6"
                                        color2="#fc3"
                                        size={20}
                                        edit={false}
                                    />
                                    <Rates>{data?.vote_average.toFixed(1)}</Rates>
                                </VoteAverage>


                            </ButtonSection>

                        </>
                    </ModalCover>
                    <ModalDetail>

                        <ModalDescription>

                            {data?.tagline ? (
                                <TagLine>{data?.tagline}</TagLine>
                            ) : null}
                            <OverView>
                                {data && data?.overview.length > 390
                                    ? data?.overview.slice(0, 390) + "..."
                                    : data?.overview}
                            </OverView>
                        </ModalDescription>
                        <ModalInfo>

                            <ModalGanre>{getGenreToString(data?.genres || [])} </ModalGanre>
                            <ModalRuntime>{data?.runtime ? `${data?.runtime}분` : ""}</ModalRuntime>
                            <ModalYear >{getYear(data?.release_date || "")}</ModalYear>
                            <ModalYear >{getYear(data?.first_air_date || "")}</ModalYear>
                        </ModalInfo>

                    </ModalDetail>
                </>
            </ModalBox>
        </>
    )
}