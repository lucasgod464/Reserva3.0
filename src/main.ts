import { createClient } from '@supabase/supabase-js';
    import { Navigation } from './components/Navigation';
    import { ReservationForm } from './components/ReservationForm';
    import { AdminPanel } from './components/AdminPanel';

    const supabaseUrl = 'https://atvykyxlxntwaiphwrja.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dnlreXhseG50d2FpcGh3cmphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNTc0NjEsImV4cCI6MjA1MjczMzQ2MX0.WdllwJFqGby2dIOOemC6ZOb2zr6bhZOTMZYwXn1DD7U';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const app = document.getElementById('app') as HTMLElement;
    if (app) {
        if (window.location.pathname === '/admin') {
            app.innerHTML = Navigation() + AdminPanel();
            window.showAdminPanel();
        } else {
            app.innerHTML = Navigation() + ReservationForm();
        }
    }

    const numPessoasInput = document.getElementById('numPessoas') as HTMLInputElement;
    const personFieldsDiv = document.getElementById('person-fields') as HTMLElement;
    const nomeResponsavelInput = document.getElementById('nomeResponsavel') as HTMLInputElement;
    const address = "Rua Juiz David Barrilli, 376 - Jardim Aquarius, São José dos Campos - SP, 12246-200";
    const pixKey = "46002748814";
    const pixCopiedMessage = document.getElementById('pixCopiedMessage') as HTMLElement;
    const cupomContainer = document.getElementById('cupomContainer') as HTMLElement;
    const adminContainer = document.getElementById('admin-container') as HTMLElement;
    const reservasTableBody = document.getElementById('reservas-table')?.querySelector('tbody') as HTMLTableSectionElement;
    const adultPriceInput = document.getElementById('adultPrice') as HTMLInputElement;
    const childPrice5Input = document.getElementById('childPrice5') as HTMLInputElement;
    const childPrice10Input = document.getElementById('childPrice10') as HTMLInputElement;
    let reservationContainer = document.getElementById('reservation-container') as HTMLElement | null;

    function generatePersonFields() {
        personFieldsDiv.innerHTML = '';

        const numPessoas = parseInt(numPessoasInput.value, 10);

        const nomeResponsavelLabel = document.createElement('label');
        nomeResponsavelLabel.textContent = 'Nome do Responsável:';
        nomeResponsavelLabel.classList.add('label');
        nomeResponsavelLabel.setAttribute('for', 'nomeResponsavel');

        personFieldsDiv.appendChild(nomeResponsavelLabel);
        personFieldsDiv.appendChild(nomeResponsavelInput);

        for (let i = 2; i <= numPessoas; i++) {
            const personDiv = document.createElement('div');
            personDiv.classList.add('inputGroup', 'destaque');
            const label = document.createElement('label');
            label.textContent = `Nome da Pessoa ${i}:`;
            label.classList.add('label');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Nome da Pessoa ${i}`;
            input.classList.add('input');

            const childDiv = document.createElement('div');
            const childLabel = document.createElement('label');
            childLabel.textContent = 'Criança:';
            childLabel.classList.add('checkboxLabel');
            const childSelect = document.createElement('select');
            childSelect.id = `crianca${i}`;
            const option1 = document.createElement('option');
            option1.value = '';
            option1.text = 'Não';
            const option2 = document.createElement('option');
            option2.value = 'ate5';
            option2.text = 'Até 5 anos';
            const option3 = document.createElement('option');
            option3.value = '6a10';
            option3.text = '6 a 10 anos';
            childSelect.appendChild(option1);
            childSelect.appendChild(option2);
            childSelect.appendChild(option3);

            childDiv.appendChild(childLabel);
            childDiv.appendChild(childSelect);

            personDiv.appendChild(label);
            personDiv.appendChild(input);
            personDiv.appendChild(childDiv);
            personFieldsDiv.appendChild(personDiv);
        }
    }

    numPessoasInput?.addEventListener('change', generatePersonFields);
    generatePersonFields();

    window.openGoogleMaps = function() {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }

    window.copyAddress = function() {
      navigator.clipboard.writeText(address)
        .then(() => alert('Endereço copiado!'))
        .catch(err => console.error('Erro ao copiar endereço: ', err));
    }

    window.copyPix = function() {
      navigator.clipboard.writeText(pixKey)
        .then(() => {
          pixCopiedMessage.style.display = 'flex';
          setTimeout(() => {
            pixCopiedMessage.style.display = 'none';
          }, 3000);
        })
        .catch(err => console.error('Erro ao copiar chave PIX: ', err));
    }

    window.showCupomInput = function() {
        cupomContainer.innerHTML = `
            <div class="cupomInputContainer">
                <input type="text" class="cupomInput" placeholder="Digite seu cupom">
                <button class="aplicarCupomButton">Aplicar</button>
            </div>
        `;
    }

    window.submitForm = async function() {
      const numPessoas = document.getElementById('numPessoas')?.value;
      const nomeResponsavel = document.getElementById('nomeResponsavel')?.value;
      const telefone = document.getElementById('telefone')?.value;
      const pessoas = [];

      for (let i = 2; i <= parseInt(numPessoas, 10); i++) {
        const nomePessoa = document.querySelector(`#person-fields div:nth-child(${i}) input[type="text"]`)?.value;
        const crianca = document.querySelector(`#person-fields div:nth-child(${i}) select`)?.value;
        pessoas.push({ nome: nomePessoa, crianca });
      }

      const { data, error } = await supabase
        .from('reservas')
        .insert([
          {
            num_pessoas: numPessoas,
            nome_responsavel: nomeResponsavel,
            telefone: telefone,
            pessoas: pessoas,
          },
        ])
        if (error) {
          console.error('Erro ao inserir dados:', error);
          alert('Erro ao enviar reserva. Por favor, tente novamente.');
        } else {
          console.log('Dados inseridos com sucesso:', data);
          alert('Reserva enviada com sucesso!');
        }
    }

    window.showAdminPanel = function() {
        reservationContainer = document.getElementById('reservation-container') as HTMLElement | null;
        if (reservationContainer) {
            reservationContainer.style.display = 'none';
        }
        adminContainer.style.display = 'block';
        fetchReservas();
    }

    window.showReservationForm = function() {
        reservationContainer = document.getElementById('reservation-container') as HTMLElement | null;
        if (reservationContainer) {
            reservationContainer.style.display = 'block';
        }
        adminContainer.style.display = 'none';
    }

    async function fetchReservas() {
        const { data, error } = await supabase
            .from('reservas')
            .select('*')

        if (error) {
            console.error('Erro ao buscar reservas:', error);
            alert('Erro ao buscar reservas. Por favor, tente novamente.');
        } else {
            if (reservasTableBody) {
                reservasTableBody.innerHTML = '';
                data.forEach(reserva => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${reserva.id}</td>
                        <td>${reserva.num_pessoas}</td>
                        <td>${reserva.nome_responsavel}</td>
                        <td>${reserva.telefone}</td>
                        <td>${JSON.stringify(reserva.pessoas)}</td>
                    `;
                    reservasTableBody.appendChild(row);
                });
            }
        }
    }

    window.savePrices = async function() {
        const adultPrice = adultPriceInput.value;
        const childPrice5 = childPrice5Input.value;
        const childPrice10 = childPrice10Input.value;

        const { data, error } = await supabase
            .from('config')
            .upsert([
                {
                    key: 'prices',
                    value: {
                        adult: adultPrice,
                        child5: childPrice5,
                        child10: childPrice10
                    }
                }
            ], { onConflict: 'key' })

        if (error) {
            console.error('Erro ao salvar preços:', error);
            alert('Erro ao salvar preços. Por favor, tente novamente.');
        } else {
            console.log('Preços salvos com sucesso:', data);
            alert('Preços salvos com sucesso!');
        }
    }

    if (window.location.pathname === '/admin') {
        window.showAdminPanel();
    }
