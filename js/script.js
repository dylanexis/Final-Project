// For Back to Top Button

let mybutton = document.getElementById("toTop");

window.onscroll = function()
{scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop > 20 ||
document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}

function topFunction(){
    window.scrollTo({
        top: 0,
        left: 0,
    });

}

const container = document.querySelector('#container');
const release = document.querySelector('#yearBtn');
const rating = document.querySelector('#PFBtn');
const alpha = document.querySelector('#alphaBtn');

let currentType = null;
let currentOrder = 1;


const sort = () => {
  const divs = document.querySelectorAll('.tile');
  const divsArr = [...divs];
  
  divsArr.sort((a, b) => {
    let textA = null;
    let textB = null;

    //Sort by release year
    if (currentType === 'release') {
      textA = a.querySelector('.year').textContent;
      textB = b.querySelector('.year').textContent;
    }

    // Sort by album name
    if (currentType == 'alpha'){
        textA = b.querySelector('.album_name').textContent.trim();
        textB = a.querySelector('.album_name').textContent.trim();
     }
    
    // Sort by Pitchfork Rating
    if (currentType === 'rating') {
      textA = parseFloat(a.querySelector('.PF').textContent);
      textB = parseFloat(b.querySelector('.PF').textContent);

    // Handle "Not Available" values, treating them as the lowest rating (e.g., -Infinity)
    if (textA === 'Not Available') {
        textA = -Infinity; // Send "Not Available" to the bottom
    } else {
        textA = parseFloat(textA) || -Infinity; // If invalid, treat as -Infinity
      }

    if (textB === 'Not Available') {
        textB = -Infinity; // Send "Not Available" to the bottom
      } else {
        textB = parseFloat(textB) || -Infinity; // If invalid, treat as -Infinity
      }
    }

    if (textA > textB){
        return -1 * currentOrder;
    }
    if (textA < textB){
        return 1 * currentOrder;
    }
    else {
        return 0;
    }
  });
  
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  divsArr.forEach(item => container.appendChild(item));
};

const refresh = (type, button) => {
  if (currentType === type) {
    return;
  }

  [release, rating, alpha].forEach(btn => {
    btn.disabled = false;
  });

  button.disabled = true;
  currentType = type;

  sort();

};

alpha.addEventListener('click', () => refresh('alpha', alpha));

release.addEventListener('click', () => refresh('release', release));

rating.addEventListener('click', () => refresh('rating', rating));


function toggleDiv(className) {
    var yearDiv = document.querySelectorAll('.year');
    var PFDiv = document.querySelectorAll('.PF');
    var noDiv = document.querySelectorAll('.album_name');

    if (className === 'year'){
      PFDiv.forEach(function(div){
        div.style.display = "none";
      });
      yearDiv.forEach(function(div){
        div.style.display = "block";
    });
  }
   else if (className === 'PF'){
      PFDiv.forEach(function(div){
        div.style.display = "block";
      });
      yearDiv.forEach(function(div) {
        div.style.display = "none";
      });
    }
    else if (className === 'album_name'){
      PFDiv.forEach(function(div){
        div.style.display = "none";
      });
      yearDiv.forEach(function(div){
        div.style.display = "none";
      });
    }
    noDiv.forEach(function(div){
      div.style.display = "block";
    });
}


const seenCheckbox = document.getElementById('seen');


seenCheckbox.addEventListener('change', function() {

  const allTiles = document.querySelectorAll('.album_gallery .tile');
  

  allTiles.forEach(function(tile) {

    if (!tile.classList.contains('live')) {
      tile.style.display = seenCheckbox.checked ? 'none' : 'block';
    }
  });
});
