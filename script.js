
// console.log('hello js');

let currentSong = new Audio()

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(){
let a = await fetch("http://127.0.0.1:3000/songs/")
let response = await a.text() ;
console.log(response);
let div = document.createElement("div")
div.innerHTML = response
let as=div.getElementsByTagName("a")
let songs = []
for (let index =0; index <as.length; index++) {
    const element = as [index];
    if (element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
}
return songs
} 
const playMusic = (track) => {
//    let audio = new Audio("/songs/"+ track)
 currentSong.src = "/songs/"+ track
   currentSong.play()
   play.src="../img/pause.svg"
   document.querySelector(".songinfo").innerHTML = decodeURI(track)
   document.querySelector(".songtime").innerHTML = "00:00/00:00"
}
// function playMusic(track) {
//     currentSong.src = "/songs/" + track;
//     currentSong.play();
  
//     if (currentSong.paused) {
//       play.src = "img/play.svg"; // Set play icon if paused
//     } else {
//       play.src = "img/pause.svg"; // Set pause icon if playing
//     }
//   }


async function main(){
    let songs = await getSongs()
    console.log(songs);

//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
// for (const song of songs) {
//     songUL.innerHTML += `<li> 
//                         <img class="invert" src="img/music.svg" alt="">
//                         <div class="info">
//                             <div>${song.replaceAll("%20", " ")}</div>
//                             <div>Song Artist</div>
//                         </div>
//                         <div class="playnow">
//                             <span>Play Now </span>
//                             <img class="invert" src="img/play.svg" alt="">
//                         </div>
//         </li>`;
// }





let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`;
    }

     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
          console.log(e.querySelector(".info").firstElementChild.innerHTML);
          playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
      });
      

    play.addEventListener("click", ()=> {
      if(currentSong.paused){
        currentSong.play()
        play.src="../img/pause.svg"
      }
      else{
        currentSong.pause()
        play.src = "../img/play.svg"
      }
    }
    )




    function playMusic(track) {
        currentSong.src = "/songs/" + track;
        currentSong.play();
      
        if (currentSong.paused) {
          play.src = "img/play.svg"; // Set play icon if paused
        } else {
          play.src = "img/pause.svg"; // Set pause icon if playing
        }
      
    //     // Add event listener to currentSong (assuming it's defined elsewhere)
    //     currentSong.addEventListener("timeupdate", () => {
    //       console.log(currentSong.currentTime, currentSong.duration);
    //       document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    //     });
    //   }
      
    //   // Assuming you have a function to format time (secondsToMinutesSeconds)
    //   // ...
      
    //   main(); // No semicolon needed here
      
    //   // Play the first song (assuming songs array is populated)
    //   currentSong.src = "/songs/" + songs[0];
    //   currentSong.play();




    currentSong.addEventListener("timeupdate", ()=>{
    console.log(currentSong.currentTime, currentSong.duration)
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    
    })
    



    var audio = new Audio(songs[0]);
     audio.play(); 
    
}
main()
}
