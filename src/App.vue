<template>
  <router-view />
</template>

<script setup>
</script>

<style>
:root {
  --color-primary: #8FB3A3;
  --color-primary-dark: #7A9E8C;
  --color-secondary: #D4C1EC;
  --color-accent: #F5D5CB;
  --color-bg: #FDF8F5;
  --color-bg-light: #FFFFFF;
  --color-text: #4A4A4A;
  --color-text-light: #7A7A7A;
  --color-white: #FFFFFF;
  --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.1);
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app {
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(253, 248, 245, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-soft);
  padding: 15px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--color-primary);
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

.btn-large {
  padding: 16px 36px;
  font-size: 1.1rem;
}

.btn-outline {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, var(--color-bg) 0%, #F0EDE9 100%);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--color-text);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-light);
  margin-bottom: 40px;
}

.hero-decoration {
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
  opacity: 0.5;
}

.section {
  padding: 100px 0;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: var(--color-text);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: 60px;
  font-size: 1.1rem;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-text p {
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.about-info {
  background: var(--color-white);
  padding: 30px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
}

.info-item {
  margin-bottom: 20px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: 5px;
}

.info-value {
  font-weight: 500;
  color: var(--color-text);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: var(--color-white);
  padding: 35px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.service-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--color-text);
}

.service-description {
  color: var(--color-text-light);
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.service-price {
  display: block;
  font-weight: 600;
  color: var(--color-primary-dark);
  font-size: 1.1rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.pricing-card {
  background: var(--color-white);
  padding: 40px 30px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.pricing-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.pricing-duration {
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 15px;
}

.pricing-description {
  color: var(--color-text-light);
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.pricing-price {
  display: block;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 25px;
}

.contacts-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.contact-link:hover {
  color: var(--color-primary);
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input {
  padding: 16px 20px;
  border: 1px solid #E0DDD8;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
  background: var(--color-white);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.footer {
  background: var(--color-white);
  padding: 30px 0;
  text-align: center;
  color: var(--color-text-light);
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-link {
  color: var(--color-text-light);
  text-decoration: none;
  font-size: 0.9rem;
}

.admin-link:hover {
  color: var(--color-primary);
}

@media (max-width: 968px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .services-grid,
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  
  .about-content,
  .contacts-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}
</style>
