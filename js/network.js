//  ------------------ global Declarations ------------- 

const networkKey = 'Bd4cwqptNBvnEJ2A4qtXiym8pRid4z9M';
const network = document.querySelector('.network-news-section .news-overflow');




// ---------------- Functions --------------- 

async function  Fetchnetwork(apiKey){
  try{
    const home = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/the learning network.json?api-key=${apiKey}`) ;

    const homeResponse = await home.json();
    console.log(homeResponse);
    constructnetworkResponseData(homeResponse);
  }

  catch(err){
    network.innerHTML =`
    <div class="error">
    <p>
    ${err}
    </p>
    </div>
    `
  }
    
   
}


function constructnetworkResponseData(response){
     const result = response.results;
    //  console.log(result);

    // getting element one by one 
    result.forEach(article => {

    // ----------------- Try Catch Block IF Error Occurs ----------------
    try{
    // console.log(article.section);
    const section = article.section;
    const title = article.title;
    const link = article.url;
    const published_date = article.published_date;
    const abstract = article.abstract;
    const location = article.kicker;
    const image =  article.multimedia[0];
    const imageUrl = image.url;
    const caption = image.caption;
    const height = image.height;
    const width =image.width;
    const format= image.format;
    // printing to console 
    // console.table(section,link,title,published_date,abstract,location,image,imageUrl,caption,height,width,format);

    // sending one By one Data 
    returnData = [ section,link,title,published_date,abstract,location,imageUrl,caption,height,width,format] ;

    // calling the constructed data function

      networkDataIntoBody(returnData);
    
    }

    catch (err){
        console.log(err)
    }
    });
     

}

function networkDataIntoBody(returnData){
 // getting whole Constructed news Data
  // const p = document.createElement('p');
  // p.textContent= returnData[2];
  //  timesWireDiv.append(p);

  if (returnData[4] == "") {
    network.innerHTML += `
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
    network.innerHTML += `
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


Fetchnetwork(networkKey);



