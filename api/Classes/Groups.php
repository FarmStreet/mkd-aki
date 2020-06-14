<?php


class Groups {

    public static function getList($vk_id) {
        global $db;

        $query = $db->prepare('SELECT groups.id as id, groups.name as name, users_groups.is_leader as isLeader FROM groups LEFT JOIN users_groups ON (groups.id=users_groups.group_id) WHERE users_groups.vk_id=:vk_id');
        $query->execute(['vk_id' => $vk_id]);
        $group_list = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($group_list as $k => $group) {

            $query = $db->prepare('SELECT count(vk_id) as count FROM users_groups WHERE group_id=:group_id');
            $query->execute(['group_id' => $group['id']]);
            $count = $query->fetch(PDO::FETCH_ASSOC);

            $group_list[$k]['count'] = $count['count'];
        }

        return $group_list;
    }

    public static function create($vk_id, $name, $members) {
        global $db;

        $query = $db->prepare("INSERT INTO groups (name) VALUES (:name)");
        $query->execute(['name' => $name]);
        $group_id = $db->lastInsertId();

        $query = $db->prepare("INSERT INTO users_groups (vk_id, group_id, is_leader) VALUES (:vk_id, :group_id, 1)");
        $query->execute(['vk_id' => $vk_id, 'group_id' => $group_id]);

        foreach ($members as $member) {
            $query = $db->prepare("INSERT INTO users_groups (vk_id, group_id, is_leader) VALUES (:vk_id, :group_id, 0)");
            $query->execute(['vk_id' => $member, 'group_id' => $group_id]);
        }

        return $group_id;
    }
}