//  ------------------ global Declarations -------------

const timesWireKey = "QvTUnguAYJjQdJnSZmMk2oisuEWHibjU";
const timesWireDiv = document.querySelector(
  ".world-news-section .news-overflow"
);

// ---------------- Functions ---------------

async function FetchTimesWireData(apiKey) {
  try{

  const timesWireApi = await fetch(
    `https://api.nytimes.com/svc/news/v3/content/all/world.json?api-key=${apiKey}`
  );

  const timeWireResponse = await timesWireApi.json();
  console.log(timeWireResponse);
  constructResponseData(timeWireResponse);
  // console.log(timeWireResponse.results);
  // timeWireResponse.results.forEach(news => {
  //     console.log(news);
  // });
  }

  catch(err){
    timesWireDiv.innerHTML =`
    <div class="error">
    <p>
    ${err}
    </p>
    </div>
    `
  }
}

function constructResponseData(response) {
  const result = response.results;
  //  console.log(result);

  // getting element one by one
  result.forEach((article) => {
    // console.log(article.section);

    // ----------- Try Catch Block For If Error Occurs ------------
    try {
      const section = article.section;
      const title = article.title;
      const link = article.url;
      const published_date = article.published_date;
      const abstract = article.abstract;
      const location = article.subsection;
      const image = article.multimedia[0];
      const imageUrl = image.url;
      const caption = image.caption;
      const height = image.height;
      const width = image.width;
      const format = image.format;

      // console.table(section,link,title,published_date,abstract,location,image,imageUrl,caption,height,width,format);

      // sending oneBy one Data
      returnData = [
        section,
        link,
        title,
        published_date,
        abstract,
        location,
        imageUrl,
        caption,
        height,
        width,
        format,
      ];

      // calling the constructed data function

      addElementIntoBody(returnData);
    } catch (err) {
      console.log(err);
    }
  });
}

function addElementIntoBody(returnData) {
  // getting whole Constructed news Data
  // const p = document.createElement('p');
  // p.textContent= returnData[2];
  //  timesWireDiv.append(p);

  if (returnData[4] == "") {
    timesWireDiv.innerHTML += `
<!-- news container  -->
        <div
          class="news-container col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
        >
          <div class="extra-details">
            <p class="location">${returnData[5]}</p>
            <p class="date">${returnData[3].slice(11, 19)}</p>
          </div>
          <!-- News-Image Div -->
          <div
            class=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 news-details"
          >
            <!-- news-details div -->
            <div class="news-data">
              <img
                src="${returnData[6]}"
                alt="${returnData[7]}"
                class="img-thumbnail news-img"
              />
              <p class="title">
              ${returnData[2]}
              </p>
            </div>
            <p class="abstract">
            ${returnData[2]}
            </p>
          </div>
          <div class="btn-more">
            <a
              href="${returnData[1]}"
            >
              <p>Expolre</p>
            </a>
          </div>
        </div>

`;
  } else {
    timesWireDiv.innerHTML += `
<!-- news container  -->
        <div
          class="news-container col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
        >
          <div class="extra-details">
            <p class="location">${returnData[5]}</p>
            <p class="date">${returnData[3].slice(11, 19)}</p>
          </div>
          <!-- News-Image Div -->
          <div
            class=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 news-details"
          >
            <!-- news-details div -->
            <div class="news-data">
              <img
                src="${returnData[6]}"
                alt="${returnData[7]}"
                class="img-thumbnail news-img"
              />
              <p class="title">
              ${returnData[2]}
              </p>
            </div>
            <p class="abstract">
            ${returnData[4]}
            </p>
          </div>
          <div class="btn-more">
            <a
              href="${returnData[1]}"
            >
              <p>Expolre</p>
            </a>
          </div>
        </div>

`;
  }
}
FetchTimesWireData(timesWireKey);
