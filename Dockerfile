FROM node:23.11.0-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
  build-essential \
  openssl \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; fi

RUN npm run generate

EXPOSE 3000

CMD ["npm", "start"]