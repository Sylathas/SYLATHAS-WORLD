var videoWork = $('#workBook');
var videoWorkReverse = $('#workBookReverse');
var videoScroll = $('#workScroll');

export const openIndex = (workProjects, mobile, texts) => {
    //left page
    const index = '<h1>INDEX</h1><div id="animations"><h3>Animations &#8595;</h3></div><div id="interactive"><h3>Technological Stuff &#8595;</h3></div><div id="exhibitions"><h3>Exhibitions &#8595;</h3></div><div id="publications"><h3>Publications &#8595;</h3></div><div id="promotional"><h3>Promotional content &#8595;</h3></div>';
    if (mobile) {
        $('#contentMobile').append(index);
    } else {
        $('#contentLeft').append(index);
    }

    // Sort projects by year (descending, newest first), then by title
    const sortedProjects = [...workProjects].sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        if (yearB !== yearA) {
            return yearB - yearA; // Descending year order
        }
        return (a.project_title || "").localeCompare(b.project_title || "");
    });

    sortedProjects.forEach(work => {
        const projectName = '<p class="workLink"><span class="year">' + work.year + '</span> ' + work.project_title + '</p>';
        if (work.type == '0Animations') {
            $('#animations').append(projectName);
        } else if (work.type == '1PromotionalContent') {
            $('#promotional').append(projectName);
        } else if (work.type == '2InteractiveStuff') {
            $('#interactive').append(projectName);
        } else if (work.type == '3Exhibits') {
            $('#exhibitions').append(projectName);
        } else if (work.type == '4Publications') {
            $('#publications').append(projectName);
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