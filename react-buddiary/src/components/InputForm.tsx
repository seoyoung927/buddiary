import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin: 8px 0px;
    height: 48px;
    background-color: ${(props)=>props.theme.bgColor};
    outline: 1px dashed ${(props)=>props.theme.subBgColor};
`;
const Input = styled.input`
    margin-left: 16px;
    background-color: ${(props)=>props.theme.bgColor};
    font-size: 16px;
    outline: none;
    border: 0px;
    width: calc(100% - 64px);
    &:focus{
        outline: none;
    }
`;
const Button = styled.button`
    margin-right: 16px;
    width: 48px;
    height: 32px;
    font-size: 14px;
    background-color: ${(props)=>props.theme.infoColor};
    border: 0px;
    border-radius: 10px;
    &:hover{
        outline: 2px solid #bad7e972;
        opacity: 80;
    }
    cursor: pointer;
`;

interface IForm {
    add: string;
}
interface IInputForm{
    onButton: any;
    placeholder?: string;
    btnText: string;
}
function InputForm({onButton, placeholder, btnText}:IInputForm){
    //react-hook-form
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const onSubmit = async({add}:IForm) => {
        onButton(add);
        setValue("add","");
    }
    
    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("add", {required:true,})} placeholder={placeholder}/>
            <Button>{btnText}</Button>
        </Form>
    )
}

export default InputForm;
