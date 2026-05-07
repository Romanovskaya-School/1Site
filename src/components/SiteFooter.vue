<template>
  <footer>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="nav-logo">
            <span class="logo-name">Виктория Терехова</span>
            <span class="logo-sub">Психолог онлайн</span>
          </div>
          <p style="margin-top:16px">Бережная психологическая помощь.</p>
        </div>

        <ul class="footer-col">
          <h4>Навигация</h4>
          <li><router-link to="/about">О психологе</router-link></li>
          <li><router-link to="/rpp">РПП</router-link></li>
          <li><router-link to="/personal">Личная терапия</router-link></li>
          <li><router-link to="/family">Семейная терапия</router-link></li>
        </ul>

        <ul class="footer-col">
          <h4>Связаться</h4>
          <li><a :href="siteData.contactTg" target="_blank">Telegram</a></li>
          <li><a :href="siteData.contactWa" target="_blank">WhatsApp</a></li>
          <li><a href="mailto:vika@terekhova.ru">Email</a></li>
          <li><a href="#contact">Записаться</a></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Виктория Терехова. Все права защищены.</span>
        <span>Психолог-консультант · КПТ · Гештальт</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSiteData } from '../composables/useSiteData'
const { siteData } = useSiteData()
</script>
