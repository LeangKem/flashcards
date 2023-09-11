var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const word = document.createElement('h2');
  const meaning = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';

  word.setAttribute("style", "border-top:1px solid black; padding: 15px; margin-top:30px; font-size:1.3rem");
  word.textContent = text.my_word;

  meaning.setAttribute("style", "text-align:center; display:none; color:black; margin-top:30px");
  meaning.textContent = text.my_meaning;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })

  flashcard.appendChild(word);
  flashcard.appendChild(meaning);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if(meaning.style.display == "none")
      meaning.style.display = "block";
    else
      meaning.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const word = document.querySelector("#word");
  const meaning = document.querySelector("#meaning");

  let flashcard_info = {
    'my_word' : word.value,
    'my_meaning'  : meaning.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  word.value = "";
  meaning.value = "";
}