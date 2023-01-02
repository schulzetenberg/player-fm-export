const fs = require('fs');
const cheerio = require('cheerio');

const htmlFile = fs.readFileSync('./player-fm-history.html', { encoding:'utf8' });
const $ = cheerio.load(htmlFile);

function write(line) {
	console.log(line);

	fs.appendFileSync('out.md', line + '\n', function (err) {
		if (err) throw err;
	});
}

function isStragePlayedTime(timestamp) {
  return (
    // No `data-played-at` attribute
    isNaN(timestamp) ||
    // `data-played-at` is present but contains an unrealistic value
    timestamp === 1 ||
    timestamp === -2
  );
}

fs.writeFileSync('out.md', '', function (err) {
	if (err) throw err;
});

write('# Player.FM history');
write('');

$('article').map((_, article) => {
  const showName = $('div.headline div.title', article).text();
  const showUrl = 'https://player.fm/series/' + $(article).attr('data-series-slug');
  const showImageSrcset = $('div.headline a img', article).attr('data-srcset');
  const showImageUrl = showImageSrcset?.substring(0, showImageSrcset.indexOf(' '));

  const episodeName = $(article).attr('data-title');
  const episodeUrl = showUrl + '/' + $(article).attr('data-slug');

  const episodeDuration = $('.info-top span.duration', article).text();

  const episodeTimestamp = Number($(article).attr('data-played-at'));
  const time = new Date(episodeTimestamp * 1000);
  const episodeListenTimeFormatted = isStragePlayedTime(episodeTimestamp)
    ? '(?)'
    : `${time.getDate()}\\. ${time.getMonth() + 1}. ${time.getFullYear()}`; // "\\." is necessary to avoid Markdown ordered list

  write(
    `- ${episodeListenTimeFormatted}: <img width="16" height="16" src="${showImageUrl}"> [${showName}](${showUrl}) — [${episodeName}](${episodeUrl}) (${episodeDuration})`
  );
});