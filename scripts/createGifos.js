let window_video = document.getElementById('window_video');
let btn_start = document.getElementById('btn_start');
let request_divices = () => {
    event.preventDefault();
    navigator.mediaDevices.getUserMedia({ 
        audio: false,
        video: {
            width: { max:480 },
            height: { max: 320 }
       }
    }).then(stream =>{
        window_video.srcObject = stream;
        window_video.play();
        
    }).catch(console.error);
}
btn_start.addEventListener('click',() => {
    event.preventDefault();
    request_divices();
});