function showFileContent() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.readAsText(file);

  reader.onloadstart = function () {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.textContent = 'Cargando...';
  };

  reader.onload = function () {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.textContent = ''; // Limpiar el mensaje de carga

    const fileContent = document.getElementById('fileContent');
    fileContent.textContent = reader.result;

    const lines = reader.result.trim().split('\n');

    const A = parseInt(lines[0]);
    const B = parseInt(lines[1]);
    const n = parseInt(lines[2]);
    const buyers = lines.slice(3).map((line) => line.split(',').map(Number));

    // Verificar si el último elemento es un número entero y guardarlo en una constante
    let lastElement = buyers.pop();
    const lastInt = (typeof lastElement === 'number' && Number.isInteger(lastElement)) ? lastElement : null;

    const selectedFunction = document.getElementById('opcion').value;

    let result;

    if (selectedFunction === 'opcion1') {
      result = accionesFB(A, B, n, buyers);
    } else if (selectedFunction === 'opcion2') {
      result = accionesV(buyers, A);
    } else if (selectedFunction === 'opcion3') {
      result = accionesPD1(buyers, A);
      console.log(accionesPD1(buyers, A));
    } else if (selectedFunction === 'opcion4') {
      result = accionesPD2( A, n, buyers,parseInt(lastElement));
    }

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'El resultado es: ' + result.join(', ');

    // Escribir el resultado en el archivo
    const output = result.join('\n');
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'output.txt';
    a.href = url;
    a.textContent = 'Descargar resultado';
    resultDiv.appendChild(document.createElement('br'));
    resultDiv.appendChild(a);
  };
}