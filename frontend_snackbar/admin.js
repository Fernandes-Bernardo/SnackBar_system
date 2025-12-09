

const API_BASE_URL = 'https://localhost:5232'; 

/**
 * Sends a stock movement request (entrada or saída) to the backend.
 * @param {object} movementData - The request body object (EntradaRequest/SaidaRequest).
 * @param {string} endpoint - The specific API path, e.g., '/movimentacoes/produtos'.
 */
async function sendStockMovement(movementData) {
    const url = `${API_BASE_URL}/movimentacoes/produtos`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            // CRUCIAL: Tell the API the body is JSON
            headers: {
                'Content-Type': 'application/json'
            },
            // Convert the JavaScript object into a JSON string
            body: JSON.stringify(movementData)
        });

        if (response.ok) {
            // Success response (HTTP 200/201)
            const result = await response.json();
            console.log("Movimentação registrada com sucesso:", result);
            alert(`Sucesso! Movimentação de ${movementData.quantidade} registrada.`);
            // You might want to refresh the product list here
            return result;
        } else if (response.status === 404) {
            const errorText = await response.text();
            alert(`Erro 404: ${errorText}`);
            console.error("404 Error:", errorText);
        } else {
            // Other HTTP errors (400, 500, etc.)
            alert(`Erro ao registrar movimentação: ${response.status} ${response.statusText}`);
            console.error("API Error:", response.status, response.statusText);
        }
    } catch (error) {
        // Network errors or fetch operation failure
        alert("Erro de conexão com o servidor. Verifique o console.");
        console.error("Network Error:", error);
    }
}

// --- Example Usage (You would integrate this into a form submission) ---


// Assuming you have a form on your admin page to submit stock movement
const stockMovementForm = document.getElementById('stock-movement-form'); 

stockMovementForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data (assuming these are the IDs of your form fields)
    const data = {
        produtoId: parseInt(document.getElementById('mov_produtoId').value),
        usuarioId: parseInt(document.getElementById('mov_usuarioId').value),
        tipo: document.getElementById('mov_tipo').value, // 'Entrada' or 'Saida'
        quantidade: parseInt(document.getElementById('mov_quantidade').value)
    };

    // Call the function
    sendStockMovement(data);
    
    this.reset();
});
