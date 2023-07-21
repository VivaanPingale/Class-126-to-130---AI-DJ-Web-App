song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
function preload(){
    song = loadSound('music.mp3');
}
function setup(){
    canvas = createCanvas(750, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 750, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        num_leftWristY = Number(leftWristY);
        new_leftWristY = floor(num_leftWristY);
        volume = new_leftWristY / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if (score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById('speed').innerHTML = "Speed = 0.5";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200){
            document.getElementById('speed').innerHTML = "Speed = 1.0";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById('speed').innerHTML = "Speed = 1.5";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400){
            document.getElementById('speed').innerHTML = "Speed = 2.0";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <= 500){
            document.getElementById('speed').innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log('Model loaded!');
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left wrist x and y coordinates = " + leftWristX + " " + leftWristY);
        console.log("Right wrist x and y coordinates = " + rightWristX + " " + rightWristY);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of the left wrist = " + score_leftWrist);
        console.log("Score of the right wrist = " + score_rightWrist);
    }
}