const $ = selector => document.querySelector(selector);
const $all = selector => document.querySelectorAll(selector);

const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker Registered:', reg))
      .catch(err => console.log('Service Worker Failed:', err));
  });
}

function rotateHeroSlogan() {
  const quotes = ["Eat healthy, live better.","Wellness starts with small steps.","Fuel your body, feed your mind."];
  const heroQuote = $("#hero-quote");
  if (!heroQuote) return;
  let i = 0;
  setInterval(()=>{ heroQuote.textContent = quotes[i % quotes.length]; i++; },5000);
}
rotateHeroSlogan();

function displayDailyTips() {
  const tips = ["Drink 8 glasses of water.","Take a 10-minute walk.","Eat 5 servings of vegetables.","Stretch for 5 minutes.","Meditate for 5 minutes."];
  const tipEl = $("#tips-container");
  if(!tipEl) return;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / 1000 / 60 / 60 / 24);
  tipEl.innerHTML = `<p>${tips[dayOfYear % tips.length]}</p>`;
}
displayDailyTips();

const newsletterForm = $("#newsletterForm");
if(newsletterForm){
  newsletterForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    const success = $("#newsletter-success");
    const error = $("#newsletter-error");
    if(/\S+@\S+\.\S+/.test(email)){
      let emails = getFromLocalStorage("newsletterEmails")||[];
      emails.push(email);
      saveToLocalStorage("newsletterEmails",emails);
      if(success) success.textContent="Thank you for subscribing!";
      if(error) error.textContent="";
      newsletterForm.reset();
    }else{
      if(error) error.textContent="Please enter a valid email.";
      if(success) success.textContent="";
    }
  });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });
}

const recipes = [
  {
      title: "Avocado Toast",
      category: "Breakfast",
      description: "Simple, healthy, and delicious avocado toast.",
      image:"https://cdn.loveandlemons.com/wp-content/uploads/2020/01/avocado-toast-500x375.jpg", 
      ingredients: ["2 slices whole-grain bread", "1 avocado", "Salt & pepper", "Lemon juice"],
      steps: ["Toast the bread", "Mash avocado with lemon, salt & pepper", "Spread avocado on toast"],
      nutrition: {calories: 250, protein: 6, carbs: 30, fat: 12}
  },
  {
      title: "Grilled Chicken Salad",
      category: "Lunch",
      description: "Fresh salad with grilled chicken breast and veggies.",
      image: "https://www.eatingbirdfood.com/wp-content/uploads/2023/06/grilled-chicken-salad-hero-500x500.jpg",
      ingredients: ["100g grilled chicken", "Mixed greens", "Cherry tomatoes", "Olive oil dressing"],
      steps: ["Grill the chicken", "Mix greens and tomatoes", "Top with chicken and drizzle dressing"],
      nutrition: {calories: 350, protein: 30, carbs: 15, fat: 18}
  },
  {
      title: "Quinoa Veggie Bowl",
      category: "Dinner",
      description: "Protein-packed quinoa with roasted vegetables.",
      image: "https://www.floatingkitchen.net/wp-content/uploads/2022/03/Roasted-Vegetable-Quinoa-Bowls-1.jpg",
      ingredients: ["1 cup quinoa", "Assorted vegetables", "Olive oil", "Herbs"],
      steps: ["Cook quinoa", "Roast vegetables with olive oil", "Mix together and season"],
      nutrition: {calories: 400, protein: 12, carbs: 60, fat: 10}
  },
  {
      title: "Fruit & Nut Yogurt",
      category: "Snack",
      description: "Quick and healthy yogurt snack with fruits and nuts.",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-901820_10-3b54117.jpg?quality=90&resize=440,400",
      ingredients: ["1 cup Greek yogurt", "Mixed berries", "Handful of nuts"],
      steps: ["Mix yogurt with berries", "Top with nuts", "Enjoy immediately"],
      nutrition: {calories: 200, protein: 10, carbs: 20, fat: 8}
  },
  {
      title: "Overnight Oats",
      category: "Breakfast",
      description: "Easy overnight oats with almond milk and fruits.",
      image: "https://www.livveganstrong.com/wp-content/uploads/2022/10/overnight-oats-with-almond-milk-fp.jpg",
      ingredients: ["1/2 cup oats", "1 cup almond milk", "Chia seeds", "Berries"],
      steps: ["Mix all ingredients in a jar", "Refrigerate overnight", "Serve chilled"],
      nutrition: {calories: 300, protein: 8, carbs: 45, fat: 10}
  },
  {
      title: "Turkey Wrap",
      category: "Lunch",
      description: "Whole-grain wrap with turkey and veggies.",
      image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/06/Turkey-Wraps-18.jpg",
      ingredients: ["Whole-grain wrap", "Sliced turkey", "Lettuce", "Tomatoes", "Mustard"],
      steps: ["Lay out wrap", "Add turkey and veggies", "Roll and serve"],
      nutrition: {calories: 320, protein: 25, carbs: 28, fat: 12}
  },
  {
      title: "Baked Salmon",
      category: "Dinner",
      description: "Oven-baked salmon with lemon and herbs.",
      image: "https://www.wellplated.com/wp-content/uploads/2018/06/Baked-Salmon-in-Foil-at-400.jpg",
      ingredients: ["Salmon fillet", "Lemon slices", "Olive oil", "Herbs"],
      steps: ["Preheat oven to 200°C", "Place salmon on baking tray", "Top with lemon and herbs, bake 15-20 min"],
      nutrition: {calories: 450, protein: 35, carbs: 0, fat: 30}
  },
  {
      title: "Hummus & Veggies",
      category: "Snack",
      description: "Healthy hummus with fresh vegetable sticks.",
      image: "https://whiskingmama.com/wp-content/uploads/2021/02/HUMMAS-CHARCUTERIE-BOARD.jpg",
      ingredients: ["Hummus", "Carrot sticks", "Cucumber sticks", "Bell peppers"],
      steps: ["Cut veggies into sticks", "Serve with hummus"],
      nutrition: {calories: 180, protein: 5, carbs: 15, fat: 10}
  },
  {
      title: "Veggie Stir-Fry",
      category: "Dinner",
      description: "Quick stir-fry with mixed vegetables and tofu.",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2025/02/stir-fry-recipe.jpg",
      ingredients: ["Assorted vegetables", "Tofu", "Soy sauce", "Garlic"],
      steps: ["Sauté garlic in pan", "Add vegetables and tofu", "Cook until tender, add soy sauce"],
      nutrition: {calories: 350, protein: 18, carbs: 40, fat: 12}
  },
  {
      title: "Banana Smoothie",
      category: "Snack",
      description: "Creamy banana smoothie with almond milk.",
      image: "https://beamingbaker.com/wp-content/uploads/2022/03/pineapple-banana-smoothie-pineapple-and-banana-smoothie-2.jpg",
      ingredients: ["1 banana", "1 cup almond milk", "1 tsp honey"],
      steps: ["Blend banana and milk", "Add honey", "Serve chilled"],
      nutrition: {calories: 220, protein: 3, carbs: 50, fat: 5}
  },
  {
      title: "Egg & Spinach Muffins",
      category: "Breakfast",
      description: "Protein-rich egg muffins with spinach.",
      image: "https://lifemadesweeter.com/wp-content/uploads/Spinach-and-Cheese-Breakfast-Egg-Muffins-Recipe-SINGLE-Photo-Picture.jpg",
      ingredients: ["4 eggs", "Spinach", "Cheese", "Salt & pepper"],
      steps: ["Preheat oven 180°C", "Mix ingredients and pour into muffin tray", "Bake 15-20 min"],
      nutrition: {calories: 180, protein: 12, carbs: 2, fat: 14}
  }
];

const recipesGrid = document.getElementById('recipesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('recipeModal');
const closeModal = document.querySelector('.modal .close');

function displayRecipes(list){
    if(!recipesGrid) return;
    recipesGrid.innerHTML = list.map((r,i)=>`
        <div class="recipe-card" data-index="${i}">
            <img src="${r.image}" alt="${r.title}" class="recipe-thumb">
            <h3>${r.title}</h3>
            <p>${r.description}</p>
            <p><strong>Category:</strong> ${r.category}</p>
            <button class="view-btn">View Recipe</button>
        </div>
    `).join('');
}
displayRecipes(recipes);

function filterRecipes(){
    if(!recipesGrid || !searchInput || !categoryFilter) return;
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const filtered = recipes.filter(r => 
        (r.title.toLowerCase().includes(searchText) || r.description.toLowerCase().includes(searchText)) &&
        (category === 'all' || r.category === category)
    );
    displayRecipes(filtered);
}
searchInput?.addEventListener('input', filterRecipes);
categoryFilter?.addEventListener('change', filterRecipes);

function showModal() { if(modal) modal.classList.add('show'); }
function hideModal() { if(modal) modal.classList.remove('show'); }

closeModal?.addEventListener('click', hideModal);

recipesGrid?.addEventListener('click', e => {
    if(e.target.classList.contains('view-btn')){
        const index = e.target.parentElement.dataset.index;
        const recipe = recipes[index];
        if(!recipe) return;
        document.getElementById('modalTitle').textContent = recipe.title;
        document.getElementById('modalDescription').textContent = recipe.description;
        document.getElementById('modalIngredients').innerHTML = recipe.ingredients.map(i=>`<li>${i}</li>`).join('');
        document.getElementById('modalSteps').innerHTML = recipe.steps.map(s=>`<li>${s}</li>`).join('');
        document.getElementById('modalNutrition').innerHTML = `
            <tr>
                <td>${recipe.nutrition.calories}</td>
                <td>${recipe.nutrition.protein}g</td>
                <td>${recipe.nutrition.carbs}g</td>
                <td>${recipe.nutrition.fat}g</td>
            </tr>
        `;
        showModal();
    }
});

window.addEventListener('click', e => {
    if(e.target === modal) hideModal();
});
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-msg');
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        

if (!name) {
  formMsg.textContent = 'Please enter your name';
  formMsg.className = 'error-msg';
  return;
}

if (!email) {
  formMsg.textContent = 'Please enter your email address';
  formMsg.className = 'error-msg';
  return;
}

if (!message) {
  formMsg.textContent = 'Please enter your message';
  formMsg.className = 'error-msg';
  return;
}
        if (!/\S+@\S+\.\S+/.test(email)) {
            formMsg.textContent = 'Please enter a valid email address';
            formMsg.className = 'error-msg';
            return;
        }

        const feedback = {
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString()
        };
        
        let allFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
        allFeedback.push(feedback);
        localStorage.setItem('feedback', JSON.stringify(allFeedback));
        
        formMsg.textContent = 'Thank you for your feedback!';
        formMsg.className = 'success-msg';
        contactForm.reset();
    });
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
});
function initBreathingAnimation() {
  const breathingContainer = document.querySelector('.breathing-container');
  if (!breathingContainer) return;
  
  let breathingCycle = 0;

  function animateBreathing() {
    breathingCycle++;
    const isInhale = breathingCycle % 2 === 1;
    
    breathingContainer.textContent = isInhale ? 'Breathe In' : 'Breathe Out';
    breathingContainer.style.backgroundColor = isInhale ? '#4CAF50' : '#81C784';
    
    setTimeout(animateBreathing, isInhale ? 4000 : 4000);
  }
  
  animateBreathing();
}

document.addEventListener('DOMContentLoaded', function() {
  initBreathingAnimation();
  
});
    const workouts = {
      arms: [
        {name:"Bicep Curls", desc:"Use dumbbells to strengthen biceps.", sets:3, reps:"12-15", rest:60},
        {name:"Tricep Dips", desc:"Use a chair or bench for triceps.", sets:3, reps:"12-15", rest:60},
        {name:"Hammer Curls", desc:"Target forearms with hammer curls.", sets:3, reps:"12-15", rest:60}
      ],
      chest: [
        {name:"Chest Press", desc:"Use dumbbells or barbell for chest.", sets:3, reps:"12-15", rest:60},
        {name:"Push-ups", desc:"Bodyweight exercise for chest and arms.", sets:3, reps:"12-15", rest:60}
      ],
      back: [
        {name:"Plank Rows", desc:"Engage back and core with dumbbells.", sets:3, reps:"12-15", rest:60},
        {name:"Superman", desc:"Strengthen lower back muscles.", sets:3, reps:"15-20", rest:60}
      ],
      legs: [
        {name:"Squats", desc:"Bodyweight or with dumbbells for legs.", sets:3, reps:"12-20", rest:60},
        {name:"Lunges", desc:"Step forward and bend knees to work legs.", sets:3, reps:"12-15", rest:60}
      ],
      fullbody: [
        {name:"Burpees", desc:"Full body cardio and strength.", sets:3, reps:"10-15", rest:60},
        {name:"Mountain Climbers", desc:"Core and cardio exercise.", sets:3, reps:"20-30", rest:60}
      ]
    };

    const generateBtn = document.getElementById('generateWorkout');
    const workoutGrid = document.getElementById('workoutGrid');

    generateBtn.addEventListener('click', () => {
      const bodyPart = document.getElementById('bodyPartSelect').value;
      const selectedWorkouts = workouts[bodyPart];
      workoutGrid.innerHTML = selectedWorkouts.map((w,i)=>`
        <div class="workout-card" data-index="${i}" data-part="${bodyPart}">
          <h3>${w.name}</h3>
          <p>${w.desc}</p> 
        </div>
      `).join('');
    });


    const modal2 = document.getElementById('workoutModal');
    const closeModal2 = document.querySelector('.modal .close');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalSets = document.getElementById('modalSets');
    const modalReps = document.getElementById('modalReps');
    const modalRest = document.getElementById('modalRest');
    const startTimerBtn = document.getElementById('startTimer');
    const timerDisplay = document.getElementById('timerDisplay');
    let timer;
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => { if(e.target === modal) modal.style.display='none'; });

    startTimerBtn.addEventListener('click', () => {
      let seconds = parseInt(modalRest.textContent);
      clearInterval(timer);
      timer = setInterval(() => {
        if(seconds <= 0){
          clearInterval(timer);
          timerDisplay.textContent = "Done!";
        } else {
          timerDisplay.textContent = `00:${seconds.toString().padStart(2,'0')}`;
          seconds--;
        }
      }, 1000);
    });


    const progressForm = document.getElementById('progressForm');
    const progressList = document.getElementById('progressList');
    let progress = JSON.parse(localStorage.getItem('progress')) || [];

    const renderProgress = () => {
      progressList.innerHTML = progress.map(p=>`<li>${p}</li>`).join('');
    };
    renderProgress();

    progressForm.addEventListener('submit', e => {
      e.preventDefault();
      const workout = document.getElementById('workoutDone').value.trim();
      if(workout){
        progress.push(workout + " ✅ (" + new Date().toLocaleDateString() + ")");
        localStorage.setItem('progress', JSON.stringify(progress));
        renderProgress();
        progressForm.reset();
      }
    });