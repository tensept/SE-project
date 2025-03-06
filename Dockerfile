FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to take advantage of Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

# Expose the port the app runs on
ENV NEXT_PUBLIC_BACK_END=https://clinic.se.eng.cmu.ac.th/diary/api

EXPOSE 3005

# Run the application
CMD ["npx", "next", "start", "-p", "3005"]
