# Expand-Compress-intervals

Plug-in ManuScript pour Sibelius qui dilate ou compresse les intervalles chromatiques d'une selection selon un ratio.

## Principe

Le plug-in suit le modele d'`interval-scale` d'Opusmodus:

```text
intervalle = hauteur courante - hauteur precedente
intervalle transforme = arrondi(intervalle * ratio)
nouvelle hauteur = nouvelle hauteur precedente + intervalle transforme
```

- `2` double les intervalles successifs.
- `0.5` divise les intervalles par deux.
- `1` conserve les hauteurs.
- `0` rassemble toutes les notes sur la premiere hauteur.

La premiere note selectionnee sert de hauteur de depart et reste fixe. Les valeurs fractionnaires sont arrondies au demi-ton le plus proche.
Le ratio est calcule comme une fraction decimale exacte afin d'eviter les arrondis intermediaires de ManuScript.
Les notes sont recreees a leur hauteur MIDI cible exacte, ce qui evite les choix diatoniques imprevisibles de `Note.Transpose`.
Les accords sont traites comme des blocs complets afin que les references de notes ManuScript restent valides pendant la transformation.

## Utilisation

1. Selectionner des notes ou un passage dans Sibelius.
2. Lancer **Expand-Compress-intervals**.
3. Saisir un ratio positif ou nul. Les separateurs decimaux `.` et `,` sont acceptes.
4. Cliquer sur **Appliquer**.

Le plug-in refuse l'operation si une hauteur resultante sort de la plage MIDI `0-127`.

## Installation macOS

Copier `Expand-Compress-intervals.plg` dans:

```text
~/Library/Application Support/Avid/Sibelius/Plugins/remapping/
```

## Developpement

- `Expand-Compress-intervals.source.plg`: source UTF-8 lisible.
- `Expand-Compress-intervals.plg`: fichier UTF-16LE charge par Sibelius.
- `scripts/build.sh`: genere le fichier installable.
- `tests/test_transform.js`: teste la transformation des hauteurs.
