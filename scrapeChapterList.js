const puppeteer = require("puppeteer")

const scrapeChapterList = (mangaLink)=>{
    return new Promise(async(resolve,reject)=>{
       
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });
        
        const page = await browser.newPage()
        const cookies = [{
          'name': 'mr_settings',
          'value': '{%22readingMode%22:%22vertical%22%2C%22readingDirection%22:%22rtl%22%2C%22quality%22:%22high%22%2C%22hozPageSize%22:1}',
          'url': 'https://mangareader.to'
        }];
        await page.setCookie(...cookies);
        await page.goto(mangaLink)

        const chapterData = []
        const chapters = await page.$$("li.item.reading-item.chapter-item")
        for(const [index,chapter] of chapters.entries()){
          const title = await page.evaluate(el => el.querySelector("a").getAttribute("title"), chapter)
          const link = "https://mangareader.to" +  await page.evaluate(el => el.querySelector("a").getAttribute("href"), chapter)
            chapterData.push({
                title,
                link
            })
        }
        resolve(chapterData)
    })
}

module.exports = scrapeChapterList