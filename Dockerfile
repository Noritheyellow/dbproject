# 기반으로 할 이미지를 가져온다.
FROM node:carbon
# 작성자의 정보이다.
MAINTAINER Chishin Hwang "noritheyellow@gmail.com"

# app 폴더 만들기 - NodeJS 어플리케이션 폴더
# app 폴더를 Workdir로 지정 - 서버 가동용
WORKDIR /usr/src/app

# package.json과 package-lock.json이 있다면
# npm install 속도를 높여줄 것이고 버전에 적합한 module을 설치해 줄 것이다.
COPY package*.json ./

# 설치 시작
# 만약 package-lock.json을 추가했다면
# RUN npm ci --only=production으로 build 속도를 올릴 수 있다.
RUN npm install --only=production

# Copy local code to the container image
COPY . ./

# 배포버전으로 설정 - 이 설정으로 환경을 나눌 수 있다.
ENV NODE_ENV=production

# RUN the web service on container startup
CMD ["node", "app.js"]