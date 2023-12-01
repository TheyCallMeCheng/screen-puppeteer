import puppeteer from 'puppeteer';
import axios from 'axios';

export async function getImage(url) {
    if (typeof url === "string" && url.length === 0) {
        console.log("Url error");
        return;
    }
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let urlNoProtocol = url.replace(/^https?\:\/\//i, "");
    console.log("INFO: visiting url... " + urlNoProtocol)

    // Navigate the page to a URL
    try {
        // { waitUntil: 'networkidle0' } if the pages aren't loaded correctly we can wait more time by adding this parameter
        await page.goto(url,);
    } catch (e) {
        console.log("Error while trying to visit url: " + url)
        console.log("ERR: " + e)
    }

    // Set screen size
    await page.setViewport({ width: 1920, height: 1080 });

    try {
        await page.screenshot({
            path: urlNoProtocol + '.jpg'
        });
    } catch {
        await page.screenshot({
            path: 'screenshot.jpg'
        });
    }

    await browser.close();
}

export async function getWebsiteInfo(url) {
    const options = {
        method: 'GET',
        url: 'https://zozor54-whois-lookup-v1.p.rapidapi.com/',
        params: {
            domain: 'sendrank.com',
            format: 'json',
            _forceRefresh: '0'
        },
        headers: {
            'X-RapidAPI-Key': '45cc820b5amshf801b5ab9c3f802p1085bbjsnabf90634705c',
            'X-RapidAPI-Host': 'zozor54-whois-lookup-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}