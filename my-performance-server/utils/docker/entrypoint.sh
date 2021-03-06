#!/bin/sh

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
function file_env() {
  local var="$1"
  local def="${2:-}"
  local fileVar="${var}_FILE"
  local fileVal=`eval echo \$"${fileVar}"`
  local val=`eval echo \$"${var}"`
  if [ -n "$val" ] && [ -n "$fileVal" ]; then
    echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
    exit 1
  elif [ -f "$fileVal" ]; then
    val=`cat $fileVal`
  elif [ -z "$val" ]; then
    val="$def"
  fi
  export "$var"="$val"
}

file_env TYPEORM_PASSWORD

# Add npm bin directory to PATH in order to run wait4mysql
PATH=$(npm bin):$PATH

wait-for-postgres --username=${TYPEORM_USERNAME} --password=${TYPEORM_PASSWORD} -h ${TYPEORM_HOST} -D ${TYPEORM_DATABASE}

if [ "$RUN_FIXTURES" = "1" ]; then
  exec yarn run run-fixtures "$@"
fi

yarn run run-migrations:prod

exec node -r dotenv-flow/config build/src/index.js "$@"
