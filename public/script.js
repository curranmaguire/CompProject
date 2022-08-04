//----------plan for the mongoose----------
//planned functionality
//add data to my front end

const triggerTabList = document.querySelectorAll("#myTab button");
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", (event) => {
    event.preventDefault();
    tabTrigger.show();
    console.log(tabTrigger);
  });
});

//---------------------------------------------Sellers funcitons---------------------

//get request that creates lsit elements from returned products
let url = "http://localhost:4000/seller";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map((seller,index)=>{
        createSeller(seller)
        
      }
      )
      })
    

    

//------------on website load populate the sellers navbar------------
function createSeller(seller) {

  //create the navbar elements for each seller
  let  navbar = document.getElementById("sellers");
  let li = document.createElement("li")
  li.className = "nav-item"
  li.setAttribute("role","presentation")

  let button = document.createElement("button")
  button.className = "nav-link"
  button.setAttribute("id",seller._id)
  button.setAttribute("data-toggle","tab")
  button.setAttribute("data-target","#" + seller._id)
  button.setAttribute("type","button")
  button.setAttribute("role","tab")
  button.setAttribute("aria-controls", seller._id)
  button.setAttribute("aria-selected","true")
  open = seller._id + "product"
  button.onclick = function(){buttonToggle(open)}
  button.textContent = seller.name
  li.appendChild(button)
  navbar.appendChild(li)

    //create the products items

  let   productDisplay = document.getElementById("products")
  let div = document.createElement("div")
  div.className = "tab-pane "
  div.setAttribute("id", open)
  if(seller.products.length == 0){
    let h3 = document.createElement("h3")
    h3.textContent = seller.name
    div.appendChild(h3)
    let p = document.createElement(p)
    p.textContent = seller.description
    div.appendChild(p)
  }else{
    let container = document.createElement("div")
    container.className = "container"
    let productsBody = document.createElement("div")
      productsBody.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
    function cardCreator(product){
      let card = document.createElement("div")
      card.className = "col"
      let cardBody = document.createElement("div")
      cardBody.className = "card shadow-sm"
      let img = document.createElement("img")
      img.className = "card-img-top"
      img.setAttribute("width","100%")
      img.setAttribute("height","225")
      img.setAttribute("src",product.image)
      img.setAttribute("role","img")
      img.setAttribute("aria-label","Placeholder: Thumbnail")
      img.setAttribute("preserveAspectRatio","xMidYMid slice")
      img.setAttribute("focusable","false")
      let cardText = document.createElement("div")
      cardText.className = "card-body"
      let h6 = document.createElement("h6")
      h6.className = "text-start"
      h6.textContent = product.name
      let p = document.createElement("p")
      p.className = "card-text text-start"
      p.textContent = product.description
      let price = document.createElement("div")
      price.className = "d-flex justify-content-between align-items-center"
      let priceText = document.createElement("small")
      priceText.className = "text-muted"
      priceText.textContent = product.price
      price.appendChild(priceText)
      cardText.appendChild(h6)
      cardText.appendChild(p)
      cardText.appendChild(price)
      cardBody.appendChild(img)
      cardBody.appendChild(cardText)
      card.appendChild(cardBody)
      productsBody.appendChild(card)
      container.appendChild(productsBody)
      div.appendChild(container)
      productDisplay.appendChild(div)
    }
    seller.products.forEach((product)=>cardCreator(product))

    //link the buttons and products
    

  }
}

//function to hide and show items for sellers

open = ""
function buttonToggle(location,){
  console.log(location)
  document.getElementById(open).className = "tab-pane fade"
  document.getElementById(location).className = "tab-pane fade active show"
  open = location
  }


/*
//artist list creation
createList("/artist", "artistList");
function addFormArtist() {
  let url = "http://localhost:4000/stadium";
  let element = document.getElementById("artistFormStadium");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map(function (stadium) {
        let option = document.createElement("option");
        option.setAttribute("value", stadium._id);

        option.appendChild(document.createTextNode(stadium.name));
        element.appendChild(option);
      });
    });
}
addFormArtist();
//------------------select artist using get----------------------

function selectAndDisplayArtist(item) {
  let url = "http://localhost:4000/artist/" + item;
  artistName = document.getElementById("artistName");
  artistDOB = document.getElementById("artistDob");
  artistSong = document.getElementById("artistSongs");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(artistName);
      artistName.textContent = "Name: " + data.name;
      artistDOB.textContent = "Date Of Birth: " + data.dob;
      artistSongs.textContent =
        "Songs: " + data.songs.map((song) => song.name).toString();
    });
}

//-------------------add an artist-------------------
function addArtist() {
  const name = document.getElementById("artistFormName").value;
  const dob = document.getElementById("artistFormDob").value;
  const stadium = document.getElementById("artistFormStadium").value;

  const newArtist = {
    name: name,
    dob: dob,
    stadium: stadium,
  };

  let url = "http://localhost:4000";
  fetch(url + "/artist/new", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArtist),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => alert(res.status + ": " + text));
    }
    document.location.reload();
  });
}

////----------------------------------song functions-----------------------
//------------------song list creation----------------------
function createSongList(dataLocation, targetList) {
  let element = document.getElementById(targetList);
  let url = "http://localhost:4000" + dataLocation;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map(function (obj) {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.setAttribute("style", "cursor: pointer;");
        li.setAttribute("onclick", 'selectAndDisplaySong("' + obj._id + '")');
        li.appendChild(
          document.createTextNode(
            "name: " + obj.name + ", Length: " + obj.length
          )
        );
        element.appendChild(li);
      });
    })
    .then(function () {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      li.setAttribute("style", "cursor: pointer;");

      li.setAttribute("data-toggle", "modal");
      li.setAttribute("data-target", "#addSong");

      li.setAttribute("type", "button");

      li.appendChild(document.createTextNode("+Add Song"));
      element.appendChild(li);
    });
}
createSongList("/song", "songList");

function selectAndDisplaySong(item) {
  item.replace(/\s/g, "-");
  let url = "http://localhost:4000/song/" + item;
  artistName = document.getElementById("songName");
  artistDOB = document.getElementById("songLength");
  artistSong = document.getElementById("songArtists");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      artistName.textContent = "Name: " + data.name;
      artistDOB.textContent = "Length: " + data.length;
      artistSongs.textContent = "Sung By: " + data.artist.name;
    });
}

function addFormSongs() {
  let url = "http://localhost:4000/artist";
  let element = document.getElementById("songFormSelect");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map(function (artist) {
        let option = document.createElement("option");
        option.setAttribute("value", artist._id);

        option.appendChild(document.createTextNode(artist.name));
        element.appendChild(option);
      });
    });
}
addFormSongs();
function addSong() {
  //get all options from the form
  const name = document.getElementById("songFormName").value;
  const length = document.getElementById("songFormLength").value;
  const artist = document.getElementById("songFormSelect").value;

  const newSong = {
    name: name,
    length: length,
    artist: artist,
  };

  let url = "http://localhost:4000";
  fetch(url + "/song/new", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSong),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => alert(res.status + ": " + text));
    }
    document.location.reload();
  });
}

//----------------stadium list creation ------------------
function createStadiumList(dataLocation, targetList) {
  let element = document.getElementById(targetList);
  let url = "http://localhost:4000" + dataLocation;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map(function (obj) {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.setAttribute("style", "cursor: pointer;");
        li.setAttribute(
          "onclick",
          'selectAndDisplayStadium("' + obj._id + '")'
        );
        li.appendChild(document.createTextNode("name: " + obj.name));
        element.appendChild(li);
      });
    })
    .then(function () {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      li.setAttribute("style", "cursor: pointer;");

      li.setAttribute("data-toggle", "modal");
      li.setAttribute("data-target", "#addStadium");

      li.setAttribute("type", "button");

      li.appendChild(document.createTextNode("+Add Stadium"));
      element.appendChild(li);
    });
}
createStadiumList("/stadium", "stadiumList");
//add artist buttons to work

function addItemToList(dataLocation, targetList, dataType) {
  let element = document.getElementById(targetList);
  let url = "http://localhost:4000" + dataLocation;
  fetch(url, {
    method: "post",
    body: post,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if (res.status === 201) {
        console.log("Post successfully created!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function addStadium() {
  //get all options from the form
  const name = document.getElementById("stadiumFormName").value;
  const imgUrl = document.getElementById("stadiumFormUrl").value;
  const about = document.getElementById("stadiumFormAbout").value;

  const newStadium = {
    name: name,
    about: about,
    img: imgUrl,
  };

  let url = "http://localhost:4000";
  fetch(url + "/stadium/new", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStadium),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => alert(res.status + ": " + text));
    }
    document.location.reload();
  });
}
function selectAndDisplayStadium(item) {
  let url = "http://localhost:4000/stadium/" + item;
  stadiumName = document.getElementById("stadiumName");
  stadiumABout = document.getElementById("stadiumAbout");
  stadiumImg = document.getElementById("stadiumImg");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      stadiumName.textContent = data.name;
      stadiumAbout.textContent = data.about;
      artistSongs.src = data.img;
    });
}

*/
