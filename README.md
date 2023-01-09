# Player FM Podcast Listening History Export

1. Upgrade to a paid Player.FM plan if on free
2. Go to <https://player.fm/{YOUR_USERNAME}/play-history/all>
3. Scroll all the way down the page to get the complete listening history
4. Download the HTML using a Chrome extension such as [Save Page WE](https://chrome.google.com/webstore/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof/related?hl=en-US)
4. Run:

```console
$ npm i
$ npm run start
```

The node script will produce a `out.md` and `out.json` file