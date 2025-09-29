// Сайт розроблено студенткою Бахтіною Поліною, група ФЕМП 5-3з управління бізнесом
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);
  document.getElementById('year2') && (document.getElementById('year2').textContent = y);
  document.getElementById('year3') && (document.getElementById('year3').textContent = y);

  const sidebar = document.getElementById('sidebar');
  document.querySelectorAll('#toggleSidebar').forEach(btn=>{
    btn.addEventListener('click', ()=> sidebar.classList.toggle('show'));
  });

  const services = [
    {id:1, category:'Волосся', title:'Жіноча стрижка (базова)', price:450, duration:'60 хв', desc:'Класична стрижка з урахуванням форми обличчя та структури волосся.'},
    {id:2, category:'Волосся', title:'Чоловіча стрижка', price:320, duration:'40 хв', desc:'Стрижка, укладка, порада щодо догляду.'},
    {id:3, category:'Волосся', title:'Дитяча стрижка', price:270, duration:'30 хв', desc:'Дружній підхід для дітей до 12 років.'},
    {id:4, category:'Волосся', title:'Фарбування — однотонне (корені)', price:900, duration:'120 хв', desc:'Фарбування кореневої зони професійною фарбою.'},
    {id:5, category:'Волосся', title:'Фарбування — повністю (омбре/суцільно)', price:1400, duration:'180 хв', desc:'Повне фарбування або складні техніки (омбре, балаяж). Ціна залежить від довжини.'},
    {id:6, category:'Волосся', title:'Мелірування', price:1300, duration:'150 хв', desc:'Мелірування різними техніками, тонування у відтінок.'},
    {id:7, category:'Укладка', title:'Укладка вечірня', price:600, duration:'60-90 хв', desc:'Складні зачіски для свят — плетіння, начіс, фіксація.'},
    {id:8, category:'Нігті', title:'Манікюр (класичний)', price:350, duration:'60 хв', desc:'Комфортний манікюр з обробкою кутикули та лаком.'},
    {id:9, category:'Нігті', title:'Манікюр гель-лак', price:550, duration:'90 хв', desc:'Манікюр з нанесенням гель-лаку, сушка в UV-лампі.'},
    {id:10, category:'Нігті', title:'Педикюр', price:600, duration:'90 хв', desc:'Педикюр з обробкою ніг і нанесенням лаку.'},
    {id:11, category:'Брови', title:"Корекція та фарбування брів", price:250, duration:'40 хв', desc:'Моделювання форми, фарбування, поради щодо догляду.'},
    {id:12, category:'Вії', title:'Ламінування вій', price:700, duration:'60 хв', desc:'Ламінування для ефекту довших та доглянутих вій.'},
    {id:13, category:'Косметологія', title:'Очищення обличчя (базове)', price:800, duration:'60 хв', desc:'Професійне очищення та легкий догляд.'},
    {id:14, category:'Косметологія', title:'Пілінг (середній)', price:1200, duration:'60-90 хв', desc:'Робиться серією або як одноразова процедура залежно від потреб.'},
    {id:15, category:'Макіяж', title:'Денний макіяж', price:500, duration:'45 хв', desc:'Натуральний макіяж для щодення.'},
    {id:16, category:'Макіяж', title:'Вечірній/Весільний макіяж', price:1200, duration:'90 хв', desc:'Професійний образ з фіксацією та пробним макіяжем за домовленістю.'},
  ];

  const products = [
    {id:'p1', name:'Шампунь професійний 250ml', price:420},
    {id:'p2', name:'Маска для волосся 200ml', price:580},
    {id:'p3', name:'Сироватка для обличчя 30ml', price:890},
    {id:'p4', name:'Лак для нігтів (трендовий відтінок)', price:220},
  ];

  window._BAKHTINA = {services, products};

  const prodPreview = document.getElementById('productPreview');
  if(prodPreview){
    products.slice(0,3).forEach(p=>{
      const el = document.createElement('div');
      el.className = 'product';
      el.innerHTML = `<strong>${p.name}</strong><div class="muted">Ціна: ${p.price} грн</div>`;
      prodPreview.appendChild(el);
    });
  }

  const servicesList = document.getElementById('servicesList');
  const filterCategory = document.getElementById('filterCategory');
  const searchService = document.getElementById('searchService');

  function uniqueCats(arr){
    const s = new Set(arr.map(i=>i.category));
    return Array.from(s);
  }
  if(filterCategory){
    const cats = uniqueCats(services);
    cats.forEach(c=>{
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      filterCategory.appendChild(opt);
    });
  }

  function renderServices(list){
    if(!servicesList) return;
    servicesList.innerHTML = '';
    list.forEach(s=>{
      const item = document.createElement('div');
      item.className = 'service-item';
      item.innerHTML = `<h4>${s.title} <span class="badge">${s.price}₴</span></h4>
        <div class="muted">${s.category} • ${s.duration}</div>
        <p>${s.desc}</p>
        <button class="btn" data-id="${s.id}">Записатися</button>`;
      servicesList.appendChild(item);
    });
    servicesList.querySelectorAll('button[data-id]').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const id = Number(e.currentTarget.dataset.id);
        const svc = services.find(x=>x.id===id);
        if(svc){
          // зберігаємо вибрану послугу у localStorage
          localStorage.setItem('selectedService', svc.title);
          // переходимо на сторінку contacts.html
          window.location.href = 'contacts.html';
        }
      });
    });
  }

  renderServices(services);

  if(filterCategory){
    filterCategory.addEventListener('change', ()=>{
      const val = filterCategory.value;
      let list = services.slice();
      if(val !== 'all') list = list.filter(x=>x.category === val);
      if(searchService && searchService.value.trim()) {
        const q = searchService.value.trim().toLowerCase();
        list = list.filter(x=> (x.title+x.desc).toLowerCase().includes(q));
      }
      renderServices(list);
    });
  }

  if(searchService){
    searchService.addEventListener('input', ()=>{
      const q = searchService.value.trim().toLowerCase();
      let list = services.slice();
      const cat = filterCategory ? filterCategory.value : 'all';
      if(cat !== 'all') list = list.filter(x=>x.category === cat);
      if(q) list = list.filter(x=> (x.title+x.desc).toLowerCase().includes(q));
      renderServices(list);
    });
  }

  const productsList = document.getElementById('productsList');
  if(productsList){
    products.forEach(p=>{
      const el = document.createElement('div');
      el.className = 'product';
      el.innerHTML = `<strong>${p.name}</strong><div class="muted">Ціна: ${p.price} грн</div>
      <div style="margin-top:8px"><button class="btn" data-product="${p.id}">Замовити</button></div>`;
      productsList.appendChild(el);
    });
    productsList.querySelectorAll('button[data-product]').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = e.currentTarget.dataset.product;
        const pr = products.find(x=>x.id===id);
        if(pr) alert(`Дякуємо! Ви вибрали товар: ${pr.name} — ${pr.price}₴. Зв'яжіться з нами для оплати/самовивозу.`);
      });
    });
  }

  // Contact form logic + автопідстановка послуги
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    const result = document.getElementById('formResult');
    // підставляємо вибрану послугу у textarea
    const selectedService = localStorage.getItem('selectedService');
    if(selectedService){
      const cfMsg = document.getElementById('cfMsg');
      if(cfMsg) cfMsg.value = `Запис на послугу: ${selectedService}`;
      localStorage.removeItem('selectedService'); // очищаємо після підстановки
    }

    contactForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const name = document.getElementById('cfName').value.trim();
      const phone = document.getElementById('cfPhone').value.trim();
      const email = document.getElementById('cfEmail').value.trim();
      const msg = document.getElementById('cfMsg').value.trim();
      if(!name || !phone || !email || !msg){
        result.textContent = 'Будь ласка, заповніть усі поля.';
        return;
      }
      result.textContent = `Дякуємо, ${name}! Ваше повідомлення прийнято. Ми зв'яжемося за телефоном ${phone}.`;
      contactForm.reset();
    });
    document.getElementById('resetContact').addEventListener('click', ()=>{
      contactForm.reset();
      document.getElementById('formResult').textContent = '';
    });
  }
});
