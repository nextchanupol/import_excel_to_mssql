# Pull mssql image

[mssql image](https://hub.docker.com/_/microsoft-mssql-server)
or
docker pull mcr.microsoft.com/azure-sql-edge

## run container (persist data)

### with docker volume (prefer)

docker run --rm --name mssql-test -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=yourpassword' -p 1433:1433 -v mssqlvolum:/var/opt/mssql -d mcr.microsoft.com/mssql/server

docker run --rm --name mssql-test --cap-add SYS_PTRACE -e 'TZ=Asia/Bangkok' -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=yourpassword' -p 1433:1433  -v mssqlvolum:/var/opt/mssql -d mcr.microsoft.com/azure-sql-edge

## exec

docker exec -it mssql-test /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yourpassword
