# 📱 BancoXYZ – Prueba Técnica

Aplicación móvil desarrollada con **React Native + Expo** que implementa un flujo básico bancario: autenticación, consulta de saldo, transferencias y listado de movimientos.

---

# 🚀 Instalación

```bash
git clone https://github.com/narendavid/prueba-topaz
cd prueba-topaz
npm install
```

---

# ▶️ Ejecutar la aplicación

```bash
npm run start
```

También puedes ejecutar en:

```bash
npm run android
npm run ios
```

---

# 🔐 Credenciales de prueba

- gabriel@topaz.com / 1111
- alejo@topaz.com / 2222
- wilson@topaz.com / 3333

---

# 🧪 Ejecutar pruebas

```bash
npm test
```

---

# ⚙️ Stack principal

- React Native (Expo)
- Expo Router
- Zustand (estado global)
- Axios (API)
- Expo SecureStore (persistencia segura)
- Jest (testing)

---

# 🧠 Notas técnicas

- Manejo de autenticación con token (persistido en SecureStore)
- Interceptores de Axios para inyección automática del token
- Logout automático ante errores 401/403
- Tests enfocados en lógica crítica (auth y flujo de datos)
