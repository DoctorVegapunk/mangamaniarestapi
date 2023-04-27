const express  = require('express')
const puppeteer = require("puppeteer")

const port  = process.env.PORT || 3000
const app = express()

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

    console.log("d");
    res.send("Dd")
})

app.listen(port, ()=> console.log(`Server listening on port: ${port}`))


