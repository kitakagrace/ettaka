const express = require('express');
const app = express();

const port = process.env.PORT ||3000;

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { title: 'Land Value', message: 'Value your land today' })
  });
  app.get('/about', (req,res)=>{
    res.render('about');
  });
app.get('/landvaluation', (req,res) =>{
  let compSize = req.body.compareSize;
  let compPx = req.body.comparePrice;
  let subjectSize = req.body.subjectSize;
  let greeting = "Dear Customer";
  let firstAdjustment = compPx/ compSize;
  let secondAdjustment = firstAdjustment * subjectSize;
  let thirdAdjustment = secondAdjustment * 0.75;
  let fouthAdjustment = secondAdjustment * 0.45;
  let marketValue = Math.round(thirdAdjustment) ;
  let forcedSaleValue = Math.round(fouthAdjustment);

  res.render('landvaluation',{marketValue,forcedSaleValue});
});
app.get('/loanassessment',(req,res) =>{
  let compSize = req.body.compareSize;
  let compPx = req.body.comparePrice;
  let subSize = req.body.subjectSize;

  let firstAdjustment = compPx/ compSize;
  let secondAdjustment = firstAdjustment * subSize;
  let thirdAdjustment = secondAdjustment * 0.75;
  let fouthAdjustment = secondAdjustment * 0.45;
  let marketValue = Math.round(thirdAdjustment);
  let forcedSaleValue = Math.round(fouthAdjustment);
  let greeting = "Dear Customer";
  let loanAjustmentGood = marketValue * 0.45;
  let loanAdjustmentBad = marketValue * 0.27;
  let loanAmountGood = Math.round(loanAjustmentGood);
  let loanAmountBad = Math.round(loanAdjustmentBad);

  
  res.render('loanassessment',{loanAmountGood,loanAmountBad});
});
app.post('/landvaluation', function(req, res){
    let compSize = req.body.compareSize;
    let compPx = req.body.comparePrice;
    let subjectSize = req.body.subjectSize;
    let greeting = "Dear Customer";
    let firstAdjustment = compPx/ compSize;
    let secondAdjustment = firstAdjustment * subjectSize;
    let thirdAdjustment = secondAdjustment * 0.75;
    let fouthAdjustment = secondAdjustment * 0.45;
    let marketValue = Math.round(thirdAdjustment);
    let forcedSaleValue = Math.round(fouthAdjustment);

    console.log(greeting + ' ,' + 'The Best price for your land is:' + ' ' + marketValue + ' ' + 'US DOLLARS');
    console.log(greeting + ', ' +  'The Worst price for your land is:' + ' ' + forcedSaleValue + ' ' + 'US DOLLARS');

   
    res.render('landvaluation', {
      marketValue: marketValue,
      forcedSaleValue:forcedSaleValue});
  });

  app.post('/loanassessment', (req,res) => {
    let compSize = req.body.compareSize;
    let compPx = req.body.comparePrice;
    let subSize = req.body.subjectSize;

    let firstAdjustment = compPx/ compSize;
    let secondAdjustment = firstAdjustment * subSize;
    let thirdAdjustment = secondAdjustment * 0.75;
    let fouthAdjustment = secondAdjustment * 0.45;
    let marketValue = Math.round(thirdAdjustment);
    let forcedSaleValue = Math.round(fouthAdjustment);
    let greeting = "Dear Customer";
    let loanAjustmentGood = marketValue * 0.45;
    let loanAdjustmentBad = marketValue * 0.27;
    let loanAmountGood = Math.round(loanAjustmentGood);
    let loanAmountBad = Math.round(loanAdjustmentBad);

    console.log(greeting + ' , ' + 'You can qualify for a loan of' + ' ' + loanAmountGood + ' ' + 'US DOLLARS' + ' ' + 'with good financials');
    console.log(greeting + ' , ' + 'You can qualify for a loan of' + ' ' + loanAmountBad + ' ' + 'US DOLLARS' + ' ' + 'with poor financials');
    //stopping the page from continuous loading after form processing
    res.render('loanassessment', {loanAmountGood:loanAmountGood, loanAmountBad:loanAmountBad})
  })
app.listen(port, () => console.log(`Listening on port ${port}!`));
