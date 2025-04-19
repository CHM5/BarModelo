// URL pública de tu Google Sheet convertida en JSON (te explico más abajo cómo hacer esto)
const sheetID = '1bHOgSjbDydp69BeUS0Ln9JFke6Y2U0SGcwahUeAPAuc';
const sheetName = 'Hoja1'; // El nombre de tu pestaña en Sheets
const apiKey = 'AIzaSyDehY-9HbHf7Ngj0OZCHr21Txs_TEL-gHg'; 

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;
    rows.shift(); // Quita el encabezado (Nombres de columnas)

    rows.forEach(row => {
      const categoria = row[0];
      const nombre = row[1];
      const descripcion = row[2];
      const precio = row[3];

      const platoDiv = document.createElement('div');
      platoDiv.className = 'plato';
      platoDiv.innerHTML = `<h3>${nombre} - $${precio}</h3><p>${descripcion}</p>`;

      if (categoria.toLowerCase() === 'entrada') {
        document.getElementById('entradas').appendChild(platoDiv);
      } else if (categoria.toLowerCase() === 'principal') {
        document.getElementById('platos').appendChild(platoDiv);
      } else if (categoria.toLowerCase() === 'postre') {
        document.getElementById('postres').appendChild(platoDiv);
      }
    });
  })
  .catch(error => {
    console.error('Error cargando el menú:', error);
  });
