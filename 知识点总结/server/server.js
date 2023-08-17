const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors())

// 在小程序中可以使用jsonp解决跨域问题
app.get('/get', function(req, res) {
  const fun = req.query.callback;
  res.send(`${fun}(${JSON.stringify({name:"张三",age:20})})`)
})

app.post('/post', function(req, res) {
  res.send(JSON.stringify({
    name: "李四"
  }))
})

app.listen(8002, (err) => {
  if (!err) return console.log('http://localhost:8002')
})
