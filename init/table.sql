-- 操作表
create table action_tb
(
    id          integer not null primary key autoincrement,
    keyword     text    not null unique,
    operation   text    not null,
    create_date integer not null default (strftime('%s', 'now')),
    update_date integer not null default (strftime('%s', 'now'))
);

-- 权限表
create table power_tb
(
    id          integer not null primary key autoincrement,
    user_id     text    not null,
    action_id   integer not null,
    create_date integer not null default (strftime('%s', 'now')),
    update_date integer not null default (strftime('%s', 'now')),
    foreign key (action_id) references action_tb (id)
);

-- 关键字表 用户提问时附带的关键字（value）可能不统一 统一修改为（name）变为统一
create table keyword_tb
(
    id          integer not null primary key autoincrement,
    name        text    not null,
    value       text    not null unique,
    create_date integer not null default (strftime('%s', 'now')),
    update_date integer not null default (strftime('%s', 'now'))
);
