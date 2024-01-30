import React from 'react'
import { ContentDiv } from '../styled-component/index-component/styled_index'
import Contents from '@/desktop-contents/Contents';
import Navigation from '@/components/Layout/Navigation/Navigation';
function DesktopMainPage() {
  return (
    <ContentDiv>
      <Navigation />
      <Contents />
    </ContentDiv>
  )
}

export default DesktopMainPage