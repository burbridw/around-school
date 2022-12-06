const roomsGrid = document.querySelector(".rooms-grid")
const moverGrid = document.querySelector(".mover-grid")
const entrance = document.querySelector(".entrance")
const charSelect = document.querySelector(".char-window")

let gameActive = false
let secret = false
let treasureLoc = ""
let moverPosition = 38
let currentMover = 0

const allRoomsArr = ["./images/school/img1.png","./images/school/img2.png", "./images/school/img3.png", "./images/school/img4.png", "./images/school/img5.png", "./images/school/img6.png", "./images/school/img7.png", "./images/school/img8.png", "./images/school/img9.png", "./images/school/img10.png", "./images/school/img11.png", "./images/school/img12.png", "./images/school/img13.png", "./images/school/img14.png", "./images/school/img15.png", "./images/school/img16.png"]
const numbersArr = ["./images/numbers/img1.png","./images/numbers/img2.png", "./images/numbers/img3.png", "./images/numbers/img4.png", "./images/numbers/img5.png", "./images/numbers/img6.png", "./images/numbers/img7.png", "./images/numbers/img8.png", "./images/numbers/img9.png", "./images/numbers/img10.png", "./images/numbers/img11.png", "./images/numbers/img12.png"]

const roomsObj = {
    "classroom": "./images/school/img1.png",
    "gym": "./images/school/img4.png",
    "playground": "./images/school/img5.png",
    "pool": "./images/school/img6.png",
    "music room": "./images/school/img3.png",
    "science room": "./images/school/img12.png",
    "arts and crafts room": "./images/school/img15.png",
    "library": "./images/school/img2.png",
    "nurse's office": "./images/school/img8.png",
    "teachers' office": "./images/school/img7.png",
    "principal's office": "./images/school/img9.png",
    "restroom": "./images/school/img11.png",
    "entrance": "./images/school/img10.png",
}
const moverObj = {
    "person": "./images/movers/person.png",
    "elephant": "./images/movers/elephant.png",
    "redcar": "./images/movers/redcar.png",
    "bicycle": "./images/movers/bicycle.png",
    "policecar": "./images/movers/policecar.png",
    "fighterjet": "./images/movers/fighterjet.png"
}
let theMover = Object.values(moverObj)[currentMover]

const entryObj = {
    0: 0, 2: 1, 4: 2, 6: 3, 14: 4, 16: 5, 18: 6, 20: 7, 28: 8, 30: 9, 32: 10, 34: 11
}



function buildCharSelect() {
    theMover = Object.values(moverObj)[currentMover]
    charSelect.innerHTML = `
    <div class="current-char"><img src="${theMover}"></div>`
}
buildCharSelect()

function changeChar() {
    if ( currentMover < Object.keys(moverObj).length-1 ) {
        currentMover++
    } else {
        currentMover = 0
    }
    theMover = Object.values(moverObj)[currentMover]
    charSelect.innerHTML = `
    <div class="current-char"><img src="${theMover}"></div>`
    document.querySelector(".mover").src = theMover
}


const practiceBtn = document.querySelector(".practice")
const treasureBtn = document.querySelector(".treasure")
const secretBtn = document.querySelector(".secret")
const leftBtn = document.querySelector(".left")
const straightBtn = document.querySelector(".straight")
const rightBtn = document.querySelector(".right")

charSelect.addEventListener("click",changeChar)

practiceBtn.addEventListener("click",()=>{
    if ( !practiceBtn.classList.contains("toggleon") ) {
        document.querySelector(".toggleon").classList.remove("toggleon")
        practiceBtn.classList.add("toggleon")
    }
    startPractice()
})
treasureBtn.addEventListener("click",()=>{
    if ( !treasureBtn.classList.contains("toggleon") ) {
        document.querySelector(".toggleon").classList.remove("toggleon")
        treasureBtn.classList.add("toggleon")
    }
    startTreasure()
})
secretBtn.addEventListener("click",()=>{
    if ( !secretBtn.classList.contains("toggleon") ) {
        document.querySelector(".toggleon").classList.remove("toggleon")
        secretBtn.classList.add("toggleon")
    }
    startSecret()
})
leftBtn.addEventListener("click",left)
straightBtn.addEventListener("click",forward)
rightBtn.addEventListener("click",right)

startPractice()

function startPractice() {
    gameActive = false
    secret = false
    treasureLoc = ""
    roomsGrid.innerHTML = ""
    for ( let i = 0; i < 12; i++) {
        roomsGrid.innerHTML += 
        `
            <div class="room-box">
                <div class="flipper unflipped">
                <div class="flipper-front">
                <img src="${Object.values(roomsObj)[i]}">
                </div>
                <div class="flipper-back">
                </div>
                </div>
            </div>
        `
    }
    entrance.innerHTML = `
    <img src="${roomsObj["entrance"]}">
    `
    movers()
}
function startTreasure() {
    gameActive = true
    secret = false
    treasureLoc = ""
    roomsGrid.innerHTML = ""
    for ( let i = 0; i < 12; i++) {
        roomsGrid.innerHTML += 
        `
            <div class="room-box">
                <div class="flipper unflipped">
                <div class="flipper-front">
                <img src="${Object.values(roomsObj)[i]}">
                </div>
                <div class="flipper-back">
                </div>
                </div>
            </div>
        `
    }
    let getRandom = Math.floor( Math.random()*12 )
    let allBack = document.querySelectorAll(".flipper-back")
    allBack[getRandom].innerHTML = `<img src="./images/commonitems/img20.png">`
    treasureLoc = getRandom
    entrance.innerHTML = `
    <img src="${roomsObj["entrance"]}">
    `
    movers()
}

function startSecret() {
    gameActive = true
    secret = true
    let roomsList = Object.values(roomsObj).slice(0,12)
    roomsList.sort( ()=> {return 0.5 - Math.random() } )
    roomsGrid.innerHTML = ""
    for ( let i = 0; i < 12; i++) {
        roomsGrid.innerHTML += 
        `
            <div class="room-box">
                <div class="flipper unflipped">
                <div class="flipper-front secret-mode">
                <img src="${numbersArr[i]}">
                </div>
                <div class="flipper-back secret-mode">
                <img src="${roomsList[i]}">
                </div>
                </div>
            </div>
        `
    }
    entrance.innerHTML = `
    <img src="${roomsObj["entrance"]}">
    `
    movers()
}

function movers() {
    moverGrid.innerHTML = ""
    moverPosition = 38
    for ( let i = 0; i < 42; i++ ) {
        moverGrid.innerHTML += `
        <div class="mover-box"></div>
        `
    }
    for ( let i = 0; i < 35; i++ ) {
        moverGrid.children[i].classList.add("can-move")
        if ( i === 6 ) {
            i = 13
        } else if ( i === 20 ) {
            i = 27
        }
    }
    for ( let i = 0; i <= 35; i+=2 ) {
        moverGrid.children[i].classList.add("entry")
        if ( i === 6 ) {
            i = 12
        } else if ( i === 20 ) {
            i = 26
        }
    }
    moverGrid.children[38].innerHTML += `
    <img class="mover north" src="${theMover}">
    `
}

addEventListener("keydown", (x) => {
    let mover = document.querySelector(".mover")
    if (x.key === "ArrowUp") {
        forward()
    } else if ( x.key === "ArrowLeft" ) {
        left()
    } else if ( x.key === "ArrowRight" ) {
        right()
    }
})

function forward() {
    straightBtn.classList.add("whiten")
    setTimeout(()=>{
        straightBtn.classList.remove("whiten")
    },300)
    let mover = document.querySelector(".mover")
    if ( moverPosition === 38 && mover.classList.contains("north") ) {
        moverGrid.children[moverPosition-7].classList.add("ishere")
        moverGrid.children[moverPosition].innerHTML = ""
        moverGrid.children[moverPosition-7].innerHTML =`
        <img class="mover north" src="${theMover}">
        `
        moverPosition -= 7
    } else if ( mover.classList.contains("north") ) {
        if ( moverGrid.children[moverPosition].classList.contains("entry") ) {
            let entryPoint = entryObj[moverPosition]
            if ( gameActive ) {
                roomsGrid.children[entryPoint].children[0].style.transform = "rotatex(180deg)"
                if ( !secret && entryPoint != treasureLoc ) {
                setTimeout( ()=>{
                    roomsGrid.children[entryPoint].children[0].style.transform = "rotatex(0deg)"
                },2000)
            }
            } else {
                roomsGrid.children[entryPoint].children[0].classList.add("highlight")
                setTimeout( ()=>{
                    roomsGrid.children[entryPoint].children[0].classList.remove("highlight")
                },2000)

            }

        } else if ( moverGrid.children[moverPosition-14].classList.contains("can-move") ) {
            document.querySelector(".ishere").classList.remove("ishere")
            moverGrid.children[moverPosition-14].classList.add("ishere")
            moverGrid.children[moverPosition].innerHTML = ""
            moverGrid.children[moverPosition-14].innerHTML =`
            <img class="mover north" src="${theMover}">
            `
            moverPosition -= 14
        }
    } else if ( mover.classList.contains("west") ) {
        if ( moverGrid.children[moverPosition-1].classList.contains("can-move") ) {
            document.querySelector(".ishere").classList.remove("ishere")
            moverGrid.children[moverPosition-1].classList.add("ishere")
            moverGrid.children[moverPosition].innerHTML = ""
            moverGrid.children[moverPosition-1].innerHTML =`
            <img class="mover west" src="${theMover}">
            `
            moverPosition -= 1
        }
    } else if ( mover.classList.contains("east") ) {
        if ( moverGrid.children[moverPosition+1].classList.contains("can-move") ) {
            document.querySelector(".ishere").classList.remove("ishere")
            moverGrid.children[moverPosition+1].classList.add("ishere")
            moverGrid.children[moverPosition].innerHTML = ""
            moverGrid.children[moverPosition+1].innerHTML =`
            <img class="mover east" src="${theMover}">
            `
            moverPosition += 1
        }
    } else if ( mover.classList.contains("south") ) {
        if ( moverPosition === 31 ) {
            document.querySelector(".ishere").classList.remove("ishere")
            moverGrid.children[38].classList.add("ishere")
            moverGrid.children[moverPosition].innerHTML = ""
            moverGrid.children[38].innerHTML =`
            <img class="mover south" src="${theMover}">
            `
            moverPosition = 38
        } else if ( moverGrid.children[moverPosition+14].classList.contains("can-move") && !moverGrid.children[moverPosition].classList.contains("entry") ) {
            document.querySelector(".ishere").classList.remove("ishere")
            moverGrid.children[moverPosition+14].classList.add("ishere")
            moverGrid.children[moverPosition].innerHTML = ""
            moverGrid.children[moverPosition+14].innerHTML =`
            <img class="mover south" src="${theMover}">
            `
            moverPosition += 14
        }
    }
}
function left() {
    leftBtn.classList.add("whiten")
    setTimeout(()=>{
        leftBtn.classList.remove("whiten")
    },300)
    let mover = document.querySelector(".mover")
    if (mover.classList.contains("north") ) {
        mover.classList.remove("north")
        mover.classList.add("west")
    } else if ( mover.classList.contains("west") ) {
        mover.classList.remove("west")
        mover.classList.add("south")
    } else if ( mover.classList.contains("south") ) {
        mover.classList.remove("south")
        mover.classList.add("east")
    } else if ( mover.classList.contains("east") ) {
        mover.classList.remove("east")
        mover.classList.add("north")
    }
}
function right() {
    rightBtn.classList.add("whiten")
    setTimeout(()=>{
        rightBtn.classList.remove("whiten")
    },300)
    let mover = document.querySelector(".mover")
    if (mover.classList.contains("north") ) {
        mover.classList.remove("north")
        mover.classList.add("east")
    } else if ( mover.classList.contains("east") ) {
        mover.classList.remove("east")
        mover.classList.add("south")
    } else if ( mover.classList.contains("south") ) {
        mover.classList.remove("south")
        mover.classList.add("west")
    } else if ( mover.classList.contains("west") ) {
        mover.classList.remove("west")
        mover.classList.add("north")
    }
}