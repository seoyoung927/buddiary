import { useRecoilState } from "recoil";
import { BsCaretLeft,BsCaretRight } from "react-icons/bs";
import { getMonthDate, getNewDateObj } from "../../utils";
import { SelectedDay } from "../../recoil/selectedDay";
import styled from "styled-components";
import DateComponent from "./DateComponent";
import PairDateComponent from "./PairDateComponent";

//styled-components
const CalenderWrapper = styled.div`
    border: 1px solid ${(props)=>props.theme.primaryColor};
    display: flex;
    flex-direction: column;

`;
const MonthWrapper = styled.div`
    margin-top: 8px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props)=>props.theme.bgColor};
    h4{
        font-weight: 600;
        font-size: 20px;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin: 0px 12px;
        padding: 8px;
        border-radius: 100px;
        border: 0px;
        background-color: ${(props)=>props.theme.bgColor};
        &:hover{
            background-color: rgba(160, 160, 160, 0.5);
        }
        cursor: pointer;
    }
`;
const DayWrapper = styled.div`
    margin: 16px 0px;
    height: 28px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    div{
        width: calc(100%);
        padding: 4px;
        font-size: 18px;
        text-align: center;
        border: 1px solid;
    }
`;
const DateWrapper = styled.div`
    .weekWrapper{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
`;

interface ICalender{
    pairId?: number;
}
function Calender({pairId}:ICalender){
    //recoil
    const [selectedDate,setSelectedDate] = useRecoilState(SelectedDay);
    const days = getMonthDate(selectedDate);
    //next month
    const onLeft = () => {
        if(selectedDate.month===0){
            setSelectedDate(getNewDateObj(new Date(selectedDate.year-1,11,1)));
        }else{
            setSelectedDate(getNewDateObj(new Date(selectedDate.year,selectedDate.month-2,1)));
        }
    }
    const onRight = () => {
        if(selectedDate.month===11){
            setSelectedDate(getNewDateObj(new Date(selectedDate.year+1,0,1)));
        }else{
            setSelectedDate(getNewDateObj(new Date(selectedDate.year,selectedDate.month,1)));
        }
    }
    return(
        <CalenderWrapper>
            <MonthWrapper>
                <button onClick={onLeft}><BsCaretLeft size={16} /></button>
                <h4>{days.month}월&nbsp;{days.year}</h4>
                <button onClick={onRight}><BsCaretRight size={16} /></button>
            </MonthWrapper>
            <DayWrapper>
                {["일","월","화","수","목","금","토"].map((day)=><div key={day}>{day}</div>)}
            </DayWrapper>
            <DateWrapper>
            {days.date?.map((item,index)=>(<div className="weekWrapper" key={index}>
                {item?.map((day)=>(pairId ? <PairDateComponent d={day} pairId={pairId} thisMonth={selectedDate.month} key={day.date} />
                : <DateComponent d={day} thisMonth={selectedDate.month} key={day.date} />))}<br/>
            </div>))}
            </DateWrapper>
        </CalenderWrapper>
    )
}

export default Calender;
