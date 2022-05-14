FROM nikolaik/python-nodejs:python3.7-nodejs16
WORKDIR /usr/src/app
COPY . .
# RUN pip install -r model/requirements.txt
RUN pip install pandas
RUN pip install matplotlib
RUN pip install --upgrade tensorflow

RUN npm install --only=development
RUN npm run build

CMD ["node", "dist/main"]

