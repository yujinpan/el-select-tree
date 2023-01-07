#!/usr/bin/env sh

npm run build:docs &&

cd dist

git init
git add .
git commit -m 'deploy'

git push -f git@github.com:yujinpan/el-select-tree.git master:gh-pages
