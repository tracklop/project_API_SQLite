# Tuto

## À faire obligatoirement

```sh
# Aller dans le dossier app/
cd app/
```

```sh
# Installer les packages et les dépendances
npm i
```

```sh
# Initialiser l'ORM sequelize

⚠️ # NE PAS FAIRE SI LES DOSSIERS SUIVANTS SONT DÉJÀ EXISTANTS :
# - /config/config.js
# - /migrations
# - /seeders
# - /models

npx sequelize-cli init
```

```sh
# Créer les tables de la base de données SQLite (exécuter les migrations)
npx sequelize-cli db:migrate
```

```sh
# Insérer les fausses données dans les tables (exécuter les seeders)
npx sequelize-cli db:seed:all
```

## Rappel des autres commandes importantes

```sh
# Créer une table de la base de données SQLite (exécuter une migration)
npx sequelize-cli db:migrate --name <file_name>
```

```sh
# Annuler toutes le migrations
npx sequelize-cli db:migrate:undo:all
```

```sh
# Annuler une migration
npx sequelize-cli db:migrate:undo --name <file_name>
```

```sh
# Insérer les fausses données dans une table (exécuter un seeder)
npx sequelize-cli db:seed --seed <file_name>
```

```sh
# Créer un nouveau model
# (--attributes <exemples> | inutile de mettre l'id |)
npx sequelize-cli model:generate --name <file_name> --attributes name:string,mail:string,password:string
```

```sh
# Créer un nouveau seed
#(⚠️: les seeds sont exécuter par autre alphanumérique. À prendre en compte lors de l'exécution de tous les seeds pour les clé étrangères)
npx sequelize-cli seed:generate --name <file_name>
```
