const roomsGrid = document.querySelector(".rooms-grid")
const moverGrid = document.querySelector(".mover-grid")
const entrance = document.querySelector(".entrance")

let moverPosition = 38

const allRoomsArr = ["./images/school/img1.png","./images/school/img2.png", "./images/school/img3.png", "./images/school/img4.png", "./images/school/img5.png", "./images/school/img6.png", "./images/school/img7.png", "./images/school/img8.png", "./images/school/img9.png", "./images/school/img10.png", "./images/school/img11.png", "./images/school/img12.png", "./images/school/img13.png", "./images/school/img14.png", "./images/school/img15.png", "./images/school/img16.png"]

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
    "elephant": "./images/movers/elephant.png",
    "redcar": "./images/movers/redcar.png",
    "bicycle": "./images/movers/bicycle.png",
    "policecar": "./images/movers/policecar.png",
    "fighterjet": "./images/movers/fighterjet.png",
}
start()

function start() {
    for ( let i = 0; i < 12; i++) {
        roomsGrid.innerHTML += 
        `
            <div class="room-box">
                <img src="${Object.values(roomsObj)[i]}">
                <div class="middle-dot"></div>
                <div class="corner-dot"></div>
            </div>
        `
    }
    entrance.innerHTML = `
    <img src="${roomsObj["entrance"]}">
    <div class="corner-dot"></div>
    `
}



let theMover = moverObj["fighterjet"]
movers()
function movers() {
    for ( let i = 0; i < 42; i++ ) {
        moverGrid.innerHTML += `
        <div class="mover-box"></div>
        `
    }
    for ( let i = 0; i < 7; i++ ) {
        moverGrid.children[i].classList.add("can-move")
    }
    for ( let i = 14; i < 21; i++ ) {
        moverGrid.children[i].classList.add("can-move")
    }
    for ( let i = 28; i < 35; i++ ) {
        moverGrid.children[i].classList.add("can-move")
    }
    moverGrid.children[38].innerHTML += `
    <img class="mover north" src="${theMover}">
    `
}

addEventListener("keydown", (x) => {
    let mover = document.querySelector(".mover")
    if (x.key === "ArrowUp") {
        console.log("up")
        getMoverPos()
    } else if ( x.key === "ArrowLeft" ) {
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
    } else if ( x.key === "ArrowRight" ) {
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
})

function getMoverPos() {
    let mover = document.querySelector(".mover")
    if ( moverPosition === 38 && mover.classList.contains("north") ) {
        moverGrid.children[moverPosition-7].classList.add("ishere")
        moverGrid.children[moverPosition].innerHTML = ""
        moverGrid.children[moverPosition-7].innerHTML =`
        <img class="mover north" src="${theMover}">
        `
        moverPosition -= 7
    } else if ( mover.classList.contains("north") ) {
        if ( moverGrid.children[moverPosition-14].classList.contains("can-move") ) {
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
        if ( moverGrid.children[moverPosition+14].classList.contains("can-move") ) {
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