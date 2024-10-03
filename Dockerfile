# FROM node:20 as deps
# WORKDIR /app

# COPY .yarnrc.yml .nvmrc  package.json yarn.lock* package-lock.json* ./
# COPY .yarn  .yarn 

# RUN yarn install


# FROM node:20 AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules /app/node_modules
# COPY . .


# RUN yarn build

# # Production image, copy all the files and run next
# FROM node:20-alpine AS runner
# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# USER nextjs

# EXPOSE 3030

# ENV PORT 3030

# CMD ["node", "server.js"]