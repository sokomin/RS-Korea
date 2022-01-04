// 〇時間前、という表記に使う。.js-relative-timeタグがあるところに使用。
const UNITS = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
};

const now = new Date();

const relativeTimeFormat = new Intl.RelativeTimeFormat(navigator.languages, { numeric: "auto" });

function getRelativeTime(when, now) {
    const elapsed = when - now;

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in UNITS)
        if (Math.abs(elapsed) > UNITS[u] || u == "second")
            return relativeTimeFormat.format(Math.round(elapsed / UNITS[u]), u);
}

// 日本時間に直す。index.js自体はchromeのデバッグツールからも確認可能
function getJstFormatedTime(when) {
    // var date = new Date(Date.parse(when.toISOString().split('Z')[0]+'+09:00'));
    var date = new Date(when); //面倒なのでブラウザの時刻に任せることにした
    var date_str = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    return date_str;
}

document.querySelectorAll(".js-relative-time").forEach((timeElement) => {
    const publishDate = new Date(timeElement.getAttribute("datetime"));
    timeElement.textContent = getRelativeTime(publishDate, now);
});

document.querySelectorAll(".jst-iso-time").forEach((timeElement) => {
    const publishDate = new Date(timeElement.getAttribute("datetime"));
    timeElement.textContent = getJstFormatedTime(publishDate);
});
