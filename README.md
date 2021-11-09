# Startline 🏁

An Amagaki starter using PostCSS, Typescript and SWC

## Get Started 🚀

`npm run dev`

## Issues / Feature Requests ⚠️

Report any [bugs or suggestions for new features](https://github.com/frzrbox/startline/issues)

## Built In-Features

- [PostCSS](#postcss)
- [Critical Styles](#critical-styles)

## PostCSS

By default Startline use the [Sugarss](https://github.com/postcss/sugarss)
syntax for styling. All styles can be handled in the `css` directory.

You can customize your folder structure however you like, but some directories
to pay attention to are the `critical` and `mixins` folders. You can read more
about the `critical` directory [here](#critical-styles).

The `mixins` directory contains the mixins for the site, using the
`postcss-mixins` plugin any mixin created in this directory will be globally
available to all other files in the `css` directory.

**Example**

`css/mixins/color.sss`

```sugarss
@define-mixin color-red
  color: red
```

`css/main.sss`

```sugarss
/* Since the color-red mixin is in the mixins directory
there is no need to import it */

.hero__heading
  @mixin color-red
```

## Critical Styles

Each page has feature to inline a specific css file for critical styling. By default
there is a file located in `css/mixins/critical.sss` that will be inlined to every
page on the site. If you want to inline specific critical styles per page you
have to do 2 things.

1. Create a file in the `css/mixins` directory that contains the same title as a
   page template.

2. Enable the the critical styles by adding `enable_critical: true`

`content/pages/about.yaml`

```yaml
# Without these 2 lines the critical style file will not be inlined
title: about
enable_critical: true
```

`css/mixins/about.sss`

```sugarss
.about
  background: red
```
