#元となるDockerイメージの指定
FROM node:21
WORKDIR /app
COPY ./ /app/

RUN npm install && \
    npm run build
CMD ["npm",  "run", "serve"]