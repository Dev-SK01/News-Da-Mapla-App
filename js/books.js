//  ------------------ global Declarations ------------- 

const bookKey = 'NZhRW3gQMMN8swP6mm1SBbKmfFWY9htG';
const book = document.querySelector('.book-news-section .news-overflow');




// ---------------- Functions --------------- 

async function  Fetchbook(apiKey){
  try{
    const home = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/books.json?api-key=${apiKey}`) ;

    const homeResponse = await home.json();
    console.log(homeResponse);
    constructbookResponseData(homeResponse);
  }
  catch(err){
    book.innerHTML =`
    <div class="error">
    <p>
    ${err}
    </p>
    </div>
    `
  }
   
}


function constructbookResponseData(response){
     const result = response.results;
    //  console.log(result);

    // getting element one by one 
    result.forEach(article => {

    // ----------------- Try Catch Block IF Error Occurs ----------------
    try{

    // console.log(article.section);
    const {section,title,link,published_date,abstract} = article;
    const location = article.des_facet[0];
    const image =  article.multimedia[0];
    const {url,caption,format,height,width} = image;
    // printing to console 
    // console.table(section,link,title,published_date,abstract,location,image,imageUrl,caption,height,width,format);

    // sending one By one Data 
    returnData = [ section,link,title,published_date,abstract,location,url,caption,height,width,format] ;

    // calling the constructed data function

      bookDataIntoBody(returnData);
    
    }

    catch (err){
        console.log(err)
    }
    });
     

}

function bookDataIntoBody(returnData){
 // getting whole Constructed news Data
  // const p = document.createElement('p');
  // p.textContent= returnData[2];
  //  timesWireDiv.append(p);

  if (returnData[4] == "") {
    book.innerHTML += `
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
              <p>Explore</p>
            </a>
          </div>
        </div>

`;
  } else {
    book.innerHTML += `
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
              <p>Explore</p>
            </a>
          </div>
        </div>

`;
  }

}

// Final Function call

Fetchbook(bookKey);



