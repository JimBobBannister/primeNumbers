
Prime numbers
========================================

This project runs a Node server and a create-react-app app via two separate containers, using Docker Compose.


## Development

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, see the `docker-compose.yml` file.

The client server is started `localhost:3000` and the server as `server:8081`.


Local directories are mounted within the containers, and code changes should be seen whilst running the code. Changes to package.json will require a rebuild: `docker-compose down && docker-compose build && docker-compose up`.


#### Starting in development without Docker

Server: from the server sub-directory:

```
npm run dev
```



Client: from the client sub-directory:

```
npm run start
```

#### Adding new scss files

The `node-sass` watch feature does not notice new files. In order to get new files working, restart the client container:

```
docker-compose restart client
```

#### Acknowledgements

Special thanks to Peter Coles http://mrcoles.com/ for the foundation github docker project.




