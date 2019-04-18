# Grenage - Server

This is the repository for the Grenage server.

## Setup

1. Install [Docker][docker]
1. Install Yarn dependencies

    ```
    yarn install
    ```

1. Spin up the containers

    ```
    yarn start-containers
    ```

**NOTE**: The `yarn start-containers` script will spin up the database containers in daemon mode. If you want to take them down, you'll need to run `docker-compose down`.




[docker]: https://www.docker.com/get-started
