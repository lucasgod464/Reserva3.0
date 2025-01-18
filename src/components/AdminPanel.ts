export function AdminPanel(): string {
        return `
            <div id="admin-container" class="admin-container" style="display: none;">
                <h2 class="admin-title">Painel de Administração</h2>
                <div class="price-config">
                    <label for="adultPrice">Preço Adulto:</label>
                    <input type="number" id="adultPrice" placeholder="Preço Adulto">

                    <label for="childPrice5">Preço Criança (até 5 anos):</label>
                    <input type="number" id="childPrice5" placeholder="Preço Criança (até 5 anos)">

                    <label for="childPrice10">Preço Criança (6 a 10 anos):</label>
                    <input type="number" id="childPrice10" placeholder="Preço Criança (6 a 10 anos)">

                    <button onclick="savePrices()">Salvar Preços</button>
                </div>
                <div class="table-container">
                    <table class="reservas-table" id="reservas-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Número de Pessoas</th>
                                <th>Nome do Responsável</th>
                                <th>Telefone</th>
                                <th>Pessoas</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
