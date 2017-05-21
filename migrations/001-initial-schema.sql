-- Up
create table Users (id integer primary key, login text unique, password text);
create table Sessions (id integer primary key, name text, created_at text, finished_at text);

-- Down
drop table Users;
drop table Sessions;