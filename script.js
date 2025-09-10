const logoScreen = document.getElementById('logoScreen');
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    const lockTime = document.getElementById('lockTime');
    const lockDate = document.getElementById('lockDate');
    const appsGrid = document.getElementById('appsGrid');

    const apps = [
      { name: 'Teléfono', icon: 'img/tlf.webp' },
      { name: 'Mensajes', icon: 'img/mensaje.webp' },
      { name: 'Safari', icon: "img/safari.webp"},
      { name: 'Cámara', icon: 'img/camara.webp' },
      { name: 'Correo', icon: 'img/gmail.webp' },
      { name: 'Reloj', icon: 'img/reloj.webp' },
      { name: 'Notas', icon: 'img/documentos.webp' },
      { name: 'Ajustes', icon: 'img/ajustes.webp' },
      { name: 'Fotos', icon: 'img/galeria.webp' },
      { name: 'App Store', icon: 'img/store.png' },
      { name: 'Música', icon: 'img/appelMusic.png' },
      { name: 'Calendario', icon: 'img/calendario.png' },
    ];

    function loadApps() {
      appsGrid.innerHTML = '';
      apps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.className = 'app';
        appDiv.title = app.name;

        const iconImg = document.createElement('img');
        iconImg.src = app.icon;
        iconImg.alt = `${app.name} icon`;
        iconImg.className = 'app-icon';
        appDiv.appendChild(iconImg);

        const label = document.createElement('div');
        label.className = 'app-label';
        label.textContent = app.name;
        appDiv.appendChild(label);

        appsGrid.appendChild(appDiv);
      });
    }

    function updateLockTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const date = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      lockTime.textContent = `${hours}:${minutes}`;
      lockDate.textContent = date.charAt(0).toUpperCase() + date.slice(1);
    }

    updateLockTime();
    setInterval(updateLockTime, 60000);

    setTimeout(() => {
      logoScreen.style.opacity = 0;
      logoScreen.style.pointerEvents = 'none';
      setTimeout(() => {
        logoScreen.style.display = 'none';
        lockScreen.style.display = 'flex';
        requestAnimationFrame(() => {
          lockScreen.style.opacity = 1;
        });
      }, 1000);
    }, 3000);

    // swipe desde lockscreen para abrir home
    let startY = null;
    lockScreen.addEventListener('mousedown', (e) => {
      startY = e.clientY;
    });
    lockScreen.addEventListener('mouseup', (e) => {
      const endY = e.clientY;
      if (startY !== null && startY - endY > 100) {
        lockScreen.style.opacity = 0;
        lockScreen.style.pointerEvents = 'none';
        setTimeout(() => {
          lockScreen.style.display = 'none';
          homeScreen.style.display = 'flex';
          requestAnimationFrame(() => {
            homeScreen.style.opacity = 1;
          });
        }, 500);
      }
      startY = null;
    });

    // cargar apps al inicio
    loadApps();