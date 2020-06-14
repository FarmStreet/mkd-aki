<?php


class Vote {

    public static function getList($vk_id) {
        global $db;

        $query = $db->prepare('SELECT DISTINCT users_votes.vk_id as vk_id, users_votes.vote_id as id, users_votes.is_agree as isAgree, users.name as name, votings.group_id as groupId 
FROM users_votes LEFT JOIN users ON (users.vk_id=users_votes.vk_id) LEFT JOIN votings ON (votings.id=users_votes.vote_id) 
LEFT JOIN users_groups ON (users_groups.group_id=votings.group_id) WHERE users_votes.vk_id=:vk_id OR users_groups.is_leader=1');
        $query->execute(['vk_id' => $vk_id]);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create($vk_id, $vote_id, $is_agree) {
        global $db;

        $query = $db->prepare("INSERT INTO users_votes (vk_id, vote_id, is_agree) VALUES (:vk_id, :vote_id, :is_agree)");

        return $query->execute([
            'vk_id'    => $vk_id,
            'vote_id'  => $vote_id,
            'is_agree' => $is_agree,
        ]);
    }
}