#! /bin/bash
docker-compose up -d
(cd todo-list && ./run.sh -p)
