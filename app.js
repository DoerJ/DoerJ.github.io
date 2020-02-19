import { descriptionText, contactText } from './modules/text-src.js';
import { imageSources } from './modules/img-src.js';
import { linkSources } from './modules/link-src.js';

// initialize blog text
(function initializeTextNodes() {
    var bodyDict = document.getElementById('body-dict');
    for(let key in descriptionText) {
        let bodyDictNode = createNodeFromDescriptionItem(descriptionText[key]);
        bodyDict.appendChild(bodyDictNode);
    }

    var contactDetailsList = document.getElementById('contact-details');
    var contactSocialsList = document.getElementById('contact-socials-container');
    createContactLists(contactDetailsList, contactSocialsList);
})();

function createNodeFromDescriptionItem(descriptionItem) {
    var title = descriptionItem.title;
    var content = descriptionItem.text;
    var orientation = descriptionItem.orientation;
    var pictureId = descriptionItem.picId;
    var link = descriptionItem.link;

    var bodyDictNode = document.createElement('div');
    bodyDictNode.className = `dict-${orientation} slidein-on-scroll`;

    // dict-content
    var bodyDictArrow = document.createElement('a');
    bodyDictArrow.className = 'arrow';
    bodyDictArrow.href = linkSources[link];
    var arrowIcon = '<img src="./res/arrow.png"></img>';
    bodyDictArrow.innerHTML = arrowIcon;
    var bodyDictDescription = `<p class="dict-title">${title}</p>`+`<p class="dict-content">${content}</p>`;
    var bodyDictDescriptionItems = document.createElement('div');
    bodyDictDescriptionItems.className = `dict-content-${orientation}`;
    bodyDictDescriptionItems.innerHTML = bodyDictDescription;
    bodyDictDescriptionItems.appendChild(bodyDictArrow);

    // dict-pic
    var bodyDictPicture = document.createElement('img');
    bodyDictPicture.className = `dict-pic-${orientation} thumbnail-img`;
    bodyDictPicture.src = `./res/${imageSources[pictureId]}`;

    switch(orientation) {
        case 'left':
            bodyDictNode.appendChild(bodyDictDescriptionItems);
            bodyDictNode.appendChild(bodyDictPicture);
            break;
        case 'right':
            bodyDictNode.appendChild(bodyDictPicture);
            bodyDictNode.appendChild(bodyDictDescriptionItems);
            break;
    }

    return bodyDictNode;
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
        let contactSocialItem = document.createElement('a');
        if(pos++ !== 0) contactSocialItem.className = 'socials-items';
        let link = contactSocials[key]['link'];
        contactSocialItem.href = linkSources[link];

        let icon = contactSocials[key]['icon'];
        let iconPath = `./res/${imageSources[icon]}`;
        let contactSocialIcon = `<img src=${iconPath}></img>`
        contactSocialItem.innerHTML = contactSocialIcon;
        contactSocialsList.appendChild(contactSocialItem);
    }
}
