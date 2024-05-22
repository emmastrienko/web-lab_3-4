fetch("http://localhost:8080/all")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data received:", data.data);
    let CoffeeData = data.data;

    const cardsContainer = document.getElementById("cards");
    let startIndex = 0;
    const cardsPerLoad = 8;
    const cardsHTML = document.getElementById("cards");

    function renderCard(card) {
      return `
    <div class="card">
      <img src=${card.imagelink_square}>
      <h2>${card.name}</h2>
      <p><span>Price: &nbsp;</span><span class="price">${card.prices[1].price}$</span></p>
      <div >
      <span class="fill-icons">
        <?xml version="1.0" ?><svg class="feather feather-heart" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <?xml version="1.0" ?><svg class="hidden"viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path fill="#3B1101" d="M176,32a60,60,0,0,0-48,24A60,60,0,0,0,20,92c0,71.9,99.9,128.6,104.1,131a7.8,7.8,0,0,0,3.9,1,7.6,7.6,0,0,0,3.9-1,314.3,314.3,0,0,0,51.5-37.6C218.3,154,236,122.6,236,92A60,60,0,0,0,176,32Z"/></svg>
      </span>

      <span class="fill-icons">
        <?xml version="1.0" ?><svg class="cartIcn ${card.id}" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><circle cx="80" cy="216" r="16"/><circle cx="184" cy="216" r="16"/><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#3B1101" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        <?xml version="1.0" ?><svg class="hidden cartIcn filled" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path fill="#3B1101" d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM228.1,67.2a8.1,8.1,0,0,0-6.4-3.2H48.3L40.2,35.6A16.1,16.1,0,0,0,24.8,24H8A8,8,0,0,0,8,40H24.8l9.8,34.1v.2L61,166.6A24.1,24.1,0,0,0,84.1,184h95.8A24.1,24.1,0,0,0,203,166.6l26.4-92.4A8,8,0,0,0,228.1,67.2Z"/></svg>
      </span>
      </div>
      <button id="details"><a href="#${card.id}">Details</a></button>
    </div>

    <section id="${card.id}" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <header class="container">
            <h2>${card.name}</h2>
            <a href="#" class="closebtn">×</a>
          </header>
          <div class="container">
            <img src="${card.imagelink_portrait}" alt="">
            <div class="coffee-data">
               <div class="sp-data">
              <div>Roasted: <span>${card.roasted}</span></div>
              <div>Ingredients: <span>${card.ingredients}</span></div>
              <div>Special Ingredient: <span>${card.special_ingredient}</span></div>
             </div>
              <p class="price-container">Price: <span class="price-cnt">${card.prices[1].price}$</span></p>
              <div class="price-data">
                <button class=" size-button size-button-S" onclick="(function() {document.querySelectorAll('.price-cnt')[${card.index}].textContent = ${card.prices[0].price}})();">S</button>
                <button class="size-button size-button-M selected" onclick="(function() {document.querySelectorAll('.price-cnt')[${card.index}].textContent = ${card.prices[1].price}})();">M</button>
                <button class="size-button size-button-L" onclick="(function() {document.querySelectorAll('.price-cnt')[${card.index}].textContent = ${card.prices[2].price}})();">L</button>
              </div>

              <p>${card.description}</p>
          </div>
          <footer class="container">
           
          </footer>
        </div>
      </div>
    </section>
  `;
    }

    function renderCards(start, end, data) {
      for (let i = start; i < end && i < data.length; i++) {
        cardsHTML.innerHTML += renderCard(data[i]);
      }
      switchSVGs();
    }

    const moreBtn = document.getElementById("more-btn");
    const searchInput = document.getElementById("searchInput");

    function loadMoreCards() {
      const endIndex = startIndex + cardsPerLoad;
      renderCards(startIndex, endIndex, CoffeeData);
      startIndex = endIndex;

      moreBtn.style.display =
        startIndex >= CoffeeData.length ? "none" : "block";
    }

    function search() {
      cardsContainer.innerHTML = "";
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = CoffeeData.filter((card) =>
        card.name.toLowerCase().includes(searchTerm)
      );
      if (filteredData.length === 0) {
        cardsContainer.innerHTML = `There is no results with '${searchInput.value}'`;
      }
      startIndex = 0;
      renderCards(startIndex, cardsPerLoad, filteredData);
      moreBtn.style.display =
        startIndex >= filteredData.length ? "none" : "block";
    }

    loadMoreCards();

    const filterContainer = document.getElementById("filterButtons");

    const coffeeTypes = [...new Set(CoffeeData.map((coffee) => coffee.type))];

    coffeeTypes.forEach((type) => {
      const button = document.createElement("button");
      button.setAttribute("data-type", type);

      const buttonText = type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      button.textContent = buttonText;
      filterContainer.appendChild(button);
    });

    moreBtn.addEventListener("click", loadMoreCards);

    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", search);

    document
      .querySelector("#filterButtons")
      .addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
          let buttons = document.querySelectorAll(".filter button");
          buttons.forEach(function (btn) {
            btn.classList.remove("active");
          });

          event.target.classList.add("active");

          cardsContainer.innerHTML = "";
          const searchTerm = event.target.getAttribute("data-type");

          if (searchTerm === "all") {
            loadMoreCards();
          } else {
            const filteredData = CoffeeData.filter(
              (card) =>
                card.type === searchTerm &&
                card.name
                  .toLowerCase()
                  .includes(searchInput.value.toLowerCase())
            );
            if (filteredData.length === 0) {
              cardsContainer.innerHTML = `There is no results with '${searchInput.value}'`;
            }
            startIndex = 0;
            renderCards(startIndex, cardsPerLoad, filteredData);
            moreBtn.style.display =
              cardsPerLoad >= filteredData.length ? "none" : "block";
          }
        }
      });


      let cartElements = [];
      function findCardById(id, data) {
        const CardById = data.filter(coffee => coffee.id === id);
        console.log(CardById[0]);
        cartElements.push(CardById[0])
      }

      const aside = document.getElementById("aside");
      aside.innerHTML += `${cartElements}`

      const cartIcn = document.getElementById("cart-icn");

      cartIcn.addEventListener("click", () => {
        aside.classList.toggle("hidden")
        console.log("clicked");
      })

    /*************    Toggle heart, cart svgs   ************/

    let count = document.getElementById("count");
    let countNum = 0;

    function switchSVGs() {
      const spans = document.querySelectorAll(".fill-icons");

      spans.forEach((span) => {
        span.addEventListener("click", function () {
          const svgEls = this.querySelectorAll("svg");
          let visibleSVG;
          let hiddenSVG;

          for (const svg of svgEls) {
            if (!svg.classList.contains("hidden")) {
              visibleSVG = svg;
              if(svg.classList.contains("cartIcn")) {
                countNum++;
                count.innerText = countNum;
                findCardById(svg.classList[1], CoffeeData)

              }
            } else if (!hiddenSVG && svg.classList.contains("hidden")) {
              hiddenSVG = svg;
              
            }
          }

          if (visibleSVG && hiddenSVG) {
            visibleSVG.classList.add("hidden");
            hiddenSVG.classList.remove("hidden");
            
          }
        });
      });
    }

    switchSVGs();


    /*************    selected price btn   ************/

    const sizeButtons = document.querySelectorAll(".size-button");

    sizeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        sizeButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });



