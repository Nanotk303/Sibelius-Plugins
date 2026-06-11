# PCSet-remap

Plug-in ManuScript pour Sibelius qui remappe les notes d'une selection vers les classes de hauteurs choisies les plus proches.

## Utilisation

1. Selectionner des notes ou un passage dans Sibelius.
2. Lancer **PCSet-remap** depuis le menu des plug-ins.
3. Cocher une ou plusieurs classes de hauteurs cibles.
4. Choisir la direction preferee lorsqu'une note est exactement a egale distance de deux classes cibles.
5. Cliquer sur **Remapper**.

Les hauteurs sont deplacees dans le registre le plus proche. Dans un accord selectionne, chaque tete de note est traitee individuellement.

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
