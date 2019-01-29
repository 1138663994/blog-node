const request = require('superagent')
require('superagent-charset')(request)

async function getData (i) {
  let url = `https://www.juzimi.com/quicktabs/ajax/block/1/views_delta_recom-block_1/${i}`
  return new Promise (function(resolve, reject){
    request.get(url).charset('utf-8').end(function (err, sres) {
      var html = sres.text;
      var patt1=/xlistju\\"\\x3e[^\\x]*/g;
      let obj = html.match(patt1)
      let arr =[]
      for (var i in obj) {
        arr.push(obj[i].replace(/xlistju\\"\\x3e/i, ''))
      }
      // signData = arr
      resolve(arr)
    })
  })
}
let i = 1, j = 0
let signData = []
module.exports = {
  async getSign (ctx, next) {
    if (j == 0) {
      signData =  await getData(i)
    }
    if (j > 3) {
      i++
      j = 0
    }
    if (i >30) {
      i = 0
    }
    let codeData = signData[j] ? signData[j] : '努力活成自己想要的样子吧。'
    ctx.body = {
      code: 1,
      data: codeData
    }
    j++
  }
}


 