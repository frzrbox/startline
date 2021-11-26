# Startline 🏁

An Amagaki starter using PostCSS, Typescript and ESBuild

## Get Started 🚀

`npm run dev`

## Issues / Feature Requests ⚠️

Report any [bugs or suggestions for new features](https://github.com/frzrbox/startline/issues)

## Built-In Features

- [PostCSS](#postcss)
- [Critical Styles](#critical-styles)
- [Built-in Macros](#built-in-macros)

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

## Built-in Macros

### Link

The link macro will automatcially detect and navigate to the correct locale and path.
It will accept an object with the following fields.

| Params  | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| link    | Has a `doc` or `url` field                                                 |
| label   | The content of the link                                                    |
| classes | A list where each value adds a class to the element                        |
| target  | The `target` value of the link, will not show if the value is not `_blank` |

**Example**

```yaml
cta:
  link:
    doc: !pod.doc /content/pages/about.njk
  label: !pod.string Go to about
  classes:
    - about__cta
```

```njk
{% import '/views/macros/link.njk' as link with context %}

<div class="demo">
  {{link.render(cta)}}
</div>
```

**Output**

```njk
{# If the !pod.doc function is used on the link.doc property, the href value
will change depending on the current locale of the document #}

<a class="about__cta" href="/about">Go to about</a>
```

### Image

The image macro renders out a dynamic `picture` element with some other useful params.

| Params      | Descriptions                                                                              |
| ----------- | ----------------------------------------------------------------------------------------- |
| default     | The default fallback image if no breakpoints are specified (make this the smallest image) |
| breakpoints | An object that can take in key, value pairs of the breakpoint and image source            |
| alt         | Image alt text                                                                            |
| class       | Class that is added to the element                                                        |
| classes     | A list of classes to add to the element                                                   |
| height      | Image height                                                                              |
| width       | Image width                                                                               |
| attributes  | An object that can take in key, value pairs of the attribute name and value               |

**Breakpoints**

The `breakpoints` param can either take in a string of default breakpoints or custom breakpoints.
Default breakpoints are:

- `mobile`: 768px
- `tablet`: 1024px
- `laptop`: 1440px
- `desktop`: 1600px

**Note**: The macro uses `min-width` for the `source` elements so make sure to keep the larger
breakpoints on the top of the list and the `default` param the smallest source

```yaml
partial: homepage-hero
image:
  default: !pod.string /static/default-image.png
  breakpoints:
    tablet: !pod.string /static/tablet-image.png
    2000px: !pod.string/static/custom-breakpoint-image.png
```

**Example**

```yaml
image:
  default: !pod.string /static/img/hero-image-small.jpg
  breakpoints:
    laptop: !pod.string /static/img/hero-image-large.jpg
    1200px: !pod.string /static/img/hero-image-medium.jpg
  alt: !pod.string Clemens van Lay
  class: homepage-hero__picture
  height: 500
  width: 1200
  attributes:
    state: visible
```

```nunjucks
{% import '/views/macros/image.njk' as image %}

<div class="homepage-hero">
  {{image.render(partial.image)}}
</div>
```

**Output**

```njk
<picture class="homepage-hero__picture" data-state="visible">
  <source media="(min-width: 1440px)" srcset="/static/img/hero-image-large.jpg">
  <source media="(min-width: 1200px)" srcset="/static/img/hero-image-medium.jpg">
  <img class="homepage-hero__picture__image" loading="lazy" height="500" width="1200" src="/static/img/hero-image-small.jpg" alt="Clemens van Lay">
</picture>
```
