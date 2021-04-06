import { bioElements } from '../assets/content/bio-text.js';
import { personalInfoText } from '../assets/content/personal-info-text.js';
import { links } from '../assets/content/link.js';

// the base path for retrieving icon image 
var base_path = './assets/images/';

export class ContentLoader {
  constructor() {
    var self = this;

    self.doneLoading = new Promise((resolve) => {
      // load up content for bio 
      self.loadBioContent();
      // load up content for personal contact 
      self.loadPersonalContact();
      resolve();
    })
  }
  
  loadBioContent() {
    var self = this;
    self.bioContent = document.getElementById('bio-content');

    Object.keys(bioElements).forEach(key => {
      let bioElement = ContentLoader.createBioElement(bioElements[key]);
      self.bioContent.append(bioElement);
    });
  }

  loadPersonalContact() {
    var self = this;
    self.contactInfo = document.getElementById('personal-contact-info');
    self.contactSocialMedias = document.getElementById('personal-social-medias-wrapper');

    // append personal info 
    var info = personalInfoText.personalInfo;
    Object.keys(info).forEach(key => {
      self.contactInfo.innerHTML += `<li>${key}:&nbsp;&nbsp;&nbsp;${info[key]}</li>`;
    });

    // append social media icons 
    var media = personalInfoText.socialMedias;
    var index = 0;
    Object.keys(media).forEach(key => {
      let item = media[key];
      // :not css selector is not fully supported on some browsers, thus use classname to set icon margin
      let classlist = (index === 0) ? ['social-media-item'] : ['social-media-item', 'icon-not-first-of-type']
      let icon = ContentLoader.createLinkWithIcon(classlist, item.icon, links[item.link]);
      self.contactSocialMedias.appendChild(icon);
      index += 1;
    });
  }

  static createBioElement(bioElem) {
    var orientation = bioElem.layoutOrientation;

    var element = document.createElement('div');
    element.id = bioElem.id;
    element.classList.add(`bio-element-${orientation}`, 'slidein-on-scroll');
    // bio content
    var content = document.createElement('div'); 
    var text = `<h2 class="bio-title">${bioElem.title}</h2>` + `<p class="bio-text">${bioElem.content}</p>`;
    var url = ContentLoader.createLinkWithIcon(['arrow'], 'arrow.png', links[bioElem.url]);
    content.innerHTML += text;
    content.append(url);

    // bio thumbnail 
    var thumbnail = document.createElement('img');
    thumbnail.classList.add(`bio-thumbnail-${orientation}`, 'thumbnail');
    thumbnail.src = base_path + bioElem.thumbnail + '.png';

    // insert content and thumbnail based on the layout orientation
    if (orientation === 'left') {
      element.appendChild(content);
      element.appendChild(thumbnail);
    }
    else if (orientation === 'right') {
      element.appendChild(thumbnail);
      element.appendChild(content);
    }
    return element;
  }

  static createLinkWithIcon(classlist, icon, url) {
    var link = document.createElement('a');
    link.classList.add(...classlist);
    link.href = url;
    link.innerHTML = `<img src=${base_path + icon}></img>`;

    return link;
  }

}

