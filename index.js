//         VAR         //
var stdID;


//         DOM         //
var IDin = document.getElementById('inputStudentID');
var RPform = document.getElementById('reportForm');
var RPcheckBox = document.getElementById("reportCB")
var disName = document.getElementById("nameOfID");
var snackbarContainer = document.querySelector('#demo-toast-example');
var sendReportBT = document.querySelector('#addReportBT');
var listObj = document.getElementById('list');
var db = firebase.database();

// console.log(IDin);


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        console.log('lonin done');
        localStorage.uid = firebaseUser.email;

    }
    else {
        window.location = "/login";
    }
})

//              get ID        //
function getID(a) {
    if (a.length == 4) {
        stdID = a;
        IDin.value = "";
        showReportForm();
        // console.log(stdID);        
    }
}

function showReportForm() {
    db.ref('member').child(stdID).once('value').then(snap => {
        if (snap.val() != null) {
            RPform.style = "display:block";
            showNameOfID(stdID, disName);
            RPform.style = "display:block";
        } else {
            var data = { message: "ไม่มี   '" + stdID + "'   ในฐานข้อมูล" };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
            snackbarContainer.id = "demo-toast-fall"
        }
    });

}

function showListM() {
    listObj.innerHTML = '';
    let time = new Date();

    let ref = db.ref("report/" + time.getFullYear() + '/' + `${time.getMonth() + 1}`);

    ref.orderByChild("date").on('child_added', snap => {
        let a = snap.val();

        // console.log(a.by);console.log(localStorage.uid);

        const li = document.createElement('li');
        li.className = 'mdl-list__item mdl-list__item--three-line';
        li.id = snap.key + "content";
        let heal;
        if (a.by == localStorage.uid) {
            heal = `        
                <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" style="color:#666" id="${snap.key}" onclick="remove(this.id)">
                        <i class="material-icons">healing</i>
                    </a>
                </span> 
            `
        }else
            heal='';
        li.innerHTML = `
                <span class="mdl-list__item-primary-content" id="pop">
                    <i class="material-icons mdl-list__item-avatar">person</i>
                    <span id="${snap.key + a.studentID}">NAME</span>
                    <span class="mdl-list__item-text-body" id="${snap.key + "Detail"}">
                        ต้องโทษ ${a.wrong} เมื่อ   ${a.timeH}:${a.timeM} น. วันที่ ${a.date} เดือน ${time.getMonth() + 1} ปี ${time.getFullYear()}
                    </span>
                </span>${heal}       
            `;
        listObj.insertBefore(li, list.childNodes[0]);
        getName(document.getElementById(snap.key + a.studentID), a.studentID);
    })

    ref.on('child_changed', snap => {
        a = snap.val();
        const content = document.getElementById(snap.key + "content");
        let heal;
        if (a.by == localStorage.uid) {
            heal = `        
                <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" style="color:#666" id="${snap.key}" onclick="remove(this.id)">
                        <i class="material-icons">healing</i>
                    </a>
                </span> 
            `
        }else
            heal='';

        content.innerHTML = `
                <span class="mdl-list__item-primary-content">
                    <i class="material-icons mdl-list__item-avatar">person</i>
                    <span id="${snap.key + a.studentID}">NAME</span>
                    <span class="mdl-list__item-text-body" id="${snap.key + "Detail"}">
                        ต้องโทษ ${a.wrong} เมื่อ   ${a.timeH}:${a.timeM} น. วันที่ ${a.date} เดือน ${time.getMonth() + 1} ปี ${time.getFullYear()}
                    </span>
                </span>${heal}       
            `;
            getName(document.getElementById(snap.key + a.studentID), a.studentID);
    })

    ref.on('child_removed', snap => {
        const rm = document.getElementById(snap.key + "content");
        rm.id="gone";        
        setTimeout(() => {
            rm.remove();
        }, 400);
    })
}


function sendReport() {
    var data = { message: "" };

    for (i = 0; i < 5; i++) {
        let form = document.forms['reportCB'][i];
        if (form.checked == true) {
            console.log(form.value);

            var time = new Date();
            var a = {};
            var newPostKey = firebase.database().ref().child('posts').push().key;
            a["report" + '/' + time.getFullYear() + '/' + `${time.getMonth() + 1}` + '/' + newPostKey] = {
                studentID: stdID,
                number: i,
                wrong: form.value,
                date: time.getDate(),
                timeH: time.getHours(),
                timeM: time.getMinutes(),
                by: localStorage.uid
            };
            firebase.database().ref().update(a);

            data.message += form.value + '  ';
        }
        form.checked = false;

    }
    RPform.style = "display:none";
    if (data.message != '')
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    else
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: "ไม่มีข้อมูล" });
    // window.location="/newLooked";
};