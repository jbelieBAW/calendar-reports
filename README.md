# K2 Calendar component

Calendrier intégrable dans un formulaire / vue K2 basé sur le composant ReactJS Big-Calendar.

## Fonctionnement

Création d'un composant ReactJS qui sera intégré dans un formulaire / vue K2. La vue K2 contiendra 3 éléments :
1. Un **Data Label** chargé de contenir la balise **<script>** déclenchant l'intégration du composant ReactJS.
2. Un **Data Label** chargé d'être le point d'intégration du composant dans le DOM.
3. Un SmartObject représenté sous forme de liste des données lues par le composant ReactJS (id, date de début, date de fin, titre, description). La liste de données est cachée.
    
![image](https://user-images.githubusercontent.com/63305468/143033454-6c2584db-fba5-4256-bb84-d61cc32c20c8.png)
    
![image](https://user-images.githubusercontent.com/63305468/143033600-c790b82d-2ba2-412d-9e74-cfc55c56fbe2.png)

## Développement local
    
Dépendances npm à installer dans le répertoire du projet :
* npm i --save react react-dom
* npm i --save webpack
* npm i --save webpack-cli
* npm i --save webpack-manifest-plugin
* npm i --sace webpack-dev-server
* npm i --save babel-loader babel-preset-env
* npm i --save babel-loader babel-preset-react
* npm i --save @babel/preset-react
* npm i --save css-loader
* npm i --save react-big-calendar
* npm i --save moment
* npm i --save jquery
  
Dans le répertoire du projet lancer la commande :

### `npm start`

Consulter avec un navigateur la page : [http://localhost:9000](http://localhost:9000).

![image](https://user-images.githubusercontent.com/63305468/143037665-d53a9129-4f48-490f-aa12-ac3907f37d3a.png)
    
## Construction bundle

Dans le répertoire du projet lancer la commande :

### `npm run build`

Après publication des modifications (sur un dépôt GitHub ou autre), récupérer le lien permettant d'accéder au fichier **bundle.js**. Pour cela il est possible d'utiliser le service **JsDelivr** (https://www.jsdelivr.com/github).

## Intégration K2

L'intégraiton est basée sur la méthode suivante : https://dudelisdev.com/2019/03/reactjs-k2-masonry.html

1. Ajouter dans le formulaire / vue K2 un objet **Data Label** pour accueillir le script **bundle.js**
    1.   Mettre un nom (react-control-js par exemple).
    2.   Cocher la case **Literal**
    3.   Décocher la case **Prevent XSS**
    4.   Ajouter une expression qui contiendra la balise : **<script src=URL_bundle.js></script>** avec URL_bundle.js ayant pour valeur l'URL récupérée après l'étape de publication.

![image](https://user-images.githubusercontent.com/63305468/142991191-9b94f098-f222-4789-850e-e0730d4ac41f.png)

![image](https://user-images.githubusercontent.com/63305468/142991267-5db17064-2af9-420d-862b-017381989cb4.png)

2. Ajouter dans le formulaire / vue K2 un objet **Data Label** servant de point d'injection dans le DOM de l'application ReactJS.
   1 . Mettre un nom qui pourra être intégré dans le fichier index.js (react-control-root par exemple).

![image](https://user-images.githubusercontent.com/63305468/142991760-a39b63b4-8773-41cd-bf1b-cb802d2530c7.png)
