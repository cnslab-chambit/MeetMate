import React from 'react'
import {
  NavButtonDiv
} from '@/components/NavigationButton/NavigationButton.styles'
import ArrowIcon from '@/public/images/arrow.svg'
function NavigationButton({ open, setOpen }: any) {
  const onNavTogle = () => {
    open ? setOpen(false) : setOpen(true)
  }
  return (
    <NavButtonDiv onClick={onNavTogle} active={open}>
      <ArrowIcon className='arrow' />
    </NavButtonDiv>
  )
}

export default NavigationButton