FROM node:20-alpine3.19 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm install --registry=https://registry.npmmirror.com

COPY . .

RUN pnpm dlx prisma generate && pnpm run build

FROM node:20-alpine3.19

WORKDIR /app

COPY --from=builder /app /app

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
