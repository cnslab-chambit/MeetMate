import React from 'react'
import {
    NavButtonDiv
} from '@/styled-component/nav-component/styled_desktop_nav_button'
import ArrowIcon from '../public/images/arrow.svg'
function NavButton({open,setOpen}:any) {
  const onNavTogle = () =>{
    open ? setOpen(false):setOpen(true)
  }
  return (
    <NavButtonDiv onClick={onNavTogle} active={open}>
        <ArrowIcon className='arrow' />
    </NavButtonDiv>
  )
}

export default NavButton