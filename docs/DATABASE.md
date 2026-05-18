# Tables de l'application web

```mermaid
erDiagram
    EVENT {
        uuid id PK
        string name
        date celebration_date
        uuid admin_id
        string status "draft, active, completed"
        datetime created_at
        datetime voting_starts_at
        datetime voting_ends_at
    }
    PARTICIPANT {
        uuid id PK
        uuid event_id FK
        string name
        string email
        uuid cannot_draw_id FK "Exclusion (Gagnant année precédente)"
    }
    ASSIGNMENT {
        uuid id PK
        uuid event_id FK
        uuid giver_id FK
        uuid receiver_id FK
    }
    VOTE {
        uuid id PK
        uuid event_id FK
        uuid participant_id FK
        boolean choice
        string unique_token
    }
    WISHLIST_ITEM {
        uuid id PK
        uuid participant_id FK
        string label
        string description
        string url
        boolean is_reserved
        uuid reserved_by_id FK "Lien vers le donneur qui l'a choisi"
    }

    EVENT ||--o{ PARTICIPANT : "possède"
    EVENT ||--o{ ASSIGNMENT : "génère"
    EVENT ||--o{ VOTE : "déclenche"
    PARTICIPANT ||--o| PARTICIPANT : "exclut (règle du gagnant)"
    PARTICIPANT ||--o{ WISHLIST_ITEM : "liste"
    