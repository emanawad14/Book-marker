var nameSite = document.getElementById('siteName')

var urlSite = document.getElementById('siteUrl')

var regularName = /\w{4}/
var regularUrl = /^(https?|ftp):\/\/([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(\/[^\s]*)?$/
var valid1 = document.querySelector('.input1')
var valid2 = document.querySelector('.input2')

var man = document.querySelector('.massage')
var man2 = document.querySelector('.animation')
var dataBase = []

function checkValueValid() {

    if (regularName.test(document.getElementById('siteName').value)) {
        valid1.classList.add('show')

    } else {
        valid1.classList.remove('show')
    }
    if (regularUrl.test(document.getElementById('siteUrl').value)) {
        valid2.classList.add('show')

    } else {
        valid2.classList.remove('show')
    }
}


localStorage.getItem('allDataOfSite')

if (localStorage.getItem('allDataOfSite') != null) {
    dataBase = JSON.parse(localStorage.getItem('allDataOfSite'))

    display()


}
function getInputValue() {


    var dataSite = {
        name: nameSite.value,
        url: urlSite.value
    }
    console.log(dataSite.name);


    if (regularName.test(dataSite.name) && regularUrl.test(dataSite.url)) {

        dataBase.push(dataSite)
        console.log(dataBase);
        // console.log(dataSite);
        display()
        localStorage.setItem('allDataOfSite', JSON.stringify(dataBase))
        clear()
        var label1 = `
    <div class="alert alert-info fs-5" role="alert">
                    <i class="fa-solid fa-circle-check fs-5 pe-2" style="color: #198754;"></i>Add a bookmark you have ${dataBase.length} bookmarks
    </div>
    `
        popLabel(label1)
    } else {
        console.log('han');
        man.classList.remove('display-massage')
        man2.classList.add('anim')

    }





}
function closeMassage() {
    man.classList.add('display-massage')
    console.log('clos');
    man2.classList.remove('anim')



}





function display() {
    var cart = ""
    for (var i = 0; i < dataBase.length; i++) {
        // console.log(dataBase[i]);

        cart += `
        <tr>
                <td>${i + 1}</td>
                <td>${dataBase[i].name}</td>
                <td><a href="${dataBase[i].url}" class="text-decoration-none" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
                <td><button class="btn btn-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                <td><button class="btn btn-warning" onclick="dataRetrieve(${i})"><i class="fa-solid fa-pen-to-square pe-2"></i> Edit</button></td>

        </tr>

        `
        // console.log(i);
    }
    document.getElementById('tbody').innerHTML = cart
}
function clear() {
    nameSite.value = null
    urlSite.value = null
}
function deleteItem(index) {

    dataBase.splice(index, 1)
    localStorage.setItem('allDataOfSite', JSON.stringify(dataBase))
    display()
    var label2 = `
    <div class="alert alert-danger fs-5" role="alert">
                    <i class="fa-solid fa-circle-xmark pe-3" style="color: #fd1212;"></i></i>Delete a bookmark you have ${dataBase.length} bookmarks
    </div>
    `
    popLabel(label2)


}
function dataRetrieve(index) {
    // alert(index)
    globalIndex = index
    nameSite.value = dataBase[index].name
    urlSite.value = dataBase[index].url
    document.getElementById('edit-btn').style.display = 'block'
    document.getElementById('submit-btn').style.display = 'none'
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
var globalIndex;

function editInputValue() {
    dataBase[globalIndex].name = nameSite.value
    dataBase[globalIndex].url = urlSite.value
    localStorage.setItem('allDataOfSite', JSON.stringify(dataBase))
    display()
    clear()
    var label3 = `
    <div class="alert alert-warning fs-5" role="alert">
                    <i class="fa-solid fa-pen-to-square pe-3" style="color: #FFD43B;"></i></i>Edit a bookmark you have ${dataBase.length} bookmarks
    </div>
    `
    popLabel(label3)




    document.getElementById('edit-btn').style.display = 'none'
    document.getElementById('submit-btn').style.display = 'block'
}
function popLabel(globalLabel) {
    document.getElementById('labelId').innerHTML = globalLabel
    labelId.style.display = 'block'
    setTimeout(function () {
        labelId.style.display = 'none'


    }, 1200)
}

function clearStorage() {

    localStorage.removeItem('allDataOfSite')
    dataBase = []
    document.getElementById('tbody').innerHTML = dataBase

}

