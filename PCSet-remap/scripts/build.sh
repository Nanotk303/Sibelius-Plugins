#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
source_file="$project_dir/PCSet-remap.source.plg"
output_file="$project_dir/PCSet-remap.plg"

printf '\377\376' > "$output_file"
iconv -f UTF-8 -t UTF-16LE "$source_file" >> "$output_file"
printf 'Built %s\n' "$output_file"
