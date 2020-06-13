<?php


class Users {

    public static function get($vk_id) {
        global $db;

        $query = $db->prepare('SELECT * FROM users WHERE vk_id=:vk_id');
        $query->execute(['vk_id' => $vk_id]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($vk_id, $name) {
        global $db;

        $query = $db->prepare("INSERT INTO users (vk_id, name) VALUES (:vk_id, :name)");

        return $query->execute(['vk_id' => $vk_id, 'name' => $name]);
    }
}