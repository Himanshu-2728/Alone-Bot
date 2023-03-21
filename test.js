let bannedWord = ['fuck' , 'ass']

let msg = 'thismeassagefuc'
let messageContains = []
// console.log(msg.match('fuck'))
for(const i of bannedWord){
    try{
        let a = msg.match(i)
        messageContains.push(a[0])

    }catch{
        return
    }
    
}

console.log(messageContains)