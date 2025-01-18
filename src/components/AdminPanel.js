export function AdminPanel() {
        return `
            <div id="admin-container" class="admin-container" style="display: none;">
                <h2 class="admin-title">Painel de Administração</h2>
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
