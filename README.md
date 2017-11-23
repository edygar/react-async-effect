# React Async Effect

[![downloads][downloads-badge]][npmcharts] [![version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

[![Supports React and Preact][react-badge]][react]
[![size][size-badge]][unpkg-dist] [![gzip size][gzip-badge]][unpkg-dist]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## The problem

You want to render the result of an asynchronously effect (action) that happens
outside the scope of the component. In order to do so, you have to take care and
be aware of the communication format (is it a promise, an observable or a
pubsub?) and not only, you should manage race condition against the component
unmounting. More, you also need to represent the current state of that action on
screen, being either a pending state, an error or the proper result. In case of
error, you want to allow user to retry.

## This solution

This component helps on the creation of components that provides control over an
async effect, so it deals only with its task. Also, it normalizes the way of
work on imperative effects modeled as components.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Props](#props)
* [Contributors](#contributors)
* [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Props

TBD

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/566280?s=100&amp;v=4" width="100px;"/><br /><sub><b>Edygar de Lima Oliveira</b></sub>](https://github.com/edygar)<br />[💻](https://github.com/edygar/react-async-effect/commits?author=edygar "Code") [📖](https://github.com/edygar/react-async-effect/commits?author=edygar "Documentation") [🚇](#infra-edygar "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/6819449?s=100&v=4" width="100px;"/><br /><sub><b>Miguel Silva</b></sub>](https://github.com/Miguel-Silva)<br />[💻](https://github.com/edygar/react-async-effect/commits?author=Miguel-Silva "Code") [🤔](#ideas-Miguel-Silva "Ideas, Planning, & Feedback") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[downloads-badge]: https://img.shields.io/npm/dm/react-async-effect.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/react-async-effect
[version-badge]: https://img.shields.io/npm/v/react-async-effect.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-async-effect
[license-badge]: https://img.shields.io/npm/l/react-async-effect.svg?style=flat-square
[license]: https://github.com/edygar/react-async-effect/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/edygar/react-async-effect/blob/master/other/CODE_OF_CONDUCT.md
[react-badge]: https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-(p)react-00d8ff.svg?style=flat-square
[react]: https://facebook.github.io/react/
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-async-effect/dist/react-async-effect.umd.min.js?style=flat-square&label=size
[unpkg-dist]: https://unpkg.com/react-async-effect/dist/
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-async-effect/dist/react-async-effect.umd.min.js?label=gzip%20size&style=flat-square&compression=gzip
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[unpkg-dist]: https://unpkg.com/react-async-effect/dist/
[github-watch-badge]: https://img.shields.io/github/watchers/edygar/react-async-effect.svg?style=social
[github-watch]: https://github.com/edygar/react-async-effect/watchers
[github-star-badge]: https://img.shields.io/github/stars/edygar/react-async-effect.svg?style=social
[github-star]: https://github.com/edygar/react-async-effect/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-async-effect!%20https://github.com/edygar/react-async-effect%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/edygar/react-async-effect.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
