lien vers Render.com: <https://film-j3by.onrender.com/api/films>

lien vers webdev: <https://e2296635.webdev.cmaisonneuve.qc.ca/my-app/>

documentation pour API-Films: <https://github.com/yzl-2022/API-Films>

sources de css et html: <https://github.com/yzl-2022/zele.github.io>

### `npm install`

### `npm start`

### `npm test`

### `npm run build`

.htaccess

```
RewriteEngine On

RewriteBase /my-app/

RewriteRule ^index\.html$ - [L]

RewriteCond %{REQUEST_FILENAME} !-f

RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule . /my-app/index.html [L]
```