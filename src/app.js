const Twit = require('twit')
const config = require('../config/config.json')

const T = new Twit(config)

const stream = T.stream('statuses/sample')
 
stream.on('tweet', function (tweet) {
  let {id, text, truncated, retweeted_status: retweetedStatus, is_quote_status: isQuoteStatus, user: {id: userId, name, screen_name: screenName}, lang} = tweet
  if(lang === 'fr' && !isQuoteStatus) {
    if(truncated) {
      text = tweet.extended_tweet.full_text
    }
    if(!text.includes('RT @')) {
      // There's either a space/other char
      console.log(/[\s-'](\w{3,}?)ine\W/gi.exec(text))
      // Or it begins with this word
      console.log(/^(\w{3,}?)ine\W/gi.exec(text))
      console.log(id, text, userId, name, screenName)
    }
  }
  /*if(false) {
    T.post('statuses/retweet/:id', { id: 'id' }, function (err, data, response) {
      console.log(data)
    })
  }*/
})
