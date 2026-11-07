# Mon Vieux Grimoire

Application web de notation de livres : les utilisateurs créent un compte, ajoutent des livres avec une couverture, les notent et consultent les mieux notés.

Le projet est composé de deux applications séparées :

- `src/` : frontend React (React Router, React Hook Form, Axios)
- `backend/` : API REST Node.js / Express, base de données MongoDB (Mongoose), stockage des images sur Cloudinary

## Prérequis

- Node 19 (version avec laquelle le projet a été testé)
- Une base MongoDB (locale ou [MongoDB Atlas](https://www.mongodb.com/atlas))
- Un compte [Cloudinary](https://cloudinary.com/) (stockage des couvertures de livres)

## Installation

Le frontend et le backend ont chacun leur propre `package.json` et doivent être installés séparément.

```bash
# Frontend (à la racine du projet)
npm install

# Backend
cd backend
npm install
```

## Configuration du backend

Dans le dossier `backend/`, créez un fichier `.env` à partir de `.env.example` :

```bash
cd backend
cp .env.example .env
```

Puis renseignez les variables suivantes :

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | Chaîne de connexion à votre base MongoDB |
| `CLOUDINARY_CLOUD_NAME` | Nom de votre cloud Cloudinary |
| `CLOUDINARY_API_KEY` | Clé API Cloudinary |
| `CLOUDINARY_API_SECRET` | Secret API Cloudinary |
| `JWT_SECRET` | Chaîne aléatoire longue utilisée pour signer les tokens d'authentification (ex. générée avec `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`) |
| `PORT` | *(optionnel)* Port d'écoute du serveur, `4000` par défaut |

Le fichier `.env` n'est jamais versionné (voir `backend/.gitignore`).

## Lancer le projet en développement

```bash
# Backend (démarre sur http://localhost:4000, redémarre automatiquement grâce à nodemon)
cd backend
npm run dev

# Frontend, dans un autre terminal (démarre sur http://localhost:3000)
npm start
```

⚠️ Le frontend pointe par défaut vers l'API déployée en production (`API_URL` dans [src/utils/constants.js](src/utils/constants.js)), et non vers le backend local. Pour tester contre votre backend local, modifiez temporairement cette constante en `http://localhost:4000`.

## Build de production

```bash
npm run build
```

Génère le frontend statique dans le dossier `build/`.

## Déploiement

- Frontend : [Netlify](https://mon-vieux-grimoire-yd.netlify.app)
- Backend : [Railway](https://monvieuxgrimoire-production-9a65.up.railway.app)

Les origines autorisées en CORS sont définies dans [backend/app.js](backend/app.js).
