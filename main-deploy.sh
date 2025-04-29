#!/bin/bash

echo "Commit the changes in the git repository"
git commit -am "new dev deploy"
git push

# deploying in caprover
echo "deploying api in caprover"

# escoge la app que quieres desplegar
app="madera-erp-front"
echo 'Deploying current branch'
current_branch=$(git branch --show-current)
caprover deploy -h https://captain.cap.programacionamedida.xyz/ -p Mvdqfm2025 -b $current_branch -a $app

echo "Deploy completed"