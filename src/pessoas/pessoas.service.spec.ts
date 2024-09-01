describe('PessoasService', () => {
  beforeEach(async () => {
    // console.log('Isso será executado antes de cada teste');
  });

  // Caso - Teste
  it('deve somar o numero1 e o numero2 e resultar em 3', () => {
    // Configurar - Arrange
    const numero1 = 1;
    const numero2 = 2;

    // Fazer alguma ação - Act
    const result = numero1 + numero2;

    // Conferir se essa ação foi a esperada - Assert
    // === 3 = toBe
    expect(result).toBe(3);
  });
});
