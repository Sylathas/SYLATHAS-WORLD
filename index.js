import { WorkData, TextData, VaultData } from './Components/getData.js'
import { openIndex, disposePages, pageChange, openVault } from './Components/utilsDOM.js'

let i, roomNum = 0;
let txt = '';
let speed = 35;
let movement, vaultOpened, workOpened, mobile = false;
let navClose = true;
let works, vaults, texts;
var videoOne = $('#gameplayOne');
var videoTwo = $('#gameplayTwo');
var videoFace = $('#faceVideo');
var videoFaceTwo = $('#faceVideoTwo');

//Check if Mobile
function mobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

window.addEventListener('load', function () {
    mobile = mobileCheck();

    if (mobile) {
        $('#mobileToggle').css('display', 'block');
        videoOne[0].src = "./textures/videos/00_StartMobile.mp4";
        videoOne[0].load();
        videoTwo[0].src = './textures/videos/01_StillMobile.mp4';
        videoTwo[0].load();
    }
    $('#loading').css('display', 'none');
    $('#mainContainer').css('display', 'block');
    setTimeout(typeWriter, 1000);
    setTimeout(() => {
        videoOne[0].play();
    }, 100);
});

function typeWriter() {
    if (i < txt.length && !movement) {
        $('#text p').html($('#text p').html() + txt.charAt(i));
        i++;
        setTimeout(typeWriter, speed);
        document.getElementById('text').scrollTop = document.getElementById('text').scrollHeight;
    } else {
        i = 0;
        videoFaceTwo.css('z-index', 5);
        videoFace.css('z-index', 4);
    }
}

function mobileToggle() {
    if (!navClose) {
        $('#mobileToggle').css('background-image', 'url("./textures/UI/Mobile/Mobile_Open.png")');
        $('#navbar').removeClass('navBarOpen navBarAnimation');
        $('#navbar').addClass('navBarClose');
        navClose = true;
    } else {
        $('#mobileToggle').css('background-image', 'url("./textures/UI/Mobile/Mobile_Close.png")');
        $('#navbar').removeClass('navBarClose');
        $('#navbar').addClass('navBarOpen');
        navClose = false;
    }
}

$("#gameplayOne").on("ended", function () {
    let roomText;
    texts.forEach(text => {
        if (text.room.charAt(0) == String(roomNum)) {
            if (mobile) {
                roomText = text.mobile_text;
            } else {
                roomText = text.text;
            }
        }
    });
    if (roomNum == 0 || roomNum == 5) {
        arriveRoom(roomText, false);
        $('#buttonUp').addClass("buttonAnimation");
        $('#buttonUp').css("background-image", 'url("./textures/UI/buttons/Up_Active.png")');
    } else if (roomNum == 1 || roomNum == 6) {
        arriveRoom(roomText, false);
        $('#buttonUp, #buttonDown, #buttonLeft, #buttonRight').addClass("buttonAnimation");
        $('#buttonUp').css("background-image", 'url("./textures/UI/buttons/Up_Active.png")');
        $('#buttonLeft').css("background-image", 'url("./textures/UI/buttons/Left_Active.png")');
        $('#buttonDown').css("background-image", 'url("./textures/UI/buttons/Down_Active.png")');
        $('#buttonRight').css("background-image", 'url("./textures/UI/buttons/Right_Active.png")');
    } else if (roomNum == 2) {
        arriveRoom(roomText, true);
        $('#buttonDown').addClass("buttonAnimation");
        $('#buttonDown').css("background-image", 'url("./textures/UI/buttons/Down_Active.png")');
        $('#workScroll')[0].load();
        setTimeout(() => {
            if (mobile) {
                $('#WorkMobile').removeClass('workCloseAnimation');
                $('#WorkMobile').addClass('workAnimation');
            } else {
                $('#WorkDesktop').removeClass('workCloseAnimation');
                $('#WorkDesktop').addClass('workAnimation');
            }
        }, 400);
        if (!workOpened) {
            openIndex(works, mobile);
            workOpened = true;
        }
    } else if (roomNum == 3) {
        arriveRoom(roomText, true);
        $('#buttonDown').addClass("buttonAnimation");
        $('#buttonDown').css("background-image", 'url("./textures/UI/buttons/Down_Active.png")');
        setTimeout(() => {
            $('#Vault').removeClass('workCloseAnimation');
            $('#Vault').addClass('workAnimation');
        }, 400);
        if (!vaultOpened) {
            openVault(vaults);
            vaultOpened = true;
        }
    } else if (roomNum == 4) {
        arriveRoom(roomText, true);
        $('#buttonDown').addClass("buttonAnimation");
        $('#buttonDown').css("background-image", 'url("./textures/UI/buttons/Down_Active.png")');
        setTimeout(() => {
            $('#Contact').removeClass('workCloseAnimation');
            $('#Contact').addClass('workAnimation');
        }, 400);
    }
});

$('#buttonUp').on('click', () => {
    if (mobile) {
        if (roomNum == 0) {
            moveRoom('./textures/videos/02_toMansionMobile.mp4', './textures/videos/03_MansionMobile.mp4', 1);
        } else if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/05_toVaultMobile.mp4', './textures/videos/03_MansionMobile.mp4', 3);
        } else if (roomNum == 5) {
            moveRoom('./textures/videos/02_toMansionMobile.mp4', './textures/videos/03_MansionMobile.mp4', 6);
        }
    } else {
        if (roomNum == 0) {
            moveRoom('./textures/videos/02_toMansion.mp4', './textures/videos/03_Mansion.mp4', 1);
        } else if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/05_toVault.mp4', './textures/videos/03_Mansion.mp4', 3);
        } else if (roomNum == 5) {
            moveRoom('./textures/videos/02_toMansion.mp4', './textures/videos/03_Mansion.mp4', 6);
        }
    }
});

$('#buttonDown').on('click', () => {
    if (mobile) {
        if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/02_toMansionReverseMobile.mp4', './textures/videos/01_StillMobile.mp4', 5);
        } else if (roomNum == 2) {
            moveRoom('./textures/videos/04_toWorkReverseMobile.mp4', './textures/videos/03_MansionMobile.mp4', 6);
            if (mobile) {
                $('#WorkMobile').removeClass('workAnimation');
                $('#WorkMobile').addClass('workCloseAnimation');
            } else {
                $('#WorkDesktop').removeClass('workAnimation');
                $('#WorkDesktop').addClass('workCloseAnimation');
            }
            setTimeout(() => {
                $('#videoContent').css('opacity', '1');
            }, 500);
        } else if (roomNum == 3) {
            moveRoom('./textures/videos/05_toVaultReverseMobile.mp4', './textures/videos/03_MansionMobile.mp4', 6);
            setTimeout(() => {
                $('#videoContent').css('opacity', '1');
            }, 400);
            $('#Vault').removeClass('workAnimation');
            $('#Vault').addClass('workCloseAnimation');
        } else if (roomNum == 4) {
            moveRoom('./textures/videos/06_toContactReverseMobile.mp4', './textures/videos/03_MansionMobile.mp4', 6);
            setTimeout(() => {
                $('#videoContent').css('opacity', '1');
            }, 500);
            $('#Contact').removeClass('workAnimation');
            $('#Contact').addClass('workCloseAnimation');
        }
    } else {
        if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/02_toMansionReverse.mp4', './textures/videos/01_Still.mp4', 5);
        } else if (roomNum == 2) {
            moveRoom('./textures/videos/04_toWorkReverse.mp4', './textures/videos/03_Mansion.mp4', 6);
            if (mobile) {
                $('#WorkMobile').removeClass('workAnimation');
                $('#WorkMobile').addClass('workCloseAnimation');
            } else {
                $('#WorkDesktop').removeClass('workAnimation');
                $('#WorkDesktop').addClass('workCloseAnimation');
            }
            setTimeout(() => {
                $('#videoContent').css('opacity', '1');
            }, 400);
        } else if (roomNum == 3) {
            moveRoom('./textures/videos/05_toVaultReverse.mp4', './textures/videos/03_Mansion.mp4', 6);
            setTimeout(() => {
                $('#videoContent').css('opacity', '1');
            }, 400);
            $('#Vault').removeClass('workAnimation');
            $('#Vault').addClass('workCloseAnimation');
        } else if (roomNum == 4) {
            moveRoom('./textures/videos/06_toContactReverse.mp4', './textures/videos/03_Mansion.mp4', 6);
            setTimeout(() => {
                $('#videoContent').css('opacity', '1');
            }, 400);
            $('#Contact').removeClass('workAnimation');
            $('#Contact').addClass('workCloseAnimation');
        }
    }
});

$('#buttonRight').on('click', () => {
    if (mobile) {
        if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/04_toWorkMobile.mp4', './textures/videos/03_MansionMobile.mp4', 2);
        }
    } else {
        if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/04_toWork.mp4', './textures/videos/03_Mansion.mp4', 2);
        }
    }
});

$('#buttonLeft').on('click', () => {
    if (mobile) {
        if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/06_toContactMobile.mp4', './textures/videos/03_MansionMobile.mp4', 4);
        }
    } else {
        if (roomNum == 1 || roomNum == 6) {
            moveRoom('./textures/videos/06_toContact.mp4', './textures/videos/03_Mansion.mp4', 4);
        }
    }
});

$("#mobileToggle").on("click", function () {
    mobileToggle();
});

/////////////////////////
/*WORKBOOK INTERACTIONS*/
/////////////////////////

//Open singular Project
$(document).on('click', '.workLink', async function () {
    //Clean Pages
    disposePages();
    pageChange(true, mobile);
    //Get clicked Project
    let activeWork;
    for await (const work of works) {
        if (work.project_title == $(this).text()) {
            activeWork = work;
        }
    }

    //Create text elements
    const projectTitle = '<h1>' + activeWork.project_title + '</h1>';

    const projectText = document.createElement('p');
    var text = activeWork.description_of_project,
        target = projectText,
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    const projectCredits = document.createElement('p');
    text = activeWork.credits,
        target = projectCredits,
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    //Create goBack element
    const goBack = '<div class="goBack"></div>'

    //Time for animation
    let time;

    if (mobile) {
        time = 1000;
    } else {
        time = 800;
    }

    //Wait for the page to be turned before appending elements
    setTimeout(() => {
        //Append everything to Content Page
        if (mobile) {
            $('#contentMobile').append(projectTitle, projectText, projectCredits);
        } else {
            $('#contentLeft').append(projectTitle, projectText, projectCredits);
        }

        //Create image and video elements
        if (activeWork.youtube_ur_ls) {
            activeWork.youtube_ur_ls.split("\n").forEach((url) => {
                const youtubeLink = "<iframe class='youtube' src='" + url + "'></iframe>";
                if (mobile) {
                    $('#contentMobile').append(youtubeLink);
                } else {
                    $('#contentRight').append(youtubeLink);
                }
            });
        }

        if (activeWork.images) {
            activeWork.images.forEach((url) => {
                const imageLink = "<img class='workGallery' src='" + url + "' />";
                if (mobile) {
                    $('#contentMobile').append(imageLink);
                } else {
                    $('#contentRight').append(imageLink);
                }
            });
        }

        if (mobile) {
            $('#contentMobile').append(goBack);
        } else {
            $('#contentLeft').append(goBack);
        }
    }, time);
});

//Go back to Index
$(document).on('click', '.goBack', async function () {
    pageChange(false, mobile);
    disposePages();
    let time;
    if (mobile) {
        time = 1000;
    } else {
        time = 800;
    }
    setTimeout(() => { openIndex(works, mobile) }, time);
});

//////////////////////
/*VAULT INTERACTIONS*/
//////////////////////

//Open singular Project
$(document).on('click', '.vaultLink', async function () {
    //Remove Table Pages
    $('#listContainer').css('display', 'none');
    $('#blogContainer').css('display', 'block');

    //Get clicked Project
    let activeVault;
    for await (const vault of vaults) {
        console.log($(this).html(), vault.title);
        if (vault.title == $(this).text()) {
            activeVault = vault;
        }
    }

    //Create text elements
    const projectTitle = '<div>' + activeVault.title + '</div>';

    const projectText = document.createElement('div');
    var text = activeVault.text,
        target = projectText,
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    target.innerHTML = html;

    let projectDownload;

    if (activeVault.downloadable) {
        projectDownload = '<div><a href=' + activeVault.downloadable + ' target="_blank">Download</a></div>';
    } else {
        projectDownload = '';
    }

    $('#blogContainer').append(projectTitle, projectText, projectDownload);

    activeVault.images.forEach((image) => {
        const projectImage = '<div class="blogImage" style="background-image: url(' + image + ')"></div>';
        $('#blogContainer').append(projectImage);
    });

    //Create goBack element
    const goBack = '<div class="goBackVault"></div>'
    $('#blogContainer').append(goBack);

});

//Go back to Index
$(document).on('click', '.goBackVault', function () {
    $('#blogContainer').html('');
    $('#blogContainer').css('display', 'none');
    $('#listContainer').css('display', 'table');
});

const moveRoom = (videoTransition, videoStill, room) => {
    if (mobile && !navClose) {
        mobileToggle();
    }
    movement = true;
    speed = 0;
    $('#text p').html('');
    videoOne[0].src = videoTransition;
    videoOne[0].load();
    setTimeout(() => {
        videoTwo.css('z-index', 1);
        videoOne.css('z-index', 2);
        videoOne[0].play();
        videoTwo[0].src = videoStill;
        videoTwo[0].load();
        $('.button').removeClass("buttonAnimation");
        $('#buttonUp').css("background-image", 'url("./textures/UI/buttons/Up.png")');
        $('#buttonDown').css("background-image", 'url("./textures/UI/buttons/Down.png")');
        $('#buttonLeft').css("background-image", 'url("./textures/UI/buttons/Left.png")');
        $('#buttonRight').css("background-image", 'url("./textures/UI/buttons/Right.png")');
        roomNum = room;
    }, 500);
}

const arriveRoom = (text, util) => {
    if (mobile && navClose) {
        mobileToggle();
    }
    movement = false;
    speed = 35;
    if (util) {
        $('#videoContent').css('opacity', '0');
    } else {
        videoTwo.css('z-index', 2);
        videoOne.css('z-index', 1);
        videoTwo[0].play();
    }

    if (roomNum == 4) {
        videoFace[0].src = './textures/videos/emotes/SurprisedFaceTalking.mp4';
        videoFace[0].load();
        videoFace[0].play();
    } else if (roomNum == 5) {
        videoFace[0].src = './textures/videos/emotes/AngryFaceTalking.mp4';
        videoFace[0].load();
        videoFace[0].play();
    } else {
        videoFace[0].src = './textures/videos/emotes/faceTalking.mp4';
        videoFace[0].load();
        videoFace[0].play();
    }
    txt = text;
    setTimeout(() => {
        typeWriter();
        videoFaceTwo.css('z-index', 4);
        videoFace.css('z-index', 5);
    }, 200);
}

//////////////////////
/*GET BACK-END STUFF*/
//////////////////////

const fetchData = async () => {
    await TextData()
        .then((response) => {
            texts = response;
        });

    await WorkData()
        .then((response) => {
            works = response;
        });

    await VaultData()
        .then((response) => {
            vaults = response;
        });
}

fetchData();