const Twit = require('twit');

const config = {
  consumer_key: 'BSnuKqwXUmttQyrQzlffBNTeV',
  consumer_secret: '9dMR8PrHUgJlHE8gYJOOvxMvKVZ22zLiLXni2CExHiGfHZ2zBN',
  access_token: '1316083282602348544-ChD74xXvlyygslNFQZQKpjwCX4656U',
  access_token_secret: 'frek1IvUgqc1a55Lqct2iZKi7lOAXpCeyDXTMoTHDGSuW',
};

const words = 'uai';

const screenName = 'uai_bot';

const twit = new Twit(config);
const stream = twit.stream('statuses/filter', { track: words.split(',').map(w => w.trim()) });

console.log('O bot está inicializando!');
try {
  stream.on('tweet', tweet => {
    if (tweet.user.screen_name === screenName) return;

    if (!tweet.retweeted_status) {
      twit.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
        if (err || !data.text) {
          return console.log(`Erro ao retweetar usuário "@${tweet.user.screen_name}"`);
        }
        console.log(`Usuário retweetado "@${tweet.user.screen_name}":\n"${tweet.text}"\n`);
      });
    }
  });
} catch (_) {
  console.log('Ocorreu um erro.');
  process.exit();
}
