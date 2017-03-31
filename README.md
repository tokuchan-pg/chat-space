# chatspaceデータベース設計

### テーブルの構成

1. usersテーブル
1. messagesテーブル
1. groupsテーブル
1. joinsテーブル（usersテーブルとgroupsテーブルの中間テーブル）

### 各テーブルのカラム構成

補足  
- MUL：重複可能な外部制約キー（indexが貼られる）  
- PRI：重複不可な外部制約キー（indexが貼られる）  
- 自動生成されるカラムは省略  
- deviseで生成するカラムは省略  

##### usersテーブル

| Field |     Type     | Null | Key | Default | Extra |
|-------|--------------|------|-----|---------|-------|
| name  | varcher(255) | NO   | UNI | NULL    |       |
| email | varcher(255) | NO   | UNI | NULL    |       |

##### messagesテーブル

|  Field   |     Type     | Null | Key | Default | Extra |
|----------|--------------|------|-----|---------|-------|
| body     | text         | YES  |     | NULL    |       |
| image    | varcher(255) | YES  |     | NULL    |       |
| group_id | int(11)      | NO   | MUL | NULL    |       |
| user_id  | int(11)      | NO   | MUL | NULL    |       |

##### groupsテーブル

| Field |     Type     | Null | Key | Default | Extra |
|-------|--------------|------|-----|---------|-------|
| name  | varcher(255) | NO   |     | NULL    |       |


##### joinsテーブル（中間テーブル）

|  Field   |   Type  | Null | Key | Default | Extra |
|----------|---------|------|-----|---------|-------|
| group_id | int(11) | NO   | MUL | NULL    |       |
| user_id  | int(11) | NO   | MUL | NULL    |       |
