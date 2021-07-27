# ViewPoint Micro Frontend Hack

Webpack module federation - ViewPoint Micro Frontend Hack Project

Currently this has been setup to push to multiple remotes fo rthe time being.

Add Push Remote URLs:

```
git remote set-url --add --push origin git@github.com:illusionshaker/mf-viewpoint.git

git remote set-url --add --push origin https://github.com/oneiresslab/mf-viewpoint

```

Notes:

When `npm run start` you may have an issue in Chrome where the browser won't display localhost run the following and site settings > insecure content is set to allow.

```
chrome://flags/#allow-insecure-localhost
```