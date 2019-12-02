const express = require('express')
const socketIO = require('socket.io')
const cookieParser = require('cookie-parser')
const http = require('http')
const cors = require('cors')
const url = require('url')
const md5 = require('md5')
const dbPromise = require('./db')
let db
(async function(){
  db = await dbPromise
}())


var session = require('express-session')

const port = 3006

const app = express()
const server = http.createServer(app)
const ioServer = socketIO(server)

ioServer.on('connection', socket => {
  socket.on('select room', roomid => {
    socket.join('/votes/' + roomid)
  })

})

const userAccountRouter = require('./user-account')

app.use(cors({
  origin:['http://localhost:8080'],
  credentials: true,
}))

app.use(session({secret: 'my secret', resave: false, cookie: { maxAge: 60000}}))

app.use(cookieParser('my secret'))

app.use((req, res, next) => {
  res.set('Content-Type','text/html ; charset=UTF-8')
  next()
})

app.use(express.static(__dirname + '../public'))

app.use(express.json()) // 解析json请求体的中间件

app.use(express.urlencoded({
  extended: true
}))//解析url编码的中间件

app.route('/api/register')
  .post(async (req, res, next) => {
    var regInfo = req.body
    console.log(regInfo)
    var user = await db.get('SELECT * FROM users WHERE name=?', regInfo.name)
    console.log(user)
    if(user) {
      res.json({code: -1})
      console.log(-1)
    }else {
      await db.run('INSERT INTO users (name, password) VALUES (?,?)', regInfo.name, md5(md5(regInfo.password)))


    }
    
  })

app.route('/api/login')
  .get((req, res, next) => {
    console.log(req.cookies)
    console.log(req.signedCookies.user)
    if(req.signedCookies.userid) {
      res.redirect('http://localhost:8080/#/choose') 
    }
  })
  .post(async (req, res, next) => {
    var tryLoginInfo = req.body
    console.log(tryLoginInfo)
    var user = await db.get('SELECT * FROM users WHERE name=? AND password=?',
      tryLoginInfo.name, md5(md5(tryLoginInfo.password))
    )
    console.log(user)
    if (user) {
      res.cookie('userid', user.id, {
        signed: true
      })
      console.log(0)
      res.json({code: 0})
    }
  })

app.route('/api/choose')
  .post(async (req,res, next) => {
  var chooseInfo = req.body
  console.log(chooseInfo)
  await db.run('INSERT INTO selection (selec) VALUES (?)',chooseInfo.Selection)
  next()
})

app.route('/api/create-vote')
  .post(async (req, res, next) => {
  var voteInfo = req.body
  var userid = req.signedCookies.userid
  await db.run('INSERT INTO votes (title, desc, userid, deadline, anonymouse, propagation, deadline2) VALUES (?,?,?,?,?,?,?)',voteInfo.title,voteInfo.desc, userid, voteInfo.deadline, voteInfo.anonymouse, voteInfo.propagation, voteInfo.deadline2)

  var vote = await db.get('SELECT * FROM votes ORDER BY id DESC LIMIT 1') //倒序排列取第一项
  console.log(vote)
  await Promise.all(voteInfo.options.map(option => {
    return db.run('INSERT INTO options (content, voteid) VALUES (?,?)', option, vote.id)
  }))

    if(req.is('json')) {
      console.log(0)
      res.json(vote)
      
    }
})

//获取某个投票的基本信息
app.get('/api/votes/:id',async (req, res, next) => {
  var votePromise =  db.get('SELECT * FROM votes WHERE id=?', req.params.id)
  var optionsPromise = db.all('SELECT * FROM options WHERE voteid=?', req.params.id)
  var voteupsPromise =  db.all('SELECT * FROM voteups WHERE voteid=?', req.params.id)
  var info = await votePromise
  console.log(info)

  var options = await optionsPromise
  var voteups = await voteupsPromise

  res.json({
    info,
    options,
    voteups,
  })
})

//有用户投票
app.post('/api/voteup', async(req, res, next) => {
  const {voteid,userid,deadline,singleSelection, optionid} = req.body
  console.log(req.body)
  if (Date.now() > deadline) {
    res.status(403).json({
      code: -1,
      msg: '当前投票已截止'
    })
    return
  }

  var voteupInfo = await db.get('SELECT * FROM  voteups WHERE userid=? AND voteid=?', userid, voteid)

  if(voteupInfo === undefined) {
    await db.run('INSERT INTO voteups (userid, optionid, voteid) VALUES (?,?,?)', userid, optionid, voteid)
  } else {
      if(singleSelection === 1) {
        await db.run(`INSERT INTO voteups (userid, optionid, voteid) VALUES (?,?,?)`,
          userid,
          optionid,
          voteid
        )
      }else {
        if(voteupInfo.userid === userid) {
          await db.run('UPDATE voteups SET optionid = optionid WHERE voteid = voteid')
        }
      }
    }

  ioServer.in('/votes/${voteid}').emit('new vote', {
    userid,
    voteid,
    optionid: optionid,
  })

  var voteups = await db.all('SELECT * FROM voteups WHERE userid=? AND voteid=?', userid, voteid)

  res.json(voteups)
})


app.use('/', userAccountRouter)



server.listen(port,() => {
  console.log('server listening on port', port)
})

