// https://medium.com/hackernoon/api-testing-using-supertest-1f830ce838f1

const express = require('express')
const app = express()
const users = require('./users')
var routes = express.Router();

app.get('/', (req, res) => {
  res.send('你好')
})

//加载路由
app.use('/', routes);
app.use('/users', users); 

//

app.listen(9000, () => console.log('服务器已就绪'))
 
//导出app对象

module.exports = app;