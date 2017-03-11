# LogSwarm

This [Electron](http://electron.atom.io/) app is based on the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), check it if you need more informations.

It ships with [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React Router](https://github.com/reactjs/react-router), [Webpack](http://webpack.github.io/docs/), [React Transform HMR](https://github.com/gaearon/react-transform-hmr) .

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**

Ubuntu ships with an old node version. Run these commands to update to Node 7.x :

```bash
curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
sudo apt-get install nodejs
```

First, clone the repo via git:

```bash
git clone git@github.com:lhall-adexos/LogSwarm.git LogSwarm
```

And then install dependencies.
**ProTip**: Install with [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation

```bash
$ cd LogSwarm && npm install
```

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

## Getting started

Before jumping in, you might want to have a look at the following resources :

- [Photon](http://photonkit.com/) (CSS library)
- [Request](https://www.npmjs.com/package/request) (Simple HTTP client library)
- [What is JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [Graylog API](https://www.npmjs.com/package/graylog-api)