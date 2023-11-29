
magazines = [
    "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
    "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
    "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
  ]


console.log(magazines);


async function fetchNews(magazines, news_id){
    try{
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines}`)
        const adventures = await response.json();
        // console.log(`Adventures for ${city} inside fetchAdventures function: `, adventures)
        document.getElementById(`${news_id}`).textContent = "";
        const data = document.getElementById(`${news_id}`);
        console.log(data)
        let superdiv = document.createElement("div");
        superdiv.setAttribute(`class`, `carousel slide`);
        superdiv.setAttribute(`id`, `carousel${news_id}`);
        superdiv.setAttribute(`data-bs-ride`, `carousel`)
        // console.log(adventures.items);

        let carousalInner = document.createElement("div");
        carousalInner.setAttribute(`class`, `carousel-inner`);
        for (let i=0; i<adventures.items.length; i++){
            console.log(i, adventures.items[i], adventures.items[i].title, adventures.items[i].enclosure.link, adventures.items[i].description)
            console.log(i, carousalInner);
            let div = document.createElement("div");
            if (i==0) {      
            div.setAttribute(`class`, `carousel-item active`);
            // #href=""
            div.innerHTML = `<div class="card adventure-card">
                                <img src="${adventures.items[i].enclosure.link}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h3 class="card-title">${adventures.items[i].title}</h3>
                                    <p class="card-text">${adventures.items[i].description}</p>
                                    <a href="${adventures.items[i].link}" class="btn btn-primary">Click here to read more...</a>
                                </div>
                            </div>`;
            }
            else {
            div.setAttribute(`class`, `carousel-item`);
            div.innerHTML = `<div class="card adventure-card">
                                <img src="${adventures.items[i].enclosure.link}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h3 class="card-title">${adventures.items[i].title}</h3>
                                    <p class="card-text">${adventures.items[i].description}</p>
                                    <a href="${adventures.items[i].link}" class="btn btn-primary">Click here to read more...</a>
                                </div>
                            </div>`;
            }
            carousalInner.append(div) 
            console.log(i, carousalInner);  
        }
        
        superdiv.append(carousalInner);

        let prevButton = document.createElement("button");
        prevButton.setAttribute(`class`, `carousel-control-prev`);
        prevButton.setAttribute(`type`, `button`);
        prevButton.setAttribute(`data-bs-target`, `#carousel${news_id}`);
        prevButton.setAttribute(`data-bs-slide`, `prev`);
        prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>`;

        let nextButton = document.createElement("button");
        nextButton.setAttribute(`class`, `carousel-control-next`);
        nextButton.setAttribute(`type`, `button`);
        nextButton.setAttribute(`data-bs-target`, `#carousel${news_id}`);
        nextButton.setAttribute(`data-bs-slide`, `next`);
        nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>`;
        
        superdiv.append(prevButton);
        superdiv.append(nextButton);
        data.append(superdiv);
       
    }
    catch{
        console.log("Issue with reading news from the links")
    }    
}
// Image, Title and Description.
// href the news link



fetchNews(magazines[0], "politics");
fetchNews(magazines[1], "sports");
fetchNews(magazines[2], "health");
