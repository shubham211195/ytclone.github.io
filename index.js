const API_KEY="AIzaSyC9JS9Fz5DbquQDkN1iOXLZJwLDTueGfC0";
const VIDEO_HTTP="https://www.googleapis.com/youtube/v3/videos?";
const CHANNEL_LIST="https://www.googleapis.com/youtube/v3/channels?";
const videoCardBox=document.querySelector('.video-box');
const searchInput=document.querySelector('.search');
const searchBtn=document.querySelector('.search-btn');

fetch(VIDEO_HTTP + new URLSearchParams({
    key:API_KEY,
    part:'snippet',
    chart:'mostPopular',
    maxResults:100,
    regionCode:'IN'
}))
.then(res=>res.json())
.then(data=>{
   data.items.forEach(item=>{
        getchannelIcon(item);
   })
})
.catch(err => console.log(err));
const getchannelIcon=(VideoData)=>{
    fetch(CHANNEL_LIST + new URLSearchParams({
        key:API_KEY,
        part:'snippet',
        id:VideoData.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=>{
        VideoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        console.log(VideoData)
        makeVideoCard(VideoData);
        
    })
}

const makeVideoCard=(data)=>{
    
    videoCardBox.innerHTML +=` 
    <div class="video" onclick="location.href= 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name"  >${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}
const searchLink="https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click',()=>{
    if(searchInput.value.length){
        location.href=searchLink + searchInput.value;
    }
})