FROM node:current-alpine as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM node:current-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
RUN npm install --only=production
EXPOSE 8080
CMD ["node", "/app/dist/index.js"]
