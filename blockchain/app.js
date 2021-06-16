var xpress = require('express');
var app = xpress();
var bodyParser = require('body-parser');
var chain = require('./index.js');
const { Wallet } = require('./index.js');
var port=8088;

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.get('/',(req,res)=>res.send("I'm here!"));
app.get('/blocks',function(req,res){
//     res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    minedChain = {mined:chain.Chain.instance.mining,chain:chain.Chain.instance.chain};
  res.json(minedChain);
});
app.post('/crWlt',(req,res)=>{
    const name = req.body.name;
    let sen = {privateKey:undefined,publicKey:undefined};
    const satoshi = new Wallet(sen);
    const pbk = satoshi.publicKey;
    const pvk = satoshi.privateKey;
    res.json({PublicKey:pbk, PrivateKey:pvk});
})
app.post('/mine',(req,res)=>{
    const amt = req.body.amt;
    let sen=undefined;
    if(typeof req.body.pvK!==undefined && typeof req.body.pbk!==undefined)
        sen = {privateKey:req.body.pvK,publicKey:req.body.pbK};
    const rec = req.body.recKey;

})
app.post('/send',(req,res)=>{
    let values = JSON.parse(Object.keys(req.body)[0]);
    const amt = values.amt;
    let sen={privateKey:req.body.pvK,publicKey:req.body.pbK};
    // if(req.body.pvK!==undefined && req.body.pbk!==undefined)
    //     sen = {privateKey:req.body.pvK,publicKey:req.body.pbK};
    const rec = values.recKey;
    console.log(values.amt);
    const satoshi = new Wallet(sen);
    const t = satoshi.sendMoney(amt,rec);
    res.json(t);
});
app.listen(port,()=>console.log(`App listening on ${port}`));