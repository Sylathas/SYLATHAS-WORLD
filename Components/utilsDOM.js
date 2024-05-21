var videoWork = $('#workBook');
var videoWorkReverse = $('#workBookReverse');
var videoScroll = $('#workScroll');

export const openIndex = (workProjects, mobile) => {
    const index = '<h1>INDEX</h1><div id="animations"><h3>Animations &#8595;</h3></div><div id="promotional"><h3>Promotional content &#8595;</h3></div><div id="interactive"><h3>Websites &#8595;</h3></div><div id="exhibitions"><h3>Exhibitions &#8595;</h3></div>';
    if (mobile) {
        $('#contentMobile').append(index);
    } else {
        $('#contentLeft').append(index);
    }
    workProjects.forEach(work => {
        const projectName = '<p class="workLink">' + work.project_title + '</p>';
        if (work.type == '0Animations') {
            $('#animations').append(projectName);
        } else if (work.type == '1PromotionalContent') {
            $('#promotional').append(projectName);
        } else if (work.type == '2InteractiveStuff') {
            $('#interactive').append(projectName);
        } else if (work.type == '3Exhibits') {
            $('#exhibitions').append(projectName);
        } else {
            console.log(work.type);
        }
    });
}

export const disposePages = () => {
    $('.contentDiv').html('');
}

export const pageChange = (direction, mobile) => {
    if (mobile) {
        videoScroll[0].play();
    } {
        if (direction) {
            videoWorkReverse.css('display', 'none');
            videoWork.css('display', 'block');
            videoWork[0].play();
        } else {
            videoWork.css('display', 'none');
            videoWorkReverse.css('display', 'block');
            videoWorkReverse[0].play();
        }
    }
}

export const openVault = (vaultProjects) => {
    vaultProjects.forEach(vault => {

        const projectName = '<tr><td class="vaultLink">' + vault.title + '</td><td>' + vault.vault_type.slice(1) + '</td><td>' + new Date(vault.created_on.seconds * 1000).toLocaleDateString("en-UK").slice(3) + '</td></tr>';
        $('#listContainer').append(projectName);
    });

    for (let i = 0; i < 20 - ($("#tableContainer table").children().length / 2); i++) {
        const projectName = '<tr style="height: 20px;"><td></td><td></td><td></td></tr>';
        $('#listContainer').append(projectName);
    }
}