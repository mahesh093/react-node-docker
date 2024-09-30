# react-node-docker

* clone repository from git clone https://github.com/mahesh093/react-node-docker.git
* cd react-node-docker
* Run docker compose up -d (for running all 4 container (React, Node, Mongo, Redis))
* For Stopping and removing container and images - docker-compose down --rmi all -v
* you can access the Front end on http://localhost:3001/

# Functionality
* On right side we can add name, phone and descr and click on Add data button
* Show data will show you data in json stringified format.
* For first time/new data is inserted it will fetch data from db else it fetch data from cache service
