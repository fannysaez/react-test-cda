# React + TypeScript + Vite

Ce modèle fournit une configuration minimale pour faire fonctionner React avec Vite, le HMR (rechargement à chaud) et quelques règles ESLint.

Deux plugins officiels sont actuellement disponibles :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utilise [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utilise [SWC](https://swc.rs/)

## Stack technique

D'après le `package.json` du projet :

- **React** 19 + **React DOM**
- **TypeScript**
- **Vite** comme outil de build et serveur de développement
- **Bootstrap** + **React-Bootstrap** pour les composants d'interface
- **ESLint** (avec `typescript-eslint`) pour le lint

## Installation

Étapes dans l'ordre pour installer et lancer le projet en local.

### 1. Cloner le dépôt

```bash
git clone https://github.com/<votre-utilisateur>/react.git
cd react
```

### 2. Installer les dépendances

Cette commande installe tout en une fois : React, TypeScript, Vite, Bootstrap et le reste des dépendances listées dans `package.json`. Il n'y a pas de commande séparée pour installer React seul.

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application est alors disponible sur `http://localhost:5173`.

### 4. Vérifier le code avec ESLint

```bash
npm run lint
```

### 5. Construire pour la production

```bash
npm run build
```

### 6. Prévisualiser le build de production

```bash
npm run preview
```

## Compilateur React

Le compilateur React n'est pas activé sur ce modèle en raison de son impact sur les performances de développement et de build. Pour l'ajouter, consultez [cette documentation](https://react.dev/learn/react-compiler/installation).

### Comment l'activer (projet Vite)

1. Installer le plugin Babel du compilateur :

```bash
npm install -D babel-plugin-react-compiler@latest
```

2. Installer le plugin qui permet à Vite d'exécuter Babel :

```bash
npm install -D vite-plugin-babel
```

3. Mettre à jour `vite.config.ts` pour brancher le plugin :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
})
```

`eslint-plugin-react-hooks` (déjà présent dans ce projet) intègre les règles de lint du compilateur via le preset `recommended-latest` — aucune installation supplémentaire n'est nécessaire sur ce point.

**Vérifier que ça fonctionne :** ouvrir React DevTools et repérer le badge « Memo ✨ » sur les composants optimisés, ou vérifier la présence d'imports `react/compiler-runtime` dans le code compilé.

## Étendre la configuration ESLint

Si vous développez une application destinée à la production, nous recommandons de mettre à jour la configuration pour activer des règles de lint tenant compte des types :

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Autres configurations...

      // Retirez tseslint.configs.recommended et remplacez-le par ceci
      tseslint.configs.recommendedTypeChecked,
      // Sinon, utilisez ceci pour des règles plus strictes
      tseslint.configs.strictTypeChecked,
      // Facultativement, ajoutez ceci pour des règles stylistiques
      tseslint.configs.stylisticTypeChecked,

      // Autres configurations...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // Autres options...
    },
  },
])

```

Vous pouvez aussi installer [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) et [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) pour des règles de lint spécifiques à React :

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Autres configs...
      // Activer les règles de lint pour React
      reactX.configs['recommended-typescript'],
      // Activer les règles de lint pour React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // Autres options...
    },
  },
])

```
# react
