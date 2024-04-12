#元となるDockerイメージの指定
FROM node:21

COPY ./ ./
RUN npm install && \
    npm run build
CMD ["npm",  "start"]