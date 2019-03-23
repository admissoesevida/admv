#!/bin/bash

docker exec -it admv-database bash -c "MYSQL_PWD=rootpassword mysqldump -u root --databases admv > /dump/admv.sql"