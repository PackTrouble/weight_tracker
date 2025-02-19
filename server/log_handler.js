export function Log(type, message) {

    switch (type) {
        case "e":
            console.log(`!!!!\nError\n-------\n${message}\n!!!!`)
            break;
        case "i":
            console.log(`!!!!\nInformation\n-------\n${message}\n!!!!`)
            break;
        case "d":
            console.log(`????\nDebug\n-------\n${message}\n????`)
            break;
        default:
            break;
    }


}