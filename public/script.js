



//----------plan for the mongoose----------
//planned functionality 
//add data to my front end











//---------------------------------------------artist funcitons---------------------
function createList(dataLocation,targetList){
    let element = document.getElementById(targetList);
    let url = "http://localhost:4000"  + dataLocation 
    fetch(url)
    .then(res=>res.json())
    .then(data=> {
        
        data.map((item)=>{
            let li = document.createElement("li")
            li.classList.add("list-group-item")
            li.setAttribute("style","cursor: pointer;")
            li.setAttribute("id",item._id)
            li.appendChild(document.createTextNode(item.name))
            li.setAttribute("onclick","selectAndDisplayArtist(\"" + item._id +"\")")
            element.appendChild(li)
        })
    })
    .then(function(){
        let li = document.createElement("li")
        li.classList.add("list-group-item")
        li.setAttribute("id","add artist")
        li.setAttribute("style","cursor: pointer;")

        li.setAttribute("data-toggle","modal")
        li.setAttribute("data-target","#addArtist")
        li.setAttribute("type","button")

        li.appendChild(document.createTextNode("+Add Artist"))
        element.appendChild(li)
    })
}

//artist list creation
createList("/artist","artistList");
function addFormArtist(){
    let url = "http://localhost:4000/stadium"
    let element = document.getElementById("artistFormStadium")
    fetch(url)
    .then(res=>res.json())
    .then(data=>{data.map(function(stadium){
        
        let option = document.createElement("option")
        option.setAttribute('value', stadium._id )
        
        
        option.appendChild(document.createTextNode(stadium.name))
        element.appendChild(option)
    })})
}
addFormArtist()
//------------------select artist using get----------------------

function selectAndDisplayArtist(item){
    let url = "http://localhost:4000/artist/" + item 
    artistName = document.getElementById("artistName")
    artistDOB = document.getElementById("artistDob")
    artistSong = document.getElementById("artistSongs")
    fetch(url)
    .then (res=>res.json())
    .then(data => {
        console.log(artistName);
        artistName.textContent = ("Name: " + data.name)
        artistDOB.textContent = ("Date Of Birth: " + data.dob)
        artistSongs.textContent = ("Songs: " + data.songs.map(song=>song.name).toString())
    })
    

}

//-------------------add an artist-------------------
function addArtist(){
    const name = document.getElementById("artistFormName").value
    const dob = document.getElementById("artistFormDob").value
    const stadium = document.getElementById('artistFormStadium').value


    const newArtist = { 
        name:name,
        dob:dob,
        stadium:stadium
    }
    

    let url = "http://localhost:4000" 
    fetch(url+'/artist/new',{
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtist),})
        
        .then(res=>{
          
            
            if(!res.ok){
                return res.text().then(text=>alert(res.status+': '+text))
            
            }
            document.location.reload()})
      
    

    


}




////----------------------------------song functions-----------------------
//------------------song list creation----------------------
function createSongList(dataLocation,targetList){
    let element = document.getElementById(targetList)
    let url = "http://localhost:4000" + dataLocation
    fetch(url)
    .then(res=>res.json())
    .then(data=>{data.map(function(obj){
        
        let li = document.createElement("li")
        li.classList.add("list-group-item")
        li.setAttribute("style","cursor: pointer;")
        li.setAttribute("onclick","selectAndDisplaySong(\"" + obj._id +"\")")
        li.appendChild(document.createTextNode("name: " + obj.name + ", Length: " + obj.length))
        element.appendChild(li)
    })})
    .then(function(){
        let li = document.createElement("li")
        li.classList.add("list-group-item")
        li.setAttribute("style","cursor: pointer;")

        li.setAttribute("data-toggle","modal")
        li.setAttribute("data-target","#addSong")
        
        li.setAttribute("type","button")

        li.appendChild(document.createTextNode("+Add Song"))
        element.appendChild(li)
    })  
}
createSongList("/song","songList")

function selectAndDisplaySong(item){
    item.replace(/\s/g, '-')
    let url = "http://localhost:4000/song/" + item 
    artistName = document.getElementById("songName")
    artistDOB = document.getElementById("songLength")
    artistSong = document.getElementById("songArtists")
    fetch(url)
    .then (res=>res.json())
    .then(data => {
        artistName.textContent=("Name: " + data.name)
        artistDOB.textContent=("Length: " + data.length)
        artistSongs.textContent= ("Sung By: " + data.artist.name)
    })
    

}


function addFormSongs(){
    let url = "http://localhost:4000/artist"
    let element = document.getElementById("songFormSelect")
    fetch(url)
    .then(res=>res.json())
    .then(data=>{data.map(function(artist){
        
        let option = document.createElement("option")
        option.setAttribute('value', artist._id )
        
        
        option.appendChild(document.createTextNode(artist.name))
        element.appendChild(option)
    })})
}
addFormSongs()
function addSong(){
    
    
    //get all options from the form 
    const name = document.getElementById("songFormName").value
    const length = document.getElementById("songFormLength").value
    const artist= document.getElementById("songFormSelect").value

  
    const newSong = { 
        name:name,
        length:length,
        artist:artist
    }
    

    let url = "http://localhost:4000" 
    fetch(url+'/song/new',{
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),})
        
        .then(res=>{
          
            if(!res.ok){
                return res.text().then(text=>alert(res.status+': '+text))
            
            }
            document.location.reload()})
      
    

    


}


//----------------stadium list creation ------------------
function createStadiumList(dataLocation,targetList){
    let element = document.getElementById(targetList)
    let url = "http://localhost:4000" + dataLocation
    fetch(url)
    .then(res=>res.json())
    .then(data=>{data.map(function(obj){
        
        let li = document.createElement("li")
        li.classList.add("list-group-item")
        li.setAttribute("style","cursor: pointer;")
        li.setAttribute("onclick","selectAndDisplayStadium(\"" + obj._id + "\")")
        li.appendChild(document.createTextNode("name: " + obj.name))
        element.appendChild(li)
    })})
    .then(function(){
        let li = document.createElement("li")
        li.classList.add("list-group-item")
        li.setAttribute("style","cursor: pointer;")

        li.setAttribute("data-toggle","modal")
        li.setAttribute("data-target","#addStadium")
        
        li.setAttribute("type","button")

        li.appendChild(document.createTextNode("+Add Stadium"))
        element.appendChild(li)
    })  
}
createStadiumList("/stadium","stadiumList")
//add artist buttons to work

function addItemToList(dataLocation,targetList,dataType){
    let element = document.getElementById(targetList)
    let url = "http://localhost:4000" + dataLocation
    fetch(url, {
    method: 'post',
    body: post,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then((response) => {
    return response.json()
}).then((res) => {
    if (res.status === 201) {
        console.log("Post successfully created!")
    }
}).catch((error) => {
    console.log(error)
})
}

function addStadium(){
    
    
    //get all options from the form 
    const name = document.getElementById("stadiumFormName").value
    const imgUrl= document.getElementById("stadiumFormUrl").value
    const about = document.getElementById("stadiumFormAbout").value

  
    const newStadium = { 
        name:name,
        about:about,
        img:imgUrl
    }
    

    let url = "http://localhost:4000" 
    fetch(url+'/stadium/new',{
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStadium),})
        
        .then(res=>{
          
            if(!res.ok){
                return res.text().then(text=>alert(res.status+': '+text))
            
            }
            document.location.reload()})
      
    

    


}
function selectAndDisplayStadium(item){
    let url = "http://localhost:4000/stadium/" + item 
    stadiumName = document.getElementById("stadiumName")
    stadiumABout = document.getElementById("stadiumAbout")
    stadiumImg = document.getElementById("stadiumImg")
    fetch(url)
    .then (res=>res.json())
    .then(data => {
        stadiumName.textContent = (data.name)
        stadiumAbout.textContent = (data.about)
        artistSongs.src = data.img
    })
    

}



//------put out a list of stadiums 
/// when stadium clicked info a bout artists playing ther are displayed.
//when artist is clicked their info is displayed
//------put out a list of all music with the delected highlighted.
//------add to all lists.
//------document the server in twitter api style.
//------run tests
//------change any of the database items.
//makee video review.
