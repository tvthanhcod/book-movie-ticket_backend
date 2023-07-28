let canhHinhVuong = 5
let structor = ""

for (let i = 1; i <= canhHinhVuong; i++) {
    for (let j = 1; j <= canhHinhVuong; j++) {
        if (i == 1 || i == canhHinhVuong || j == 1 || j == canhHinhVuong) {
            structor += "*"
        } else {
            structor += " "
        }
    }
    structor += "\n"
}

console.log(structor)

