const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving circle');
    const video = document.querySelector('.videoC video');
    //Sounds
    const sounds = document.querySelectorAll('.sound button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time button');
    // Get length outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Duration
    let fakeD = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick a sound
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlay(song);
        });
    });

    //play Sound
    play.addEventListener('click', () =>{
        checkPlay(song);
    });

    //Select your time
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            fakeD = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeD / 60)}:${Math.floor(fakeD % 60)}`;
        });
    });

    //stop sound
    const checkPlay = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src = "./svg/play.svg"
        }
    };

    //time settings
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeD - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
    
    //Circle Animation
    let progress = outlineLength - (currentTime / fakeD) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Text Animation
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if(currentTime >= fakeD){
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
    };




    }
    

};


app();