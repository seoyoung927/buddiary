import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 8px 0px;
    height: 48px;
`;
const Input = styled.input`
    width: calc(100% - 124px);
    margin-left: 8px;
    margin-right: 8px;
    font-size: 16px;
    outline: none;
    border: 0px;
    border-bottom: 1px solid black;
    &:focus{
        outline: none;
    }
`;
const Button = styled.button`
    margin: 0px 2px;
    width: 48px;
    height: 32px;
    font-size: 14px;
    border: 0px;
    border-radius: 10px;
    cursor: pointer;
`;
const UButton = styled(Button)`
    background-color: ${(props)=>props.theme.bgColor};
    &:hover{
        outline: 2px solid #dfdfdf92;
        opacity: 80;
    }
`;
const DButton = styled(Button)`
    margin-right: 16px;
    background-color: ${(props)=>props.theme.dangerColor};
    &:hover{
        outline: 2px solid #efafaf7d;
        opacity: 80;
    }
`;

interface IForm {
    update: string;
}
interface IUpdateForm{
    id: number;
    text: string;
    onUpdate: any;
    onDelete: any;
}
function UpdateForm({id, text, onUpdate, onDelete}:IUpdateForm){
    //react-hook-form
    const {register, handleSubmit} = useForm<IForm>({
        defaultValues: {
            update: text,
        }
    });
    const onUpdateBtn = async({update}:IForm) => {
        onUpdate(id,update);
    }
    const onDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        onDelete(id);
    }

    return(
        <Form onSubmit={handleSubmit(onUpdateBtn)}>    
            <Input {...register("update")}/>
            <UButton>수정</UButton>
            <DButton onClick={onDeleteBtn}>삭제</DButton>
        </Form>
    )
}

export default UpdateForm;
