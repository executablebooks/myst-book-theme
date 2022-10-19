# @curvenote/book-theme

The "book" theme for a Curvenote site.

## Usage with MyST

To use this template locally, update your site template make sure your project's local dependencies are installed:

```sh
site:
  template: curvenote/book
```

Then start the local theme server:

```sh
myst start
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Development

This repository depends on the packages in [@curvenote/theme-base](https://github.com/curvenote/theme-base), and these are brought in as a sub-module.
When installing, use `git clone --recursive` when first cloning.

## Deployment

This theme can be used by any Curvenote site, to use the hosted theme simply

```sh
curvenote deploy
```

It is also possible to deploy a version of this to Vercel, Netlify or your own server infrastructure. See the [Remix docs](https://remix.run/docs) for more information on custom deployments.
