import { HandleButton, HandleButtonDiv, InputDialog, PlaceAddDialog, TextDialog } from "@/m-styled-component/content-component/styled_place"
import { useState } from "react"

function PlaceDialog({ setOpen,setCount}: any) {
    const [inputs, setInputs] = useState<any>({
      number: 0
    })
    const { number } = inputs
    const onClose = () => {
      setOpen(false)
    }
    const onChange = (e: any) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
    const onAppend = (e: any) => {
      if (number < 9) {
        setCount(number)
        setOpen(false)
      }
      else {
        setOpen(true)
      }
    }
    return (
      <PlaceAddDialog>
        <TextDialog>몇명을 추가 하시겠습니까?</TextDialog>
        <InputDialog type='number' onChange={onChange} name='number' value={number} placeholder='숫자를 입력하세요'></InputDialog>
        <HandleButtonDiv>
          <HandleButton type='button' value='추가' onClick={onAppend}></HandleButton>
          <HandleButton type='button' value='취소' onClick={onClose} ></HandleButton>
        </HandleButtonDiv>
      </PlaceAddDialog>
    )
  }
  
  export default PlaceDialog