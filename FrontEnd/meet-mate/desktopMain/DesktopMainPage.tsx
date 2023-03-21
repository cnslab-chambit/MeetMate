import React from 'react'
import { ContentDiv } from '../styled-component/index-component/styled_index'
import Contents from '@/desktop-contents/Contents';
import Nav from '@/desktopNav/Nav';
function DesktopMainPage() {
  return (
    <ContentDiv>
      <Nav />
      <Contents />
    </ContentDiv>
  )
}

export default DesktopMainPage