FROM bamos/openface
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -; apt-get install -y nodejs
CMD ["node", "/host/Users/uladzimir/projects/wth/server/index.js"]