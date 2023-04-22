# MeetMate: 유저간 위치기반 약속장소 선정 도움 서비스

<img src="https://user-images.githubusercontent.com/91197026/221325291-56096cd9-a768-4ad0-9447-7fcbebc9052f.png" width="200" height="200"/>

## 프로젝트 실행
   ```
      cd FrontEnd
      cd meet-mate
      npm i
      npm run dev
   ```
   
## 프로젝트 개요
### 1. 최종결과물

   - 유저간 위치를 이용하여 최적의 약속 장소를 선정해주는 웹앱 프로젝트
   - 프로젝트 아키텍처 설계도
   - 화면 설계도
   - DB ERD
   - 시연영상
   - 최종 발표자료
### 2. 주요 활동 내용 요약

   - 웹 사이트를 웹과앱 둘다 작동되게끔 구현
   - api 맵 를 이용하여 사용자 위치를 얻음
   - 사용자가 정한 약속을 db로 저장
   - aws 이용하여 최종적으로 사이트 배포
## 프로젝트 목표 및 요구사항
### 1) 약속장소를 편리하게 잡을 수 있습니다.
사는 지역이 각기 다른 사람들이 약속을 잡을 때 보통 중간 지점을 기준으로 약속을 잡는 경우가 많습니다. 이럴때 사용자가 직접 중간 지점을 찾아야 하며 잘 모르는 지역인 경우 불필요한 시간을 쓰면서 찾는 경우가 발생합니다. 이를 최소화 하기 위해 GPS를 이용하여 사용자에 위치에 대한 값을 우리들이 계산하여 중간 지점을 정해주며 그 지점 근처에 상권들을 사용자에게 제공해주게 되면 불필요한 시간을 최소화 시킬 수 있으며 직접 중간지점을 찾지 않아도 되는 편리함을 제공할 계획입니다.
### 2) 데스크탑과 모바일 환경에서 동일하게 작동하도록 할 것입니다. 
데스크탑과 모바일 환경을 나누지 않고 하나의 플랫폼으로 통일을 할 것입니다. 따로 앱을 만들지 않는 이유는 성능과 번거로움 때문입니다. 앱 특성상 웹 개발과 다른 방식으로 진행이 되며 사용자 입장에서는 앱을 깔야하는 번거로움이 존재합니다. 하지만 이를 웹으로만 개발하고 데스크탑과 모바일 환경을 둘다 지원한다면 하나의 플랫폼으로 동일한 컨텐츠를 사용할 수 있기 때문에 데스크탑과 모바일 환경 둘다 지원이 되도록 제작할 것입니다.
### 3) api 공개 활용 능력과 웹 개발과 프로그래밍 실력을 향상시킵니다. 
api 공개 내부를 들여다 보며 이를 재가공하는 과정들을 통해 api 사용 방법에 대한 지식과 구조를 학습할 수 있습니다. 웹 next.js spring 개발은 와 이라는 라이브러리를 학습하기 이전에 javascript와 java 라는 언어를 학습하는 과정이 필요하기에 기본적인 언어에 대한 학습을 해야합니다. 그렇기에 프로젝트를 진행하면서 자연스럽게 웹 개발에 필요한 지식과 프로그래밍 실력을 동시에 향상 시킬 수 니습니다.
## 예상 시스템 개요도
![image](https://user-images.githubusercontent.com/91197026/222876640-7233898d-b072-4278-840b-4dc42289b505.png)

## To-do List

## 일정(계획)
 - 0~1주차 - 피그마를 이용하여 와이어프레임 제작
 - 1~2주차 - 프로젝트 아키텍쳐 설계
 - 2~3주차 - 웹 화면 설계서 작
 - 3~7주차 - 사이트를 구성하는 필요한 기술들을 세팅하며 디자인 설계에서 작성된 와이어프레임을 구현(프론트엔드),<br/>
     사이트에 필요한 db모델과 환경 세팅(백엔드)

 - 7~8주차 - 중간보고서 및 성찰일지 자기평가 제출
 - 9~12주차 - 사이트에서 필요한 맵 api를 이용하여 사용자의 gps를 이용하여 메인 기능 구현(프론트엔드),<br/>
     사용자의 db와 위치에 따른 정보를 설계하여 프론트엔드로 보내주는 작업(백엔드)
 - 12~14주차 - 배포하는 작업을 통해 서로 발생하는 문제들을 해결하여 성공적으로 배포하는 작업(프론트 & 백)
 - 14~15주차 - 마무리

## 디자인(예상)

 ### Web
   - 메인화면(약속잡기)
   <img src="https://user-images.githubusercontent.com/91197026/224541331-923e58c5-2d70-41c9-9dc7-b0de151a35bb.png" width="600" height="400"/>  
   <img src="https://user-images.githubusercontent.com/91197026/224541315-2035dc61-031d-4a9e-99e4-2125fad53af5.png" width="600" height="400"/>
   <img src="https://user-images.githubusercontent.com/91197026/224541298-860c826b-4cf5-4225-99aa-0f8d0ba8e8b2.png" width="600" height="400"/>
   
   - 길찾기
   <img src="https://user-images.githubusercontent.com/91197026/224541286-b5d3fb40-8eae-4cf5-bc67-5c548d5249ca.png" width="600" height="400"/>
   <img src="https://user-images.githubusercontent.com/91197026/224541262-686c5768-3334-498c-8e3e-5f0158885253.png" width="600" height="400"/>
   
   - 버스
   <img src="https://user-images.githubusercontent.com/91197026/224541533-6dea1e91-44fa-420d-8bd0-40033cfa4009.png" width="600" height="400"/>  
   <img src="https://user-images.githubusercontent.com/91197026/224541315-2035dc61-031d-4a9e-99e4-2125fad53af5.png" width="600" height="400"/>
   <img src="https://user-images.githubusercontent.com/91197026/224541541-54ef8cc7-07fc-4b64-bced-6eceb6eb6ab7.png" width="600" height="400"/>
   
   - 지하철
   <img src="https://user-images.githubusercontent.com/91197026/224541595-fb5d4543-0cff-4f0d-9f56-897dd40ca690.png" width="600" height="400"/>
   

 ### App
   <img src="https://user-images.githubusercontent.com/91197026/222876592-955eb8aa-c797-49ac-991d-b4eff8a2508f.png" width="200" height="400"/>
   
   - 약속잡기
   <img src="https://user-images.githubusercontent.com/55770796/233769722-32b0dba7-18e1-4eff-9db2-90cdcdfd9653.png" width="200" height="400">

   
   - 길찾기
   <img src="https://user-images.githubusercontent.com/55770796/233769730-ea795a19-29cf-4a22-9343-e801214fcbe9.png" width="200" height="400">
   <img src="https://user-images.githubusercontent.com/55770796/233769768-1c82abc2-4204-4c06-824e-ba5912f868ee.png" width="200" height="400">

   
   - 버스
   <img src="https://user-images.githubusercontent.com/55770796/233769755-a3c983a0-27c2-4202-a1ae-338357d631d4.png" width="200" height="400">

   - 지하철
   <img src="https://user-images.githubusercontent.com/55770796/233769397-72a5a4c7-06b4-4627-9af8-1a763d1a9708.png"
   width="200" height="400">
   
   <img src="https://user-images.githubusercontent.com/55770796/233769399-5987b4fa-136a-4e8a-a86f-ebf4edcfdfe6.png"
    width="200" height="400">


## 팀원
- [최원석](https://github.com/c0c0pang)
- [신권일](https://github.com/shin5774)
- [정준형](https://github.com/jungjunhyung99)
- [이영원](https://github.com/dlduddnjs198)
