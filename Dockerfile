FROM node:20-alpine3.19 AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile && \
    pnpm install --registry=https://registry.npmmirror.com

COPY . .

RUN pnpm dlx prisma generate && pnpm run build

FROM node:20-alpine3.19

WORKDIR /app

COPY --from=builder /app /app

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
