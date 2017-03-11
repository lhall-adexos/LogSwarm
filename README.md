# LogSwarm

This Electron app is based on the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), check it if you need more informations.

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