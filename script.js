const searchInput = document.getElementById('searchInput');
const detailsArea = document.getElementById('detailsArea');
const errorContent = document.getElementById('errorHandleArea');

const clickForSearch = () => {
  const itemsName = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemsName}`)
    .then((res) => res.json())
    .then((data) => {
      const foodItems = document.getElementById('food-items');
      let dataItem = '';

      if (itemsName === '') {
        errorContent = alert('Please Provide Your favourite Food ')
        foodItems.innerHTML = '';
      } else if (data.meals) {
        data.meals.forEach((item) => {
          dataItem += `
          <div onclick="itemDetails('${item.strMeal}')" class="food-item"> 
            <img src="${item.strMealThumb}" />
            <h4>${item.strMeal}</h4>
          </div>`;
        });

        foodItems.innerHTML = dataItem;
      } else {
        errorContent.innerHTML = `
          <div>
            <h2>Please Enter Your Favorite Food .</h2>
            <button onclick="closeButton()" class="close">X</button>
          </div>
        `;

        errorContent.style.display = 'block';
        foodItems.innerHTML = '';
      }
      detailsArea.style.display = 'none';
    });
  searchInput.value = '';
};

const closeButton = () => {
  detailsArea.style.display = 'none';
  errorContent.style.display = 'none';
};


const itemDetails = (itemName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
    .then((res) => res.json())
    .then((data) => {
      const itemDetailsArea = document.getElementById('item-details');
      const mealsItem = data.meals[0];
      itemDetailsArea.innerHTML = `
        <div class="details-img">
          <img
            src="${mealsItem.strMealThumb}"
            alt="${mealsItem.strMeal}"
          />
        </div>
        <h2>${mealsItem.strMeal}</h2>
        <h4>Ingredient</h4>
        <ul>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure1} ${mealsItem.strIngredient1}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure2} ${mealsItem.strIngredient2}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure3} ${mealsItem.strIngredient3}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure4} ${mealsItem.strIngredient4}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure5} ${mealsItem.strIngredient5}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure6} ${mealsItem.strIngredient6}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure7} ${mealsItem.strIngredient7}</li>
          <li><span class="check-icon">&#x2714;</span>${mealsItem.strMeasure8} ${mealsItem.strIngredient8}</li>
          </ul>
        <button onclick="closeButton()" class="close">X</button>
      `;

      detailsArea.style.display = 'block';

    });
};


