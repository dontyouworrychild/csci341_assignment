FROM node:alpine
WORKDIR /assignment_2
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]