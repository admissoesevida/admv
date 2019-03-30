#!/bin/bash

read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

if [ -z "$DB_PASSWORD" ]; then
  DB_PASSWORD=$(read_var DB_PASSWORD ./api/.env)
fi

docker exec -it admv-database bash -c "MYSQL_PWD=$DB_PASSWORD mysqldump -u root --databases admv > /dump/admv.sql"