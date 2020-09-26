import { descriptionText, contactText } from './src/profiles.js';
import { imageSources } from './src/images.js';
import { linkSources } from './src/links.js';

// initialize blog text
(function init() {
    var bodyDict = document.getElementById('body-dict');
    for(let key in descriptionText) {
        let bodyDictNode = createNodeFromprofile(descriptionText[key]);
        bodyDict.appendChild(bodyDictNode);
    }
    var contactDetailsList = document.getElementById('contact-details');
    var contactSocialsList = document.getElementById('contact-socials-container');
    createContactLists(contactDetailsList, contactSocialsList);
})();

function createNodeFromprofile(profile) {
    var orientation = profile.orientation;

    var bodyDictNode = document.createElement('div');
    bodyDictNode.className = `dict-${orientation} slidein-on-scroll`;

    // dict-content
    var bodyDictArrow = createIconLink('arrow', linkSources[profile.link], `./assets/images/${imageSources[profile.icon]}`);
    var bodyDictDescription = `<p class="dict-title">${profile.title}</p>`+`<p class="dict-content">${profile.text}</p>`;
    var bodyDictprofiles = document.createElement('div');
    bodyDictprofiles.className = `dict-content-${orientation}`;
    bodyDictprofiles.innerHTML = bodyDictDescription;
    bodyDictprofiles.appendChild(bodyDictArrow);

    // dict-pic
    var bodyDictPicture = document.createElement('img');
    bodyDictPicture.className = `dict-pic-${orientation} thumbnail-img`;
    bodyDictPicture.src = `./assets/images/${imageSources[profile.picId]}`;

    switch(orientation) {
        case 'left':
            bodyDictNode.appendChild(bodyDictprofiles);
            bodyDictNode.appendChild(bodyDictPicture);
            break;
        case 'right':
            bodyDictNode.appendChild(bodyDictPicture);
            bodyDictNode.appendChild(bodyDictprofiles);
            break;
    }

    return bodyDictNode;
}

function createIconLink(name, link, icon) {
    var container = document.createElement('a');
    container.className = name;
    container.href = link;
    var icon = `<img src=${icon}></img>`;
    container.innerHTML = icon;
    return container;
}

function createContactLists(contactDetailsList, contactSocialsList) {
    var contactDetails = contactText.details;
    var contactSocials = contactText.socials;
    for(let key in contactDetails) {
        let contactDetailItem = document.createElement('li');
        contactDetailItem.innerHTML = contactDetails[key];
        contactDetailsList.appendChild(contactDetailItem);
    }
    var pos = 0;
    for(let key in contactSocials) {
        let name = (pos++ !== 0) ? 'socials-items' : 'first-socials-item';
        let link = contactSocials[key]['link'];
        let icon = contactSocials[key]['icon'];
        let contactSocialItem = createIconLink(name, linkSources[link], `./assets/images/${imageSources[icon]}`);
        contactSocialsList.appendChild(contactSocialItem);
    }
}
