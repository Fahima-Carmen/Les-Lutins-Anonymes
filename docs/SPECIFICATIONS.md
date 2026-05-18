Contient les idées d'analyse

Web app:accessible via un url
Mobile first: UI téléphone puis étandre à l'ordinateur
Deploiement: Vercel ou Netlify


# Exigences Fonctionnelles
- Module Admin: création d'un événement, ajout/suppression de participants (Email+Nom), déclanchement du tirage.
- Module Tirage: Algorithme avec contraintes d'exclusion (ex. un autre particiapant).
- Module Notification: Envoi automatique des résultats par couriel (intégration API comme Resend ou SendGrid), vérification de la validité de l'adresse courriel.
- Module Vote: Système de vote majoritaire pour révéler les résultats avant la date prévue (gestion des jetons de vote uniques).
- Module Gamification: Suivi du "Gagnant"de l'année N pour appliquer une contrainte d'exclusion personnalisés à l'année N+1.

# Règles Métiers
- Un particiapant ne peut pas se piocher lui-même
- Le tirage ne peut être lancé que si le nombre de participants est >= 3.
- La majorité absolue (>50%) est requise pour l'affichage anticipé.

# User Flows
### Flux 1: Création d'un événement (l'admin)
1. L'Admin arrive sur la page d'acceuil et clique sur "Créer un Secret Santa".
2. Son nom et son courriel sont automatiquement entrés. Il entre le nom de l'evénement et la date de la fête.
3. Le système redirige l'Admin immédiatement vers [https://secret-santa.app/admin/](https://secret-santa.app/admin/)[UUID]. Le lien lui ait automatiquement envoyer par email.
   Evite de créer un compte avec mdp et email.  Exemple d'URL: https://lutins-anonymes.app/admin/a1b2-c3d4-e5f6
   La partie a1b2-c3d4-e5f6 est l'ID unique (UUID) que nous avons mis dans ta table `EVENT`. Si quelqu'un n'a pas ce lien exact, il ne peut pas accéder à la gestion du groupe.
4. L'Admin ajoute les participants par un nom et un courriel. Il peut ajouter des participants tant que le tirage n'a pas encore été lancé.
5. L'Admin clique sur "Lancer le tirage".
6. Le système vérifie qu'il y a plus de 3 personnes, effectue l'algorithme de tirage, sauvegarde les `Assignments` et envoie les courriels.

### Flux 2: Réception (Le Particiapant)
1. Le participant reçoit le courriel contenant la personne assigner. 
2. Il clique sur le bouton "Decouvrir" qui va le rediriger vers l'url d'une page contenant le nom de la personne assigner ainsi que sa wishlist.
3. Le participant peut voir les details de chaque cadeau et le lien vers l'acheteur.
4. Il choisit quelle cadeau il va offir puis confirme son choix. Il peut changer de choix.
5. Une fois le cadeau choisit, le système le marque comme 'offert' et le rend inacessible.

### Flux 3: Liste des souhaits (le particiapant)
La liste des souhaits est spécifique à l'évènement en cours pour garantir la simplicité d'accès sans compte global.
Utilisation du `LocalStorage`: l'application enregistre les derniers souhaits tapés dans le navigateur de l'utilisateur (via le localStorage). Comme ça, s'il rejoint un autre événement sur le même téléphone, ses souhaits réapparaissent comme par magie sans qu'il ait besoin d'un compte global

1. Dans le courriel recu, le participant clique sur "Ma liste de souhaits".
2. Il ajoute un élément dans sa wishlist en cliquant sur "Ajouter". Il fournit un nom, l'url du cadeau (pas obligatoire) et une description.
3. Il peut modifier et supprimer son item via des boutons respectifs.

### Flux 4: Le Vote
1. Déclenchement : L'Admin lance le vote. Le système enregistre l'heure de fin (created_at + 48h).

2. Participation : Les membres votent via un lien sécurisé.

3. Calcul du résultat :

    - Cas A (Unanimité) : Si tous les participants ont voté avant les 48h, le système traite le résultat immédiatement.

    - Cas B (Échéance) : Passé le délai de 48h, le système compte les voix exprimées. Si le "OUI" l'emporte parmi les votants, les résultats sont envoyés.

4. Notification finale : Un courriel de clôture du vote est envoyé à tous (soit avec les résultats, soit confirmant le maintien de la date initiale).


# Stack
La stack pour ce projet a été choisie pour leur scalabilité et leur coût nul.

1. Langage clé: TypeScript
    - Apporte du typage statique
    - Détecter les erreurs avant le lancer l'application
  
2. Front-End
   - Next.js (React Framework): gère le rendu des pages, la navigation, API Routes
   - Tailwind CSS: pour le design, plutôto qu'un long fichier CSS. On utilise les classes directement dans le HTML.
   - Shadcn/UI : Une bibliothèque de composants (boutons, formulaires, cartes) pour avoir un rendu professionnel sans passer des heures sur le design pur.

3. Back-ENd & Infrastructure
 - SQL (PostgreSQL): creer et interroger les tables.
 - Supabase Auth: pour gérer les accès sécurisés et les "liens magiques"

4. Outils de communications et de validation
   - Resend / SendGrid : Pour l'envoi de courriels (via une API en TypeScript).
   - Zod : Une bibliothèque de validation de schéma. C'est l'outil parfait pour s'assurer que les données qui entrent dans ta base (comme les courriels des participants) sont au bon format.
   - Git / GitHub : Pour le versionnage et la gestion de projet (Kanban)
5. Deploiement
   -  Vercel: Gratuit pour les projets personnels avec un sous-domaine .vercel.app

## A voir
Soit l'admin remplit le formulaire la première fois (et le système s'en souvient via un cookie pour les prochaines fois), soit tu utilises un bouton "Se connecter avec Google" qui récupère ces infos sans créer de compte complexe. C'est un détail à garder en tête pour l'implémentation.