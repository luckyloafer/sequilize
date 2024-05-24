const express = require('express');
const bodyParser = require('body-parser')

require('./models')
var userCtrl = require('./controllers/userController')

const app = express();

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('heb')
})

app.get('/add',userCtrl.addUser)
app.get('/users',userCtrl.getUsers)
app.get('/users/:id',userCtrl.getUser)
app.post('/users',userCtrl.postUsers)
app.delete('/users/:id',userCtrl.deleteUser)
app.patch('/users/:id',userCtrl.patchUser)
app.get('/query',userCtrl.queryUser)
app.get('/get-set-virtual', userCtrl.getSetVirtual);
app.get('/raw-queries',userCtrl.rawQueriesUser);
app.get('/one-to-one', userCtrl.oneToOneUser);
app.get('/one-to-many', userCtrl.oneToMany);
app.get('/many-to-many',userCtrl.manyToMany)
app.get('/loading',userCtrl.loadingUser);
app.get('/eager',userCtrl.eagerUser);
app.get('/creator',userCtrl.creatorUser);
app.get('/m-n-associations',userCtrl.mnAssociationsUser)
app.get('/transactions',userCtrl.transactionsUser)
app.get('/query-interface',userCtrl.queryInterfaceUser)


app.listen(3000,()=>{
    console.log('server conncetdd')
})