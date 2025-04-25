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
- **5** : ordre du modèle de Markov pour les **lettres** (1-10).
- Le lancement peux prendre quelques secondes.

---

## 🎮 Commandes du clavier

- **Tape des lettres** ➞ suggestions de **lettres** et **mots en cours**.
- **Espace** ➞ valide le mot, affiche la **phrase complète** et propose le **prochain mot** basé sur les **2 derniers mots** (bigramme).
- **Ctrl+C** ➞ quitter le programme.

---

## 📅 Exemple d'utilisation

```
Modèles chargés depuis "base.txt".
Tapez des lettres ; espace pour valider le mot ; Ctrl+C pour quitter.

Contexte lettres: "j" (ordre 1)
  Lettre: e (58.48%)
  Lettre: ' (19.41%)
  Lettre: o (11.78%)
  Lettre: u (4.97%)
  Lettre: a (3.58%)
Suggestions de mots en cours :
  je
  joey
  j

Contexte lettres: "je" (ordre 2)
  Lettre:   (94.71%)
  Lettre: t (2.41%)
  Lettre: u (2.03%)
 (0.40%):
  Lettre: a (0.24%)
Suggestions de mots en cours :
  je
  jen
  jeunes

Phrase complète : "je"
Pas de suggestion pour ce contexte.

Contexte lettres: "s" (ordre 1)
  Lettre:   (41.94%)
  Lettre: t (11.02%)
 (9.64%):
  Lettre: e (8.46%)
  Lettre: o (5.17%)
Suggestions de mots en cours :
  scone
  super
  sympa

Contexte lettres: "su" (ordre 2)
  Lettre: i (48.28%)
  Lettre: r (23.35%)
  Lettre: p (18.58%)
  Lettre: s (2.37%)
  Lettre: f (1.86%)
Suggestions de mots en cours :
  super
  suis
  suggérer

Contexte lettres: "sui" (ordre 3)
  Lettre: s (92.64%)
  Lettre: t (4.55%)
  Lettre: v (2.45%)
  Lettre: c (0.35%)
Suggestions de mots en cours :
  suis
  suivre
  suivez

Contexte lettres: "suis" (ordre 4)
  Lettre:   (98.11%)
 (1.51%):
  Lettre: - (0.38%)
Suggestions de mots en cours :
  suis
  suis-je

Phrase complète : "je suis"
Suggestions du prochain mot (bigramme) :
  désolée
  en
  un


```

---

## 📂 Données d’apprentissage

Le fichier **base.txt** contient les **données textuelles** utilisées pour l'apprentissage (par exemple, des dialogues).

Plus le corpus est riche et varié, plus les **suggestions seront pertinentes**.




