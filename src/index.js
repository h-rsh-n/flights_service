const express = require('express');
const {serverConfig,Logger} = require('./config');
const app = express();
const apiRouter = require('./routes');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/api',apiRouter);

app.listen(serverConfig.PORT,()=>{
  console.log(`Server started on PORT:${serverConfig.PORT}`);
  //Logger.info('Server started successfully');
})
