const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

function toHuman(milliseconds) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    while(milliseconds >= HOUR) {
        hours++;
        milliseconds -= HOUR;
    }

    while(milliseconds >= MINUTE) {
        minutes++;
        milliseconds -= MINUTE;
    }

    while(milliseconds >= SECOND) {
        seconds++;
        milliseconds -= SECOND;
    }

    const hPre = hours > 0 ? hours < 10 ? "0" : "" : "";
    const mPre = minutes > 0 ? minutes < 10 ? "0" : "" : "0";
    const sPre = seconds > 0 ? seconds < 10 ? "0" : "" : "0";

    const hStr = (hours > 0 ? hPre + hours + ":" : "");
    const mStr = mPre + minutes + ":";
    const sStr = sPre + seconds ;

    return hStr + mStr + sStr;
}