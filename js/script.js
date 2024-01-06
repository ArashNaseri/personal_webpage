const date = new Date();
var copyright_date = date.getFullYear();

$("#Copyright").html("Copyright " + String(copyright_date) + ".");

let section = document.querySelectorAll("section");
let menu = document.querySelectorAll("header nav a");

window.onscroll = () => {
    section.forEach((i) => {
        let top = window.scrollY;
        let offset = i.offsetTop - 150;
        let height = i.offsetHeight;
        let id = i.getAttribute("id");

        if (top >= offset && top < offset + height) {
            menu.forEach((link) => {
                link.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });
};

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();

// ORCID publication fetching
async function fetchPublications(orcidId) {
  const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;

  try {
      const response = await fetch(url, {
          headers: {
              'Accept': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.group;
  } catch (error) {
      console.error('Error fetching data from ORCID:', error);
      return [];
  }
}


function displayPublications(publications) {
    const listItems = document.getElementById("papers");

    publications.forEach(publication => {
        const workSummary = publication['work-summary'][0];

        const title = workSummary.title.title.value;
        const publicationYear = workSummary['publication-date'] ? workSummary['publication-date'].year.value : 'N/A';
        let journalName = workSummary['journal-title'] ? workSummary['journal-title'].value : 'N/A';

        let authors = extractAuthors(workSummary['contributors']);

        let doi = extractDOI(workSummary['external-ids']);

        let listItem = document.createElement("div");
        listItem.classList.add("publication-item");
        listItem.setAttribute("data-aos", "fade-up");
        listItem.setAttribute("data-aos-delay", "500");
        listItem.setAttribute("data-aos-duration", "700");
        listItem.innerHTML = `
            <i class='fa-solid fa-x1 fa-pen'></i>
            <div class='publication-text'>
                <h3 class='paper-title'>${title}</h3>
                <p class='paper-details'>
                    <span class='paper-authors'>${authors}</span>, 
                    <span class='journal'>${journalName}</span>, 
                    <span class='year'>${publicationYear}</span>,
                    DOI: <a href='${doi.link}' target='_blank'>${doi.value}</a>
                </p>
            </div>
        `;
        listItems.appendChild(listItem);
    });
}

function extractAuthors(contributors) {
    if (!contributors || !contributors.contributor) {
        return 'Naseri et al.';
    }

    let authorNames = contributors.contributor.map(contributor => {
        if (contributor['credit-name'] && contributor['credit-name'].value) {
            return contributor['credit-name'].value;
        } else if (contributor['contributor-orcid'] && contributor['contributor-orcid'].path) {
            return `ORCID: ${contributor['contributor-orcid'].path}`;
        }
        return 'Anonymous';
    });

    return authorNames.join(', ');
}

function extractDOI(externalIds) {
    if (externalIds && externalIds['external-id'] && externalIds['external-id'].length > 0) {
        const doiEntry = externalIds['external-id'].find(id => id['external-id-type'] === 'doi');
        if (doiEntry) {
            return {
                value: doiEntry['external-id-value'],
                link: `https://doi.org/${doiEntry['external-id-value']}`
            };
        }
    }
    return { value: 'N/A', link: '#' };
}



async function fetchPublications(orcidId) {
    const url = `https://pub.orcid.org/v3.0/${orcidId}/works`;
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.group;
    } catch (error) {
        console.error('Error fetching publications:', error);
    }
}

// Usage
const orcidId = '0000-0002-1493-6761';
fetchPublications(orcidId).then(displayPublications);




















let hoverTexts = document.querySelectorAll('.hover-text');

hoverTexts.forEach(function(hoverText) {
    let dropdownContent = hoverText.querySelector('.dropdown-content');
    let timeoutId = null;

    function showDropdown() {
        clearTimeout(timeoutId);
        dropdownContent.style.display = 'block';
        dropdownContent.style.opacity = 1;
    }

    function hideDropdown() {
        timeoutId = setTimeout(function() {
            dropdownContent.style.opacity = 0;
            dropdownContent.style.display = 'none';
        }, 300); // Adjust timing as necessary
    }

    hoverText.addEventListener('mouseenter', showDropdown);
    hoverText.addEventListener('mouseleave', hideDropdown);
});
