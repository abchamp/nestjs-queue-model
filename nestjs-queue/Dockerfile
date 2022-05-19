FROM nikolaik/python-nodejs:python3.7-nodejs16
WORKDIR /usr/src/app
COPY . .
# RUN pip install -r model/requirements.txt
RUN pip install matplotlib tensorflow scipy

RUN npm install
# RUN npm install --only=production
RUN npm run build

CMD ["node", "dist/main"]

