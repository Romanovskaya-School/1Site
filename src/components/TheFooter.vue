<template>
  <footer>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="nav-logo">
            <span class="logo-name">Виктория Терехова</span>
            <span class="logo-sub">Психолог · Онлайн</span>
          </div>
          <p style="margin-top:16px">
            Создаю безопасное пространство для вашего роста и исцеления. Онлайн-консультации для клиентов по всему миру.
          </p>
        </div>

        <ul class="footer-col">
          <h4>Навигация</h4>
          <li><router-link to="/#about">О психологе</router-link></li>
          <li><router-link to="/#services">Услуги и цены</router-link></li>
          <li><router-link to="/#how">Как это работает</router-link></li>
          <li><router-link to="/articles">Статьи</router-link></li>
          <li><router-link to="/#testimonials">Отзывы</router-link></li>
        </ul>

        <ul class="footer-col">
          <h4>Связаться</h4>
          <li><a href="https://t.me/vikaterekhova" target="_blank">Telegram</a></li>
          <li><a href="https://wa.me/79001234567" target="_blank">WhatsApp</a></li>
          <li><a href="mailto:vika@terekhova.ru">Email</a></li>
          <li><router-link to="/#contact">Записаться</router-link></li>
        </ul>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Виктория Терехова. Все права защищены.</span>
        <span>Психолог-консультант · КПТ · Гештальт</span>
      </div>
    </div>
  </footer>
</template>
