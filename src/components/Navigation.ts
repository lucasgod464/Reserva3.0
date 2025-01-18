export function Navigation(): string {
        return `
            <div class="navigation">
                <button class="nav-button" onclick="window.showReservationForm()">Reserva</button>
                <button class="nav-button" onclick="window.showAdminPanel()">Admin</button>
            </div>
        `;
    }
