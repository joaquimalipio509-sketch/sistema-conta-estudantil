class aluno {
    #matricula
    #nome
    #email

    constructor (matricula, nome, email) {
        this.#matricula = matricula
        this.#nome = nome
        this.#email = email
    }

    //getters
    getMatricula() {
        return this.#matricula
    }
    getNome() {
        return this.#nome
    }
    getEmail() {
        return this.#email
    }

    //setters: matricula nao pode ser alterada
    setNome(nome) {
        if (nome.trim() !== "") {
            this.#nome = nome
        }
    }

    setEmail(email) {
        if (email.trim() !== "") {
            this.#email = email
        }
    }

    exibirPerfil() {
        return `Matricula: ${this.#matricula}
        Nome: ${this.#nome}
        Email: ${this.#email}`
    }
}

    class contaEstudantil {
        #numeroConta
        #saldo
        #titular
        #limiteCredito

    constructor(numeroConta, titular, limiteCredito) {
        this.#numeroConta = numeroConta
        this.#titular = titular
        this.#saldo = 0.0

        if(limiteCredito >= 0) {
            this.#limiteCredito = limiteCredito
        } else {
            this.#limiteCredito = 0
        }
    }

    //getters
    getNumeroConta() {
        return this.#numeroConta
    }
    getSaldo() {
        return this.#saldo
    }
    getTiular() {
        return this.#titular
    }
    getLimiteCredito() {
        return this.#limiteCredito
    }

    depositar(valor) {
        if (valor > 0) {
            this.#saldo += valor
            console.log(`Deposito de R$ ${valor.toFixed(2)} realizado`)
            return true
        }
        console.log("Deposito inválido! O valor deve ser positivo.")
        return false
    }

    pagar(valor) {
        if (valor > 0 && (this.#saldo + this.#limiteCredito) >= valor) {
            this.#saldo -= valor
            console.log(`Pagamento de R$ ${valor.toFixed(2)} realizado.`)
            return true
        } 
        console.log("Pagamento não autorizado: saldo e limite insuficientes ou valor inválido.")
        return false
    }

    transferir(destino, valor) {
        if (destino === this || !(destino instanceof contaEstudantil)) {
            console.log("Conta de destino inválida.")
            return false
        } 
        
        if (this.pagar(valor)) {
            destino.depositar(valor)
            console.log("Transferência realizada com sucesso.")
            return true
        }

        console.log("Transferência não realizada.")
        return false
    }

    exibirDados() {
        return `Conta: ${this.#numeroConta}
        Titular: ${this.#titular.getNome()}
        Saldo: ${this.#saldo.toFixed(2)}
        Limite de Credito: ${this.#limiteCredito.toFixed(2)}`
    }
}
    // ===============================
    // CLASSE PRINCIPAL: MAIN
    // ===============================

    console.log("===== CADASTRO DE ALUNOS =====")
    
    const alunoCarlos = new aluno(
        "2026001",
        "Carlos Silva",
        "carlos@email.com"
    )

    const alunoBeatriz = new aluno(
        "2026002",
        "Beatriz Souza",
        "beatriz@email.com"
    )

    console.log(alunoCarlos.exibirPerfil())
    console.log()
    console.log(alunoBeatriz.exibirPerfil())

    // criando as contas
    const contaDoCarlos = new contaEstudantil(
        "001",
        alunoCarlos,
        50
    )

    const contaDaBeatriz = new contaEstudantil(
        "002",
        alunoBeatriz,
        50
    )

    console.log(contaDoCarlos.exibirDados())
    console.log()
    console.log(contaDaBeatriz.exibirDados())

    // Teste 1: depósito negativo
    console.log("\n===== TESTE DE DEPÓSITO =====")
    contaDoCarlos.depositar(-20)
    console.log("Saldo do Carlos:", contaDoCarlos.getSaldo())

    // Teste 2: depósito válido
    console.log("\n===== TESTE DE DEPÓSITO =====")
    contaDoCarlos.depositar(100)
    console.log("Saldo do Carlos:", contaDoCarlos.getSaldo())

    // Teste 3: pagamento utilizando o limite
    console.log("\n===== TESTE DE PAGAMENTO =====");

    contaDoCarlos.pagar(130)

    console.log("Saldo do Carlos:", contaDoCarlos.getSaldo())
    console.log("Limite de crédito:", contaDoCarlos.getLimiteCredito())

    // Teste 4: pagamento que ultrapassa o limite
    contaDoCarlos.pagar(1)
    // Teste 5: transferência entre contas
    console.log("\n===== TESTE DE TRANSFERÊNCIA =====")

    // Carlos possui saldo -30 e limite de 50.
    // Ele ainda pode pagar ou transferir até R$ 20.
    contaDoCarlos.transferir(contaDaBeatriz, 15)

    console.log("\n===== SALDOS FINAIS =====")
    console.log(contaDoCarlos.exibirDados())
    console.log()
    console.log(contaDaBeatriz.exibirDados())