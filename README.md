# ☕ Capsulator

> 🔗 Disponible ici: [https://capsulator.thomaspelfrene.com](https://capsulator.thomaspelfrene.com)

**Capsulator** est un calculateur simple et rapide qui vous aide à estimer le **coût par capsule** lorsque vous utilisez du café moulu et des capsules rechargeables.

Il est conçu pour les utilisateurs de **CAPS ME**, une marque française qui propose des capsules réutilisables compatibles **Nespresso** et **Dolce Gusto**.

> 🔗 Découvrez CAPS ME : [https://www.capsme.fr](https://www.capsme.fr)

---

## ✨ Pourquoi ce projet ?

CAPS ME propose une alternative écologique et économique aux capsules jetables. Grâce à leurs capsules rechargeables, on peut utiliser **son propre café moulu** tout en gardant la praticité d'une machine à capsule.

Je consomme moi-même du café quotidiennement au travail avec ce système, et plusieurs collègues aussi. Très vite, une **petite course à l’optimisation** s’est installée :

> _Qui arrive à faire les capsules les moins chères ? Quel café donne le meilleur rapport qualité/prix ?_

Mais pour comparer, encore faut-il mesurer.

C’est là qu’est née l’idée de **Capsulator** : un outil simple pour calculer et comparer le **coût réel d’une capsule**, selon les données d’achat de chacun, et en tenant compte du type de capsule utilisé (**Dolce Gusto** ou **Nespresso**).

## ⚙️ Fonctionnement

L’interface vous permet de renseigner :

- le prix et la quantité de café moulu acheté ;
- le prix et le nombre d’opercules achetés.

Vous pouvez également basculer entre les deux types de capsules :

- **Dolce Gusto**
- **Nespresso**

Le calcul se base sur un **ratio moyen de café par capsule**, fourni **directement par le support client de CAPS ME** :

- **Nespresso** : 200g de café = 42 capsules
- **Dolce Gusto** : 200g de café = 28 capsules

> 🧠 Ces données ont été transmises par le **support client CAPS ME**, que nous remercions pour leur **réactivité** et leur **gentillesse** 🙏

---

## 💡 Pourquoi utiliser Capsulator ?

- Pour **suivre vos dépenses** café plus précisément
- Pour **optimiser vos achats** de café et opercules

---

## 📦 Technologies

- React + TypeScript
- Tailwind CSS
- Stockage local via `useLocalStorage` (pas de backend, tout reste sur votre appareil)

---

## 🔒 Disclaimer

Ce projet n’est **pas affilié officiellement** à CAPS ME, mais il s’appuie sur leur système et sur des échanges avec leur équipe support.  
CAPS ME est une **marque déposée**.
