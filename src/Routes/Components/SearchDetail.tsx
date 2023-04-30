import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";


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

const ModalBox = styled.div`
    display:flex;
    position: absolute;
    background-color:red;
    justify-content: center;
    align-items: center;
    top: 7rem;
  left: 0;
  right: 0;
  margin: 0 auto;
z-index: 100;
width: 50%;
  min-width: 76.8rem;
  height: 80%;
  overflow: auto;
  border-radius: 1.5rem;

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
const SearchDetail = ({ backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen }) => {
    const navigate = useNavigate();
    const onClickedOverlay = () => setModalOpen(false)


    return (
        <>
            <Overlay onClick={onClickedOverlay} />
            <ModalBox>

            </ModalBox>
        </>
    )
}

export default SearchDetail
