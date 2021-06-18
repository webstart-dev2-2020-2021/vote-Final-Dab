# Votes back et front

Pour le samedi 19/06 à 20h00, déposer sur GitHub Classroom votre travail après avoir accepté cette mission : [https://classroom.github.com/a/I7pI9zk5](https://classroom.github.com/a/I7pI9zk5).

Votre projet doit contenir deux dossiers :

1. le dossier `back/` dans lequel est l’API,
1. le dossier `front/` dans lequel est votre front.

L’API sera lancée sur `http://localhost:3000/` et le _front_, lancé sur `http://localhost:3001/` consommera cette API sur `http://localhost:3000/`

Merci de m’indiquer dans un `README.md` les commandes à lancer pour le _front_.

Vous pouvez utiliser l’API disponible sur GitHub : [https://github.com/centvingt/votes-nodejs-mongodb](https://github.com/centvingt/votes-nodejs-mongodb). Dans ce cas :

1. remplacer `MONGODB_CONNECTION` par votre connexion à MongoDB ligne 19 de `/back/api.js`,
1. remplacer `EMAIL` et `EMAIL_PASSWORD` par vos identifiants Gmail lignes 33 et 34 de `/back/controllers/auth.js/`.
