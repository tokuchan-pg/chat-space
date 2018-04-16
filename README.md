# サービス内容
ユーザーが任意のチャットグループを作成し、そこに他の登録ユーザーを自由に追加・削除できる。
チャット画面では、テキストと画像を投稿できる。

# 主な機能

### チャット画面でのテキスト・画像の投稿を非同期で実装
https://github.com/tokuchan-pg/chat-space/pull/22  
https://github.com/tokuchan-pg/chat-space/pull/24

### グループ作成時のメンバー選択においてインクリメンタルサーチを実装
https://github.com/tokuchan-pg/chat-space/pull/23

### チャット画面に自動更新機能を実装
https://github.com/tokuchan-pg/chat-space/pull/26

# データベース設計

### テーブルの構成

1. usersテーブル
1. messagesテーブル
1. groupsテーブル
1. group_usersテーブル（usersテーブルとgroupsテーブルの中間テーブル）

### 各テーブルのカラム構成

補足  
- MUL：重複可能な外部制約キー（indexが貼られる）  
- PRI：重複不可な外部制約キー（indexが貼られる）  
- UNI：一意性制約（indexが貼られる）  
- 自動生成されるカラムは省略  
- deviseで生成するカラムは省略  

##### usersテーブル

| Field |     Type     | Null | Key | Default | Extra |
|-------|--------------|------|-----|---------|-------|
| name  | varcher(255) | NO   | UNI | NULL    |       |
| email | varcher(255) | NO   | UNI | NULL    |       |

##### messagesテーブル

|  Field   |     Type     | Null | Key | Default |          Extra           |
|----------|--------------|------|-----|---------|--------------------------|
| body     | text         | YES  |     | NULL    |                          |
| image    | varcher(255) | YES  |     | NULL    |                          |
| group_id | int(11)      | NO   | MUL | NULL    | type references on Rails |
| user_id  | int(11)      | NO   | MUL | NULL    | type references on Rails |

##### groupsテーブル

| Field |     Type     | Null | Key | Default | Extra |
|-------|--------------|------|-----|---------|-------|
| name  | varcher(255) | NO   |     | NULL    |       |


##### group_usersテーブル（中間テーブル）

|  Field   |   Type  | Null | Key | Default |          Extra           |
|----------|---------|------|-----|---------|--------------------------|
| group_id | int(11) | NO   | MUL | NULL    | type references on Rails |
| user_id  | int(11) | NO   | MUL | NULL    | type references on Rails |
