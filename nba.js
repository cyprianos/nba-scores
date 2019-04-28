function downloadData() {
    return fetch('https://programistyczna-samodzielnosc.github.io/nba-scores/data.json').then(function (response) {
        return response.json()
    })
}

function App(data) {
    const DAY_IN_MS = 24 * 60 * 60 * 1000 //86400000

    let currentDate = new Date()

    let dayPrevious = document.getElementById('gamemenu__previous')
        .onclick = function () {
            currentDate = new Date(currentDate.getTime() - DAY_IN_MS)
            matchesDraw(data, currentDate)
            calendarDraw(currentDate)
        }
    let dayNext = document.getElementById('gamemenu__next')
        .onclick = function () {
            currentDate = new Date(currentDate.getTime() + DAY_IN_MS)
            matchesDraw(data, currentDate)
            calendarDraw(currentDate)
        }

    matchesDraw(data, currentDate)
    calendarDraw(currentDate)

    //musimy wiedziec jaki jest dzien
    //przefiltrowac dane i wyswietlic odpowiednie mecze

    //klikanie w lewo i prawo po to zeby przefiltrowac mecze pod katem iinnej daty
}

function calendarDraw(day) {

    let calendarDate = document.getElementById('calendar__date')
    calendarDate.innerText = intlFormat(day);
    // Friday,&nbsp;Apr.&nbsp;26
}

function intlFormat(someDate) {
    let intl = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', month: 'short', day: 'numeric'
    })
        .format(someDate)
    let splat = intl.split(' ')
    splat[1]+='.'
    return splat.join(' ')
}

function matchesDraw(data, day) {
    let filtered = data.filter(function (match) {
        return new Date(match.Date).toDateString() === day.toDateString()
    })

    let result = filtered
        .reduce((result, match) => result + matchHTML(match), "")

    document.getElementById('matches').innerHTML = result
}


function matchHTML(matchParams) {
    const {
        Team_HOME, Team_AWAY, Team_HOME_LOGO, Team_AWAY_LOGO,
        Team_HOME_PTS, Team_AWAY_PTS, MATCH_STATUS, PLAYOFF_DESC,
        GAME_DESC
    } = matchParams
    return `
    <div class="match">
            <div class="match__heading">
                <div class="match__gametitle">${PLAYOFF_DESC[0]}</div>
                <div class="match__level">${PLAYOFF_DESC[1]}</div>
            </div>
            <div class="match__result">
                <div class="match__info">
                    <div class="match__final">${MATCH_STATUS}</div>
                    <div class="match__ticket">LEAGUE  PASS</div>
                </div>
                <div class="match__team match__host">
                    <img class="match__icon" src="${Team_HOME_LOGO}">
                    <div class="match__teamname">${Team_HOME}</div>
                    <div class="match__score">${Team_HOME_PTS}</div>
                </div>
                <div class="match__team match__guest">
                    <img class="match__icon" src="${Team_AWAY_LOGO}">
                    <div class="match__teamname">${Team_AWAY}</div>
                    <div class="match__score">${Team_AWAY_PTS}</div>
                </div>
            </div>
            <div class="match__statistics">${GAME_DESC}</div>
            <div class="match__navigation">
                <a href="#" class="match__button">WATCH</a>
                <a href="#" class="match__button">TICKETS</a>
                <a href="#" class="match__button">GAME DETAIL</a>
            </div>
        </div>
    `
}
window.onload = function () {
    downloadData().then(App)
}





