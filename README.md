# Clavier Prédictif avec Modèles de Markov

## 🔍 Description

Ce projet est un **clavier prédictif en ligne de commande** utilisant des **modèles de Markov** :

- **Modèle de lettres** (ordre N) : prédit la prochaine **lettre** en fonction des lettres précédentes.
- **Modèle de mots (bigramme)** : prédit le prochain **mot** en fonction des **2 derniers mots tapés**.

L'objectif est de simuler un **clavier intelligent** capable d'assister l'utilisateur pendant la saisie.

---

## 👤 Auteur

Projet réalisé par **Baptiste Pereira et Wajdi Lassoued**.

---




## 🚀 Lancement du programme

Pour lancer le **clavier prédictif** :

```bash
node clavier_interacif.js base.txt 5
```

- **base.txt** : corpus d'apprentissage (modifiable).
- **5** : ordre du modèle de Markov pour les **lettres** (tu peux ajuster ce chiffre).
- Le lancement peux prendre quelques secondes.

---

## 🎮 Commandes du clavier

- **Tape des lettres** ➞ suggestions de **lettres** et **mots en cours**.
- **Espace** ➞ valide le mot, affiche la **phrase complète** et propose le **prochain mot** basé sur les **2 derniers mots** (bigramme).
- **Ctrl+C** ➞ quitter le programme.

---

## 📅 Exemple d'utilisation

```
Loaded models from "base.txt".
Type letters; space to validate word; Ctrl+C to exit.

b
Contexte lettres: "b" (ordre 1)
  Lettre: o (15.00%)
  Lettre: a (10.00%)

Suggestions de mots en cours :
  bon
  bien

[Après espace]

Phrase complète : "bon"
Suggestions du prochain mot (bigramme) :
  jour
  soir
```

---

## 📂 Données d’apprentissage

Le fichier **base.txt** contient les **données textuelles** utilisées pour l'apprentissage (par exemple, des dialogues).

Plus le corpus est riche et varié, plus les **suggestions seront pertinentes**.




