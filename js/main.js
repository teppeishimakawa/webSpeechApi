
var flag_speech = 0;
var recognition;


rec();


function rec()
{
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.interimResults = true;
recognition.continuous = true;

//window.onload=recognition.start();

recognition.onsoundstart = function()
 {
  document.getElementById('status').innerHTML = "認識中";
  var flag_speech = 1;
 };
recognition.onnomatch = function()
 {
  document.getElementById('status').innerHTML = "もう一度試してください";
 };
recognition.onerror= function()
 {
  document.getElementById('status').innerHTML = "エラー";
  if(flag_speech == 0)
  rec();
 };
recognition.onsoundend = function()
 {
  document.getElementById('status').innerHTML = "停止中";
  rec();
 };

recognition.onresult =function(e)
 {
 var results = event.results;
 for (var i = event.resultIndex; i < results.length; i++)
{
 if (results[i].isFinal)
 {
    document.getElementById('result_text').innerHTML = results[i][0].transcript;
    document.getElementById('hantei').innerHTML =results[i][0].confidence;
    rec();
 }
  else
 {
 document.getElementById('result_text').innerHTML = "[途中経過] " + results[i][0].transcript;
  flag_speech = 1;
  }
}



 };

flag_speech = 0;
document.getElementById('status').innerHTML = "start";
recognition.start();
}

