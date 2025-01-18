export function ReservationForm() {
        return `
            <div id="reservation-container" class="container">
                <h1 class="title">Fazer Reserva</h1>

                <div class="form">
                    <div class="inputGroup">
                        <label class="label">Número de Pessoas:</label>
                        <input type="number" id="numPessoas" min="1" class="input" required>
                    </div>

                    <div id="person-fields">
                      <label class="label">Nome do Responsável:</label>
                      <input type="text" id="nomeResponsavel" placeholder="Nome do Responsável" class="input" required>
                    </div>

                    <div class="inputGroup">
                        <label class="label">Telefone:</label>
                        <input type="tel" id="telefone" placeholder="Telefone" class="input" required>
                    </div>

                    <div class="cupomContainer" id="cupomContainer">
                        <button class="mostrarCupomButton" onclick="showCupomInput()">Tem um cupom de desconto?</button>
                    </div>
                </div>

                <div class="addressContainer">
                    <h3 class="addressTitle">Local do Rodízio</h3>
                    <p class="addressText">Endereço: Rua Juiz David Barrilli, 376 - Jardim Aquarius, São José dos Campos - SP, 12246-200</p>
                    <div class="addressButtons">
                        <button class="addressButton" onclick="openGoogleMaps()">Abrir no Google Maps</button>
                        <button class="addressButton" onclick="copyAddress()">Copiar Endereço</button>
                    </div>
                </div>

                <div class="pagamentoContainer">
                    <h3 class="pagamentoTitle">Informações de Pagamento</h3>
                    <div class="pagamentoInfo">
                        <p class="valorTotal">Valor Total: R$ 104.85</p>
                        <p class="instrucao">Para finalizar sua reserva, siga os passos abaixo:</p>
                    </div>

                    <div class="passos">
                        <div class="passo">
                            <span class="passoNumero">1</span>
                            <div class="passoConteudo">
                                <h4 class="passoTitulo">Realize o Pagamento via PIX</h4>
                                <div class="pixContainer">
                                    <p class="pixInfo"><strong>Tipo de Chave:</strong> CPF</p>
                                    <div class="pixInputContainer">
                                        <input class="pixInput" id="pixKeyInput" value="46002748814" readonly>
                                        <button class="copyButton" onclick="copyPix()">Copiar</button>
                                    </div>
                                    <div class="copyIndicator">
                                        <span class="copyIcon">📋</span>
                                        Clique para copiar a chave PIX
                                    </div>
                                </div>
                                <div class="aviso" id="pixCopiedMessage">
                                    <span class="avisoIcon">✅</span>
                                    Chave PIX copiada!
                                </div>
                            </div>
                        </div>

                        <div class="passo">
                            <span class="passoNumero">2</span>
                            <div class="passoConteudo">
                                <h4 class="passoTitulo">Envie o Comprovante de Pagamento</h4>
                                <div class="inputGroup">
                                    <label class="fileInputLabel" for="comprovante">
                                        Selecione o arquivo do comprovante
                                    </label>
                                    <input type="file" id="comprovante" class="fileInput" accept="image/*,application/pdf" required>
                                </div>
                                <p class="comprovanteInstrucao">Formatos aceitos: imagens e PDF</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" class="button" onclick="submitForm()">Finalizar Reserva</button>
            </div>
        `;
    }
