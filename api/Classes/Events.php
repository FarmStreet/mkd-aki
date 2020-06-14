<?php


class Events {

    public static function getList($vk_id) {
        global $db;

        $query = $db->prepare('SELECT * FROM questions LEFT JOIN users_groups ON (users_groups.group_id=questions.group_id) WHERE from_id = :vk_id OR (users_groups.vk_id = :vk_id AND users_groups.is_leader = 1)');
        $query->execute(['vk_id' => $vk_id]);
        $question_list = $query->fetchAll(PDO::FETCH_ASSOC);

        $query = $db->prepare('SELECT * FROM votings LEFT JOIN users_groups ON (users_groups.group_id=votings.group_id) WHERE users_groups.vk_id = :vk_id AND users_groups.is_leader = 1');
        $query->execute(['vk_id' => $vk_id]);
        $voting_list = $query->fetchAll(PDO::FETCH_ASSOC);

        $query = $db->prepare('SELECT * FROM news LEFT JOIN users_groups ON (users_groups.group_id=news.group_id) WHERE users_groups.vk_id = :vk_id AND users_groups.is_leader = 1');
        $query->execute(['vk_id' => $vk_id]);
        $new_list = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($question_list as $k => $question) {
            $question_list[$k]['type'] = EVENT_TYPE_QUESTION;
            $question_list[$k]['id']   = $question['id'] . '-' . EVENT_TYPE_QUESTION;
        }
        foreach ($voting_list as $k =>$voting) {
            $voting_list[$k]['type'] = EVENT_TYPE_VOTING;
            $voting_list[$k]['id']   = $voting['id'] . '-' . EVENT_TYPE_VOTING;
        }
        foreach ($new_list as $k =>$new) {
            $new_list[$k]['type'] = EVENT_TYPE_NEW;
            $new_list[$k]['id']   = $new['id'] . '-' . EVENT_TYPE_NEW;
        }

        $event_list = array_merge($new_list, array_merge($voting_list, $question_list));
        usort($event_list, function($a, $b) {
            return ($a['date'] > $b['date']);
        });
        return $event_list;
    }

    public static function addVote($group_id, $name, $description) {
        global $db;

        $query = $db->prepare("INSERT INTO votings (group_id, date, name, description) VALUES (:group_id, :date, :name, :description)");
        $query->execute([
            'group_id'    => $group_id,
            'date'        => date('d.m.Y'),
            'name'        => $name,
            'description' => $description,
        ]);
        return ['id' => $db->lastInsertId(), 'date' => date('d.m.Y')];
    }

    public static function addQuestion($vk_id, $group_id, $name, $question) {
        global $db;

        $query = $db->prepare("INSERT INTO questions (from_id, group_id, date, name, question) VALUES (:vk_id, :group_id, :date, :name, :question)");
        $query->execute([
            'vk_id'    => $vk_id,
            'group_id' => $group_id,
            'date'     => date('d.m.Y'),
            'name'     => $name,
            'question' => $question,
        ]);
        return ['id' => $db->lastInsertId(), 'date' => date('d.m.Y')];
    }

    public static function addNew($group_id, $name, $message) {
        global $db;

        $query = $db->prepare("INSERT INTO news (group_id, date, name, message) VALUES (:group_id, :date, :name, :message)");
        $query->execute([
            'group_id' => $group_id,
            'date'     => date('d.m.Y'),
            'name'     => $name,
            'message'  => $message,
        ]);
        return ['id' => $db->lastInsertId(), 'date' => date('d.m.Y')];
    }

    public static function setQuestionAnswer($question_id, $answer) {
        global $db;

        $result = $db->prepare('UPDATE questions SET answer=:answer WHERE id=:id');

        return $result->execute([
            'id'     => $question_id,
            'answer' => $answer,
        ]);
    }
}