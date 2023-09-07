import { FaRecycle } from 'react-icons/fa';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { TrashCanState } from '../atoms.tsx'


const TrashCanWrapper = styled.div`
width: 33px;
height: 40px;
position: absolute;
bottom: 40px;
right: 50%;
.trash {
    background-color: #2C3A47;
    width: 100%;
    height: 100%;
    display: inline-block;
    margin: 0 auto;

svg {
      position: absolute;
      top: 13px;
      right: 8px;
      color: white;
    }
    position: relative;
    -webkit-border-bottom-right-radius: 6px;
    -webkit-border-bottom-left-radius: 6px;
    -moz-border-radius-bottomright: 6px;
    -moz-border-radius-bottomleft: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .trash span {
      position: absolute;
      height: 6px;
    width: 48px;
    background: #2C3A47;
    top: -15px;
    left: -8px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(5deg);
    transition: transform 250ms;
    transform-origin: 80% 100%;
    display: flex;
    justify-content: center;
  }
  .trash span:after {
    content: '';
    position: absolute;
    width: 13px;
    height: 4px;
    background: #2C3A47;
    top: -6px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 250ms;
    transform-origin: 82% 100%;
    left: 20px;
  }
  &:hover .trash span {
    transform: rotate(45deg);
    transition: transform 250ms;
  }
    
`

export const TrashCan = () => {
  const trashCan = useRecoilValue(TrashCanState);

  return (
    <Droppable droppableId="trashcan">
      {(magic) => (
        <TrashCanWrapper ref={magic.innerRef} {...magic.droppableProps}>
          {trashCan && (
            <span className="trash">
              <span></span>
              {/* <FaRecycle /> */}
            </span>
          )}
        </TrashCanWrapper>
      )}
    </Droppable>
  )
}