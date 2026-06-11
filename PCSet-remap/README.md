# PCSet-remap

Plug-in ManuScript pour Sibelius qui remappe les notes d'une selection vers les classes de hauteurs choisies les plus proches.

## Utilisation

1. Selectionner des notes ou un passage dans Sibelius.
2. Lancer **PCSet-remap** depuis le menu des plug-ins.
3. Cocher une ou plusieurs classes de hauteurs cibles.
4. Choisir l'affichage des classes de hauteurs: noms de notes ou entiers de `0` a `11`.
5. Choisir une transposition entre `T-12` et `T12`.
6. Choisir la direction preferee lorsqu'une note est exactement a egale distance de deux classes cibles.
7. Cliquer sur **Remapper**.

La transposition est appliquee au set avant le remappage. Par exemple, `(0 2 4 6 10) T4` produit `(4 6 8 10 2)`, tandis que `T-4` produit `(8 10 0 2 6)`. `T-12` et `T12` conservent les memes classes de hauteurs.

Le changement d'affichage conserve les classes deja cochees. Les hauteurs sont deplacees dans le registre le plus proche. Dans un accord selectionne, chaque tete de note est traitee individuellement.

## Installation macOS

Copier `PCSet-remap.plg` dans:

```text
~/Library/Application Support/Avid/Sibelius/Plugins/remapping/
```

Redemarrer Sibelius, ou utiliser la commande de rechargement des plug-ins si elle est disponible.

## Developpement

- `PCSet-remap.source.plg`: source UTF-8 lisible et versionnee.
- `PCSet-remap.plg`: fichier UTF-16LE avec BOM charge par Sibelius.
- `scripts/build.sh`: regenere le fichier installable.
- `tests/test_mapping.js`: verifie l'algorithme de proximite pour les 12 classes de hauteurs.

## Compatibilite

Developpe et installe pour Sibelius 8.8 sur macOS. Le plug-in repose sur les API ManuScript `Note.Transpose`, `Sibelius.CalculateDegree` et `Sibelius.CalculateInterval`.
