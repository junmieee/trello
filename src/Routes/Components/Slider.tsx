import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { sliderCnt } from "../../atoms.tsx";
import { makeImagePath } from "../../utils.ts";
import { IGetDataResult } from "../../api";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import Modal from "./Modal.tsx";


const Wrapper = styled(motion.div)`
position: relative;
  min-height: 23.9rem;
  margin-top: 3rem;
  /* 슬라이더 돌리면서 스크롤 터짐 방지용 */
  &:hover {
      z-index: 99;
  }
  :hover .arrow {
    opacity: 1;
    width: 100%;
  }
`;


const SliderTitle = styled.div`
    font-size:2.4rem;
    padding-left:2rem;
    padding-bottom:1rem;
    font-weight:600;
`

const Slider = styled.div`
    width:100%;

`;

interface ISlider {
    data: IGetDataResult;
    title: string;
    listType: string;
    menuName: string;
    mediaType: string;

}

const Row = styled(motion.div) <{ gridcnt: number }>`
  position: absolute;
  left: 0;
  margin-bottom: 3rem;
  width: 100%;
  clear: both;
  &:after {
    content: "";
    display: block;
    clear: both;
  }


`

const Box = styled(motion.div) <{ bgphoto: string; offset: number; layoutId: string }>`
    display: block;
  float: left;
  width: calc(100% / ${(props) => props.offset} - 5px);
  height: 16rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  font-size: 4rem;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  & ~ & {
    margin-left: 0.6rem;
  }

`;


const Info = styled(motion.div)`
position: relative;
top: 15rem;
width: 100%;
padding: 1rem;
font-size: 1.8rem;
background-color: ${(props) => props.theme.black.lighter};
text-align: center;
opacity:0;
`

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            type: "tween",
            delay: 0.2,
            duration: 0.2,
        },
    },
};


const BoxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        transition: {
            //bouncing 방지
            type: "tween",
            delay: 0.3,
            duration: 0.2,
        },
    },
};


const ArrowBtn = styled(motion.div)`
position: absolute;
top: 50%;
transform: translateY(-50%);
display: flex;
justify-content: center;
align-items: center;
width: 6rem;
height: 6rem;
color: #fff;
border-radius: 50%;
background-color: rgba(0, 0, 0, 0.5);
transition: all 0.3s;
z-index: 90;
cursor: pointer;
&:hover {
  color: #000;
  background-color: #fff;
}
&:blur {
  color: #fff;
  background-color: #000;
}
svg {
  width: 2.8rem;
  height: 2.8rem;
}
@media only screen and (max-width: 500px) {
  width: 5rem;
  height: 5rem;
  svg {
    width: 2rem;
    height: 2rem;
  }
}
`;

const LeftArrowBtn = styled(ArrowBtn)`
left: 0;

`;

const RightArrowBtn = styled(ArrowBtn)`
right: 0;
`;

const rowVariants = {
    hidden: (right: number) => {
        return {
            x: right === 1 ? window.innerWidth + 5 : -window.innerWidth - 5,
        };
    },
    visible: {
        x: 0,
        y: 0,
    },
    exit: (right: number) => {
        return {
            x: right === 1 ? -window.innerWidth - 5 : window.innerWidth + 5,
        };
    },
};

export function Sliders({ data, title, listType,
    menuName,
    mediaType, }: ISlider) {
    const [index, setIndex] = useState(0);
    const offset = useRecoilValue(sliderCnt);
    const [isRight, setIsRight] = useState(1);
    const bigMatch: PathMatch<string> | null = useMatch(
        `/${menuName}/${listType}/:id`
    );
    //const [leaving, setLeaving] = useState(false);
    const IndexChange = (right: number) => {
        if (data) {
            setIsRight(right);
            const totlaLength = data.results.length;
            const maxIndex = totlaLength % offset === 0 ?
                Math.floor(totlaLength / offset) - 1
                : Math.floor(totlaLength / offset);



            right === 1
                ? setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
                : setIndex((prev) => (prev === 0 ? maxIndex : prev - 1))

        }

    };
    console.log(data)
    //화살표 버튼 클릭시 
    const onClickToArrowBtn = (right: number) => {
        IndexChange(right);
    };
    const navigate = useNavigate();

    const onBoxClicked = (menu: string, type: string, id: number) => {
        navigate(`/${menu}/${type}/${id}`);
    };

    return (
        <Wrapper>
            <SliderTitle>{title}</SliderTitle>
            <LeftArrowBtn onClick={() => onClickToArrowBtn(-1)}>
                <AiOutlineLeft />
            </LeftArrowBtn>
            <RightArrowBtn
                onClick={() => onClickToArrowBtn(1)}>
                <AiOutlineRight />
            </RightArrowBtn>
            <Slider>
                <AnimatePresence
                    //처음 랜더링 할 때 슬라이드가 미끄러져 들어오는 것 방지
                    initial={false}
                >
                    <Row
                        gridcnt="offset"
                        custom={isRight}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key={index}
                        transition={{ type: "tween", duration: 1 }}
                    >
                        {data?.results
                            .slice(offset * index, offset * index + offset)
                            .map((i) => (
                                <Box
                                    // layoutId={ }
                                    variants={BoxVariants}
                                    key={i.id}
                                    initial="normal"
                                    whileHover="hover"
                                    transition={{ type: "tween" }}
                                    layoutId={i.id + "" + listType}
                                    offset={offset}
                                    bgphoto={makeImagePath(i.backdrop_path || "", "w500")}
                                    onClick={() => {
                                        onBoxClicked(menuName, listType, i.id);
                                    }}
                                >
                                    <Info variants={infoVariants}>
                                        {i.title ? i.title : i.name}
                                    </Info>
                                </Box>
                            ))}
                    </Row>

                </AnimatePresence>
                <AnimatePresence>
                    {bigMatch ? (
                        <Modal
                            dataId={Number(bigMatch?.params.id)}
                            listType={listType}
                            menuName={menuName}
                            requestUrl={mediaType}
                        />

                    ) : null}
                </AnimatePresence>
            </Slider >
        </Wrapper >
    )

}