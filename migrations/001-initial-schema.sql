-- Up
create table Users (id integer primary key, login text unique, password text);

-- Down
drop table Users;