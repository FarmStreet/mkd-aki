<?php

define('TOKEN_SALT', 'oirejfg089o5jrtresjoij0o9jKWESDR');
define('SECRET_KEY', 'OrpjpddTpeDl6RjhHWhR');
define('APP_ID', '7510488');

$db = new PDO('mysql:host=' . 'localhost' . ';dbname=' . 'alexaos_orenmkd', 'alexaos_orenmkd', '*kFVL3P0');

// ТИПЫ ИВЕНТОВ
// 1 - новости
// 2 - вопросы
// 3 - голосования
// 4 - работы
define('EVENT_TYPE_NEW',      1);
define('EVENT_TYPE_QUESTION', 2);
define('EVENT_TYPE_VOTING',   3);
define('EVENT_TYPE_WORK',     4);