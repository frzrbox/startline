# Startline

An Amagaki starter using PostCSS, Typescript and SWC

## Built In-Features

- [PostCSS](#postcss)
- [Critical Styles](#critical-styles)

# PostCSS

By default Startline use the [Sugarss](https://github.com/postcss/sugarss)
syntax for styling. All styles can be handled in the `css` directory.

You can customize your folder structure however you like, but some directories
to pay attention to are the `critical` and `mixins` folders. You can read more
about the `critical` directory [here](#critical-styles). The `mixins` directory
contains the mixins for the site, using the `postcss-mixins` plugin any mixin
created in this directory will be globally available to all other files in the
`css` directory.

**Example**

`css/mixins/color.sss`

```sugarss
@define-mixin color-red
  color: red
```

`css/main.sss`

```sugarss
// Since the color-red mixin is in the mixins directory
there is no need to import it

.hero__heading
  @mixin color-red
```
