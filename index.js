import puppeteer from "puppeteer";

const getCelebInfo = async () => {
	
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  const celebName = "Salman_Khan"; // change the celebrity name here make sure to put '_' for spaces and first letter capital to work

  await page.goto(`https://en.m.wikipedia.org/wiki/${celebName}`, { 
    waitUntil: "domcontentloaded",
  });

  const scrappedData = await page.evaluate(() => {
    const infobox = document.querySelector(".infobox.biography.vcard");
    const labelElements = infobox.querySelectorAll(".infobox-label");
    const dataElements = infobox.querySelectorAll(".infobox-data");

    const dataArray = [];

    labelElements.forEach((label, index) => {
      const scLabel = label.innerText;
      const scData = dataElements[index].innerText;

      dataArray.push({ scLabel, scData });
    });

    return dataArray;
  });

  console.log(scrappedData);

  await browser.close();
};

getCelebInfo();
