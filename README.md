
# 🚩MeetMate: 유저간 위치기반 약속장소 선정 도움 서비스

<img src="https://user-images.githubusercontent.com/91197026/221325291-56096cd9-a768-4ad0-9447-7fcbebc9052f.png" width="200" height="200"/>

Meet Mate는 **유저간 위치를 이용하여 최적의 약속 장소를 선정해주는 웹앱 프로젝트**입니다.
주요 기능은 다음과 같습니다.
   - 유저들의 위치 기반으로 중심 지역을 정해줍니다.
   - 정해진 중심 지역 주변에 여러 이용 가능한 시설들을 보여줍니다.
   - 유저들의 위치부터 약속 장소까지 대중교통 정보를 보여줍니다.

## 목차

   - [프로젝트 실행](#프로젝트-실행)
   - [프로젝트 개요](#프로젝트-개요)
   - [시스템 아키텍처](#시스템-아키텍처)
   - [시연영상 Web버전](#시연영상-Web버전)
   - [시연영상 Mobile버전](#시연영상-Mobile버전)
   - [팀원 소개](#팀원-소개)

## 프로젝트 실행
   ```
      npm i
      npm run dev
   ```
   
## 프로젝트 개요
### 1. 최종결과물
   - 프로젝트 아키텍처 설계도
   - 시연영상
### 2. 주요 활동 내용 요약
   - 데스크톱과 모바일 모두 작동이 가능 하도록 구현
   - api 맵 를 이용하여 사용자 위치를 얻음
   - 사용자가 정한 약속을 db로 저장
## 프로젝트 목표 및 요구사항
### 1) 약속장소를 편리하게 잡을 수 있습니다.
사는 지역이 각기 다른 사람들이 약속을 잡을 때 보통 중간 지점을 기준으로 약속을 잡는 경우가 많습니다. 이럴때 사용자가 직접 중간 지점을 찾아야 하며 잘 모르는 지역인 경우 불필요한 시간을 쓰면서 찾는 경우가 발생합니다. 이를 최소화 하기 위해 GPS를 이용하여 사용자에 위치에 대한 값을 우리들이 계산하여 중간 지점을 정해주며 그 지점 근처에 상권들을 사용자에게 제공해주게 되면 불필요한 시간을 최소화 시킬 수 있으며 직접 중간지점을 찾지 않아도 되는 편리함을 제공할 계획입니다.
### 2) 데스크탑과 모바일 환경에서 동일하게 작동하도록 할 것입니다. 
데스크탑과 모바일 환경을 나누지 않고 하나의 플랫폼으로 통일을 할 것입니다. 따로 앱을 만들지 않는 이유는 성능과 번거로움 때문입니다. 앱 특성상 웹 개발과 다른 방식으로 진행이 되며 사용자 입장에서는 앱을 깔야하는 번거로움이 존재합니다. 하지만 이를 웹으로만 개발하고 데스크탑과 모바일 환경을 둘다 지원한다면 하나의 플랫폼으로 동일한 컨텐츠를 사용할 수 있기 때문에 데스크탑과 모바일 환경 둘다 지원이 되도록 제작할 것입니다.
### 3) api 공개 활용 능력과 웹 개발과 프로그래밍 실력을 향상시킵니다. 
api 공개 내부를 들여다 보며 이를 재가공하는 과정들을 통해 api 사용 방법에 대한 지식과 구조를 학습할 수 있습니다. 웹 next.js spring 개발은 와 이라는 라이브러리를 학습하기 이전에 javascript와 java 라는 언어를 학습하는 과정이 필요하기에 기본적인 언어에 대한 학습을 해야합니다. 그렇기에 프로젝트를 진행하면서 자연스럽게 웹 개발에 필요한 지식과 프로그래밍 실력을 동시에 향상 시킬 수 있습니다.

## 시스템 아키텍처
![image](https://user-images.githubusercontent.com/91197026/222876640-7233898d-b072-4278-840b-4dc42289b505.png)


## 시연영상 Web버전
 
### 지도 검색


https://github.com/cnslab-chambit/MeetMate/assets/55770796/b0df0e14-81f8-4441-93d4-002e5ea432c6



### 메인화면(약속잡기)


https://github.com/cnslab-chambit/MeetMate/assets/55770796/ac8075f0-67af-4d4e-882e-7eda7b983e24

https://github.com/cnslab-chambit/MeetMate/assets/55770796/90ed7ec1-ba22-4d68-9ce5-7e863a7644fc


### 길찾기


https://github.com/cnslab-chambit/MeetMate/assets/55770796/37ef9b7a-9771-4e53-bcc8-bd67e2187a44

### 버스
     

https://github.com/cnslab-chambit/MeetMate/assets/55770796/f9e943bf-ff36-4528-af65-dca41528bade
   
## 시연영상 Mobile버전

### 1) 홈
| 지도 검색 | 약속 잡기|
| ------ | ------ | 
| ![지도 검색](https://github.com/cnslab-chambit/MeetMate/assets/55770796/5b04d2f0-85ad-4492-a43e-c9daff54f6cb0) | ![약속 잡기](https://github.com/cnslab-chambit/MeetMate/assets/55770796/2075b0e6-0c8c-4e1c-8cc9-cc3eb86da0c5) |

| 길 찾기 | 버스 | 지하철 |
|-------|------|---------|
| ![길 찾기](https://github.com/cnslab-chambit/MeetMate/assets/55770796/e6067c86-d538-4b3b-9e2e-efbc26294cfa) | ![버스](https://github.com/cnslab-chambit/MeetMate/assets/55770796/e6e12abf-aed8-4e1e-bd97-073a9cb1c419) | ![지하철](https://github.com/cnslab-chambit/MeetMate/assets/55770796/c4542498-7a34-4d54-a73f-b7851c1b484c) |

   

## 팀원 소개
- [최원석](https://github.com/c0c0pang)
- [신권일](https://github.com/shin5774)
- [정준형](https://github.com/jungjunhyung99)
- [이영원](https://github.com/dlduddnjs198)
