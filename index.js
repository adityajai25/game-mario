//import platform from '/images/platform.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const gravity =0.5
class Player{
    constructor(){
        this.position = {
            x : 100,
            y : 100
        }
        this.velocity = {
            x : 0,
            y : 1
        }
        this.width = 30
        this.height = 30
        }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.velocity.y + this.height <= canvas.height)
                this.velocity.y += gravity 
        else this.velocity.y = 0
    }
}
class Platform {
    constructor({x , y}) {
        this.position = {
            x , y    
        }
        this.width = 200
        this.height = 20.2
    }
    draw(){
        c.fillStyle = "blue"
        c.fillRect(this.position.x,this.position.y,this.width, this.height)
    }
}
const player = new Player()
//const platform = new Platform()
const platforms = [new Platform({x : 200, y: 200}), new Platform({ x : 600, y: 400}), new Platform({ x : 1000, y: 600})]
const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    }
}
let scoreoffset = 0
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    platforms.forEach((platform) => {
    platform.draw()
    })
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }
    else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x =- 5
    }
    else {player.velocity.x = 0
        if(keys.right.pressed){
            scoreoffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
           // platform.position.x -=5
        }
        else if(keys.left.pressed){
            scoreoffset -= 5
            platforms.forEach((platform) => {
                platform.position.x +=5
            })
           // platform.position.x +=5
        }
    }
    console.log(scoreoffset)
    // collision detection
    platforms.forEach((platform) => {
    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
    })
if (scoreoffset > 2000){
    console.log('You Win the game')
    window.alert('Congrats, You won the game')
    window.alert('Your score :+',+scoreoffset)
}}
animate()
addEventListener('keydown',({keyCode}) => {
    //console.log(keyCode)
    switch(keyCode){
        case 37: 
            console.log('left')
            keys.left.pressed = true
            break
        case 40:
            console.log('down')
            break
        case 39:
            console.log('right')
            keys.right.pressed = true
            break
        case 38:
            console.log('up')
            player.velocity.y =- 10
            break
    }
})
addEventListener('keyup',({keyCode}) => {
    //console.log(keyCode)
    switch(keyCode){
        case 37: 
            //console.log('left')
            keys.left.pressed = false
            break
        case 40:
            //console.log('down')
            break
        case 39:
            //console.log('right')
            keys.right.pressed = false
            break
        case 38:
            //console.log('up')
            player.velocity.y = -10
            break
    }
})
//jekpg