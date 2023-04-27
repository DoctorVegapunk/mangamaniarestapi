const express  = require('express')
const puppeteer = require("puppeteer")
const axios = require('axios')

const bodyParser = require('body-parser');
const port  = process.env.PORT || 3000

const app = express()
const scrapeManga = require('./scrapeManga');
const scrapeChapter = require('./scrapeChapter');
const scrapeChapterList = require("./scrapeChapterList")

const mangareader = require('./websites/mangareader.json')

app.use(bodyParser.json());


app.get('/',async(req,res)=>{
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({ path: 'example.png' });
      res.send("Okey")
      await browser.close();
})
app.get('/hoop',(req,res)=>{

    res.send("Dd")
})

app.get('/mangareader/:mangaName',async(req,res)=>{
  const mangaData = mangareader[req.params.mangaName]
  try {
    mangaData.hasOwnProperty('link')
    
    scrapeChapterList().then(result=>{
      res.json(result);
    })
  } catch (error) {
    res.send("No Manga by that name")
  }

  
})

app.get('/mangareader/download/all/:mangaName', async (req, res) => {
  const mangaData = mangareader[req.params.mangaName]

  scrapeManga(mangaData.link).then(result=>{
      res.json(result);
  })

});

app.post('/mangareader/download/chapter',async(req,res)=>{
  const data = req.body; 

  scrapeChapter(data.title,data.link).then(result=>{
    res.send(result)
  })

})
app.get('/test',async(req,res)=>{
    const requestBody = {"title":"Chapter 23: Ep. 23 - Jakdo Fire Station Platoon 2 (2)","link":"https://mangareader.to/read/1-second-55488/en/chapter-23"}
    axios.post('http://localhost:3000/mangareader/download/chapter', requestBody).then(response => {
        res.send(response.data)
      }).catch(error => {
        console.error(error);
      });
})


app.listen(port, ()=> console.log(`Server listening on port: ${port}`))


